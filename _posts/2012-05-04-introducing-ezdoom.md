---
layout: post
title: Introducing ezDoom
---

**UPDATE 2: As of 2019 I've had to change the ezDoom installation method due to changes in how dropbox hosts files. I've added an MSI installer you can download via [github](https://github.com/edwin-jones/ezDoom/releases) and fixed a few small bugs.**

**UPDATE: ezDoom has been updated substantially as of August 2013. 
These updates may require you to uninstall any previous
versions of the program you may have. You can now select
multiple PWADS and PK3 files to run with the game and the underlying engine has been
shifted from <a href="http://zdoom.org/About">ZDoom</a> to <a href="https://zdoom.org/wiki/GZDoom">GZDoom.</a>
Mods you specify will be run in the order shown in the application so make sure you add them in the correct order if need be.
These changes enable support for many more mods, including the awesome <a href="http://www.moddb.com/mods/brutal-doom">Brutal Doom</a>
which I can't recommend enough. It's one of the best Doom mods ever made. Enjoy!**


It's been a busy few weeks for me lately but I still wanted to make time to share
with you something I have been working on for the last few weeks: <a href="https://github.com/edwin-jones/ezDoom/releases">ezDoom!</a>

![ezDoom]({{ site.baseurl }}/images/rantimages/ezDoom.png)

What is ezDoom? Well to put it simply it's the easiest way to play Doom for free
LEGALLY on Windows XP, Vista and 7. Just boot it up and press play and away you
go. I've always been facinated with doom and after I compiled my own version of
<a href="http://www.chocolate-doom.org/wiki/index.php/Main_Page">Chocolate Doom</a>
I thought more about how to make it easier to play, without all the command line
or batch file malarky. I came up with the idea for an application that would launch
the game for you. Many already existed, but I wanted to make mine as simple and
easy to use as possible so that anybody with a reasonably recent version of windows
can play doom legally, safely and for free with the minimum of fuss.

To put it a bit more complicatedly it's a WPF app that uses the fourth version of
the .NET framework to install and control a version of <a href="http://www.osnanet.de/c.oelckers/gzdoom/about.html">GZDoom</a>
and it lets you choose which mods you want to use. For legal reasons
I couldn't include full versions of certain games so the program installs shareware
versions of Doom, Heretic, Hexen and Strife as well as the full version of <a href="http://www.nongnu.org/freedoom/">FreeDoom</a> which will give you hours and hours of entertainment. If you own
the original games you can just choose the correct IWAD by pressing the add button
and then choosing it from the IWAD drop down menu. If you want to run some mods
you can choose from a few included PWADS (Mario Doom is my personal favourite) or
choose your own, but remember that a PWAD needs the correct IWAD to run. FreeDoom
will work on most Doom PWADS if you don't have to correct IWAD to hand.

If you don't know what an IWAD or PWAD is, they are Doom Engine data files - IWADS
hold crucial game information (gun images, enemy sprites - that sort of thing) while
PWADS contain new level data, but <a href="http://en.wikipedia.org/wiki/Doom_WAD">wikipedia
has a better explanation of how they work.</a> If you think of IWADS as <em>game files</em>
and PWADS as <em>mod/level files</em> you won't go too far wrong.

I intend to update this application and as soon as I do, the updates will be applied
when you next run the application as long as you are connected to the internet.
If you have any questions or suggestions about the application please e-mail me
at: <script type="text/javascript">printEmailAddress();</script>

I hope you all enjoy this as much as I have enjoyed making it, and happy "dooming"
to the lot of you!

