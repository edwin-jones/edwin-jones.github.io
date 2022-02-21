---
layout: post
title: SSH Agent Man - How does SSH agent work?
---

I've been using [SSH](https://en.wikipedia.org/wiki/Secure_Shell) for quite a while now and have used [SSH keys](https://www.atlassian.com/git/tutorials/git-ssh) regularly to authenticate myself with
a variety of systems both at work and at home. I historically have been a bit lazy and avoided using passwords 
for my private keys to avoid having to remember said password and type it in every time. Eventually I learned 
of [SSH Agent](https://en.wikipedia.org/wiki/Ssh-agent) - a tool that allows you to type your SSH password in once per session to save on repetitive password entry by storing the decrypted value of the key in memory for easy access.

Generally wherever I've installed SSH agent I tend to use some fire and forget scripts so I don't actually follow along or remember exactly how it works, just what it does. That changed recently at work as I've been trying to use [Powershell](https://docs.microsoft.com/en-us/powershell/scripting/overview?view=powershell-7.2) more at work on [WSL2](https://en.wikipedia.org/wiki/Windows_Subsystem_for_Linux) so script snippets I learn and share around are more user friendly for my colleagues and friends on Windows systems. This lead to a bit of a snag as it didn't have an obvious way to make SSH Agent work and I couldn't figure out why. As I didn't know of any simple tools to 
get things running I put my detective hat on and went to work.

My first step was to compare the environments of my usual daily driver shell, [fish](https://fishshell.com/) and Powershell to see if I was missing anything obvious and it turns out I was - my powershell sessions were missing two crucial environment variables my fish shell had: `$SSH_AUTH_SOCK` and `$SSH_AGENT_PID`. If I added 
these variables to my [$PROFILE](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_profiles?view=powershell-7.2#the-profile-variable) file and started a new session everything worked normally. Without them I was still having to add my password in every time I wanted to use my SSH key. Stranger still, when I rebooted my system and went straight into a powershell session I was right back where I started and had to enter my password every time. I also noticed that when I kicked off a new fish shell session that the values of both these environment variables had changed.

I floundered a bit at first and tried to see if manually running `ssh-agent` would fix things - instead I just saw some strange output in the terminal. I did however notice that a new ssh agent process had started and things began to click a little. My next step was to look deeper into my fish configuration to see if I could figure out exactly what it was doing. Here I found out I'd installed [fish_ssh_agent](https://github.com/ivakyb/fish_ssh_agent) and noticed it had easily accessible source code so I took a look at exactly what it was doing:

```fish

function __ssh_agent_is_started -d "check if ssh agent is already started"
   if begin; test -f $SSH_ENV; and test -z "$SSH_AGENT_PID"; end
      source $SSH_ENV > /dev/null
   end

   if test -z "$SSH_AGENT_PID"
      return 1
   end

   ps -ef | grep $SSH_AGENT_PID | grep -v grep | grep -q ssh-agent
   #pgrep ssh-agent
   return $status
end


function __ssh_agent_start -d "start a new ssh agent"
   ssh-agent -c | sed 's/^echo/#echo/' > $SSH_ENV
   chmod 600 $SSH_ENV
   source $SSH_ENV > /dev/null
   true  # suppress errors from setenv, i.e. set -gx
end


function fish_ssh_agent --description "Start ssh-agent if not started yet, or uses already started ssh-agent."
   if test -z "$SSH_ENV"
      set -xg SSH_ENV $HOME/.ssh/environment
   end

   if not __ssh_agent_is_started
      __ssh_agent_start
   end
end

```

It was a bit hard to parse at first but I could tell that it was checking if ssh-agent had been run and if not, starting it and storing the terminal output of the command in the environment variables I mentioned earlier. I couldn't quite understand exactly what it was doing in a few places - what was `$SSH_ENV`? Why was it passing the `-c` flag to ssh-agent? It turns out both had simple answers. `$SSH_ENV` was resolving to `/home/username/.ssh/environment` - a simple text file. The script was invoking ssh-agent with the `-c` flag to force output to print in a simpler manner which according to the [man page](https://en.wikipedia.org/wiki/Man_page) means to _Generate C-shell commands on stdout._ I wasn't entirely sure what this meant but I could see that the output went from something like:

```
SSH_AUTH_SOCK=/tmp/ssh-hyn2bsayp8Ot/agent.38600; export SSH_AUTH_SOCK;
SSH_AGENT_PID=38601; export SSH_AGENT_PID;
echo Agent pid 38601;
```

to

```
setenv SSH_AUTH_SOCK /tmp/ssh-myYdPLcMCmBn/agent.38914;
setenv SSH_AGENT_PID 38915;
echo Agent pid 38915;
```

Finally, I noticed it was using [sed](https://en.wikipedia.org/wiki/Sed) to comment out the [echo](https://en.wikipedia.org/wiki/Echo_(command)) command that would otherwise print the process id of the running instance of ssh agent to the screen each time that part of the script ran.

I was almost there, but I couldn't quite figure out how fish was taking this output and using it. I finally twigged that it was [sourcing](https://superuser.com/questions/46139/what-does-source-do) the environment text file as script, exporting those environment variables to the current session.

It all made sense. The script was using the environment file to check if it had been run before. If it had it checked to see if the process id recorded in the script was currently in use. If it wasn't it ran ssh-agent and exported the output to the current session. If was, it exported the existing variables in the file. This meant that anything trying to use ssh agent in a shell session could know what socket ssh-agent was already listening to and communicate with it. This would allow use of the decrypted ssh key any time it was required.

I was almost there. The next step was to make it work in powershell where bash style commands don't always work. I took the brute force approach of rewriting the script and sticking it into my $PROFILE file like so:

```pwsh
# Stick this in your "$profile" file.
# Rough explanation of ssh-agent output here: http://blog.joncairns.com/2013/12/understanding-ssh-agent-and-ssh-add/
# Note, https://github.com/ivakyb/fish_ssh_agent/blob/master/functions/fish_ssh_agent.fish takes a similar approach.

# Resolve SSH agent details by starting ssh-agent if it's not already running
# and storing current run details in $HOME/.ssh/environment
$environmentfile = "$HOME/.ssh/environment"
if(Test-Path -path $environmentfile -pathtype leaf)
{
  Write-Output "ssh agent file exists"
}
else
{
  Write-Output "creating ssh agent file"
  ssh-agent -c | Select-Object -first 2 | Out-File $environmentfile
}

$sshdetails = Get-Content $environmentFile
$env:SSH_AUTH_SOCK = $sshdetails[0].split(' ')[-1].split(';')[0]
$env:SSH_AGENT_PID = $sshdetails[1] -replace "[^0-9]" , ''

if(-not (Get-Process -id $env:SSH_AGENT_PID -ea silentlycontinue))
{
  Write-Output "updating ssh agent file"
  ssh-agent -c | Select-Object -first 2 | Out-File $environmentfile
  $sshdetails = Get-Content $environmentfile
  $env:SSH_AUTH_SOCK = $sshdetails[0].split(' ')[-1].split(';')[0]
  $env:SSH_AGENT_PID = $sshdetails[1] -replace "[^0-9]" , ''
}
```

Hopefully you can see the script is doing mostly the same as the fish equivalent but with a few extra steps. To get the socket value I split the first line of the ssh agent output to find the right token. To find the process id I just use a [regex](https://en.wikipedia.org/wiki/Regular_expression) to strip out everything on the second line that's not a number. I only take the first two lines of the output so I don't need to do anything funky with sed to comment out the echo command.

I restarted my computer to be sure nothing was hanging over from previous sessions and loaded up a new terminal. I tried to run an ssh command and entered the key when prompted. I then ran the same command a second time and it worked as expected. I then opened a new terminal instance and ran the same command a third time with complete success. I was quite pleased I'd managed to solve my problem with a little digging and didn't need to switch away from powershell to enjoy using the utility of ssh agent.

I hope this helps you - I find knowing what your tools are doing under the hood lets you adapt them for other usages and workflows like I have here. Learning a bit about ssh-agent means I get to keep using powershell where I want to and now have the tools I need to solve any related problems in the future. 

