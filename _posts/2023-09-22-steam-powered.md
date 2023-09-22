---
layout: post
title: Steam Powered - Make your own Linux based gaming console
---

I've been mulling moving over to [Linux](https://en.wikipedia.org/wiki/Linux) full time for personal use for quite a few years but since I got my [Steam Deck](https://store.steampowered.com/steamdeck)
 last year, I've realised it's perfectly viable now. Problem is, the Steam Deck isn't quite powerful enough for my 4k 
TV in the living room and Valve don't actually release a desktop version of [SteamOS](https://en.wikipedia.org/wiki/SteamOS) 
anymore. After a bit of 
searching I found that most of the popular mainstream desktop distros like [Ubuntu LTS](https://ubuntu.com/blog/what-is-an-ubuntu-lts-release) are months to years behind 
the latest driver updates needed to run most games on launch and as such aren't always the best choice either.

This left me with a few options:

1. Build my own [arch linux](https://archlinux.org/) install with ~~blackjack and hookers~~ the latest updates.
2. Use a gaming distro like HoloISO or ChimeraOS.
3. Use a [rolling distribution](https://itsfoss.com/rolling-release/) like Manjaro or openSUSE Tumbleweed to take the heavy lifting away.

I opted out of option one as it seemed like a time sink. I did indeed try option 2 for a while but I chose 
[ChimeraOS](https://chimeraos.org/) 
over [HoloISO](https://github.com/HoloISO/holoiso) 
as it a) predates the steam deck/modern SteamOS incarnations and b) is more regularly updated than 
HoloISO. This worked pretty well for a while until Resident Evil 4 hit and we got the wonderful black square issue:

![Resident Evil 4 Bug]({{ site.baseurl }}/images/rantimages/RE4Issues.jpg)

Urgh. That was actually caused by
[an issue with Mesa](https://steamdeckhq.com/tips-and-guides/how-to-fix-graphical-issues-in-the-re4-demo/) that required
 an update. Neither valve of the Chimera OS people released this for a little while but 
as soon as I upgraded, I ended up getting [this bug](https://github.com/ChimeraOS/chimeraos/issues/516) and could 
only boot into a black screen. I chatted to the devs on their discord and they were super friendly but they couldn't 
figure out my issue and I gave up.

That left option 3. I wasn't happy with some of [manjaro's known issues](https://github.com/arindas/manjarno) and 
I wanted the option to use secure boot if I needed, which left [openSUSE Tumbleweed.](https://get.opensuse.org/tumbleweed/) 
As a version of openSUSE with 
snapshotting and fast updates, it seemed the best bet. I installed it with [KDE to mimic the Steam Deck's desktop](https://www.gamingonlinux.com/2022/10/kde-steam-deck-akademy-2022/) 
and away I went.

So, I had an desktop OS, but how could I make this more console like? The first thing I did was set Steam up to boot 
into ["Big Picture" mode.](https://help.steampowered.com/en/faqs/view/3725-76D3-3F31-FB63) 
This has had a revamp and is now much more like the desk gaming mode layout but misses a few 
things - you don't get [MangoHud](https://wiki.archlinux.org/title/MangoHud) out of the box for instance.

Once I had that, I needed to make sure I could use the PC without getting up off the sofa. I updated the firmware on 
my [Xbox controller](https://www.xbox.com/en-gb/accessories/controllers/xbox-wireless-controller#white) 
and [Xbox wireless headset](https://www.xbox.com/en-GB/accessories/headsets/xbox-wireless-headset) then connected them [manually via bluetooth.](https://en.opensuse.org/Bluetooth) I then configured 
[Wake on Lan](https://en.wikipedia.org/wiki/Wake-on-LAN) 
so the PC could be remotely activated as long as it had wired ethernet. I use an iPhone app called 
["Wake me up"](https://apps.apple.com/us/app/wake-me-up-wake-on-lan/id1465416032) to 
send the magic wake up packet to my [network broadcast address](https://www.pcmag.com/encyclopedia/term/broadcast-address) 
which works like charm and also means I do not need to 
worry about which IP on my network my PC is using to turn it on.

I then manually installed MangoHud and used [Goverlay](https://github.com/benjamimgois/goverlay) 
to globally enable it but set it to hide by default. I set 
the "toggle" key to F1. I then configured Steam to change the share button on my Xbox controller to actually send 
and F1 key press and voila, a basic Steam Deck like performance overlay feature is bodged into my configuration. This is 
useful when tweaking settings to get the best performance as my RX 6700 GPU isn't quite good enough for 4k at max 
settings for most new games.

I was mostly there and switching between my homebrew console and the Steam Deck without issue via [Steam Cloud](https://help.steampowered.com/en/faqs/view/68D2-35AB-09A9-7678) but I 
suddenly noticed something odd - sometimes some games would crash to the Steam UI without warning but not on the Steam Deck, 
only my desktop PC. After a bit of reading I realised that I had to boost the 
[vm.max_map_count setting](https://www.phoronix.com/news/Fedora-39-VM-Max-Map-Count) manually to make sure gaming processes 
didn't crash when trying to use more memory than expected. This solved the problem and made me feel chuffed that I 
had fixed it myself without giving up again and hopping to a new distro.

I was almost there. The final problem was anytime I wanted to run updates or configure anything non gaming related I had to 
plug in a keyboard and sit by my TV which was annoying. The solution was simple = 
[VNC!](https://en.wikipedia.org/wiki/Virtual_Network_Computing) I used [Remmina](https://remmina.org/) 
as a client from my Ubuntu laptop. I did have to manually add a firewall exception for VNC via 
[YaST](https://yast.opensuse.org/) which is an openSUSE tool I'd never used before but after that everything just 
worked. I've not needed to plug anything directly into the PC since; It just sits on the floor by the TV without
a care in the world other than the odd dust cleaning session now and then.

Finally, I had it - a working Linux gaming console that gets some updates faster than 
a Steam Deck does. I've had no compatibility issues with it either as anything the Steam Deck can run will run here as well. 
The joy of Linux means hardware upgrades are simply plug and play as long as my [kernel](https://en.wikipedia.org/wiki/Linux_kernel) is up to date. With openSUSE tumbleweed 
this is a given as long as I remember to apply the updates themselves now and then.

Would I recommend this for everybody? No. Is it perfect? Far from it, I'd prefer a real desktop Steam OS release from 
Valve, but I think we all know not to wait for Valve to do things if they haven't announced them fully by this point.
I don't have the same ability to lock the framerate or scaling options as you do on a steam deck due to not using 
[gamescope](https://github.com/ValveSoftware/gamescope). 
My mangohud hack works but isn't easily configurable while in a game like it is on a deck. Sometimes I 
get bugs that just don't happen on the deck because I'm using an entirely different distro although like a deck I can 
"roll back" to an earlier snapshot should I need to.

All that aside, if you like your steam deck but want to game on something a bit beefier with a discrete card without leaving the linux 
ecosystem I can heavily recommend this approach. I hope this helps you find a new way to play your PC games. The 
best part? All of this software is 100% free and most of it is open source. The year of the linux desktop is finally 
here - _sort of._
