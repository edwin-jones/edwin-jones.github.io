---
layout: post
title:  Powerful Powershell Passwords
---

_Tl;dr - For all of you doing some google-fu to find out how to make a secure password with any modern powershell version (i.e. Powershell 5 and above), the code snippet you want is: ```
Write-Output "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".ToCharArray() | Get-Random -Count 32 | Join-String`_

We've all been there - we've got a new website to sign up for or some credentials to generate for a work account. For most people a password manager is a viable option for generating secure passwords but in many cases you want to automate this flow - ideally in a way that will work on any given platform. Many people work with windows as their OS but others use Mac OS or a variety of linux. While there are a variety of approaches for each, most people I expect would prefer something simple that would work on all of them. I've recently spent some time searching for a good solution for this myself but as I couldn't find one easily  I've written this article in the hopes of sparing somebody else the time it took me to come to these conclusions.

[Powershell](https://docs.microsoft.com/en-us/powershell/scripting/overview?view=powershell-7) has made leaps and bounds since it originally started as a windows only scripting language. It now runs on all your favourite desktop operating systems and makes a perfect candidate for finding a simple command that the majority of people can just run without installing anything else. The old way to generate a password in powershell is as follows:

``` pwsh
Add-Type -AssemblyName 'System.Web'
$length = 32
[System.Web.Security.Membership]::GeneratePassword($length, 0)
```

This works by using a static method we borrow from C# to generate a password of the given length. It's the top find on most "generate a password in powershell" searches and still works to this day on Windows. Sadly, `System.Web.Security.Membership` [is not available outside of windows.](https://github.com/PowerShell/PowerShell/issues/5352). Ideally, we want a solution that will work on any operating system you end up working with so we need to keep searching.

Google fu can take us some interesting places, usually with multi line scripts that are hard to confirm are crytopgraphically sound. The smallest gist I've found so far is [this one](https://gist.github.com/marcgeld/4891bbb6e72d7fdb577920a6420c1dfb). It looks pretty promising, but ideally I think we'd all like to use a one liner we can easily share with our peers. Looking at the code in that gist, we can take one line of it and use that:

``` pwsh
Write-Output ( -join ((0x30..0x39) + ( 0x41..0x5A) + ( 0x61..0x7A) | Get-Random -Count 32 | % {[char]$_}) )`
```

This works and generates something that looks correct but...what on earth is that code doing? It's actually pretty simple - it's putting the ASCII characters `a-z`, `A-Z` and `0-9` into a set, selecting a random character from that set 32 times and dumping that out on your console. Good luck remembering that in a few months though let along editing that command without breaking it. What if we simplified it a bit with:

``` pwsh
Write-Output "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".ToCharArray() | Get-Random -Count 32 | Join-String`
```

That's much easier to understand right? The best part of this approach is it's obvious to anybody new what's going on and we can easily customise the alphabet used for the random passwords. We could remove numbers entirely or add different characters etc.

As for the `Get-Random` cmdlet, how can we be sure it's actually secure? Via the [documentation!](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/get-random?view=powershell-7) Reading the documentation tells us that as long as we do not set a manual seed the [RandomNumberGenerator](https://docs.microsoft.com/en-us/dotnet/api/system.security.cryptography.randomnumbergenerator?view=netcore-3.1) class is used and that's cryptographically secure. If you're still unconvinced you can check the source code itself to confirm what is going on [under the hood.](https://github.com/PowerShell/PowerShell/blob/master/src/Microsoft.PowerShell.Commands.Utility/commands/utility/GetRandomCommand.cs#L583)

I hope this helps you generate passwords and api keys more easily during your day to day workflows - please let me know if this is of use to you!
