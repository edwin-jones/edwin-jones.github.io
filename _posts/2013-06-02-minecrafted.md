---
layout: post
title:  Minecrafted
redirect_from:
  - /rants/minecrafted.aspx
---

**UPDATE 28-10-2013 - Due to the fact I will be moving house at the end of the week
the Minecraft server will be down, for how long I don't know. I have been planning to put
this entire site on my pi to save money, but then again this server has been far more popular
than I originally expected thanks for the Pi Foundation et al. We'll see what happens over the next
few weeks but whatever the outcome I thank all of you heartily for playing on my server.**

Hello all!

How a year changes things. I’ve been so caught up in various projects I have neglected my own personal writing, and for that I apologise. That said, I do at least have a few things to show off.
Remember last year when I blogged about the Raspberry Pi? Well, I may have gone on somewhat of a binge with them. 
I have to date bought four of the blighters, three model Bs and one model A but in my defense, I only kept two of them.

![guilty puppy]({{ site.baseurl }}/images/rantimages/guiltypuppy.jpg)

What did I do with them you say? Apart from learn linux pretty much from scratch I’ve done this:

<div class="video-container">
<iframe src="https://www.youtube.com/embed/48fR3IzGqaQ?feature=player_detailpage" frameborder="0" allowfullscreen></iframe>
</div>

<br>

and this:

<div class="video-container">
<iframe src="https://www.youtube.com/embed/AYVc8iWS2gw?feature=player_detailpage" frameborder="0" allowfullscreen></iframe>
</div>

<br>

and this:

<div class="video-container">
<iframe src="https://www.youtube.com/embed/OzfA0IgtrPE?feature=player_detailpage" frameborder="0" allowfullscreen></iframe>
</div>

<br>

Which is all pretty cool, but my current setup is my favourite. My model A is my media server thanks to the amazing <a href="https://twitter.com/SamNazarko">Sam Nazarko</a> and his 
<a href="http://www.raspbmc.com/">Raspbmc project</a>, 
and can handle the <a href="http://djb31st.co.uk/blog/catch-up-tv-on-raspberry-pi-raspbmc-bbc-iplayer/">BBC iPlayer, 4OD, ITV and more.</a>

![Apologies for the dust...]({{ site.baseurl }}/images/rantimages/mediaPi.jpg)

What however about my model B? Well that dear friends is a different story. To begin, you may or may not have heard of a little game called Minecraft. 
It’s only sold <a href="http://www.escapistmagazine.com/news/view/123100-Minecraft-Sells-10-Million-Copies-Teases-Horses-in-Update">10 million copies,</a> no big whup right? Well, 
I wondered if the Minecraft could work on a 700MHz armv11 machine and I find out it <a href="http://pi.minecraft.net/">sort of could</a>
but not the full version. Then I wondered - would the Minecraft server program work on a Pi? Well, it turns out yes, yes it does - and how!

My research took quite a scouring of google and many fine cups of filter coffee died for the greater good. My first attempt involved downloading and compiling
    <a href="http://www.mc-server.org/">MCServer</a>, 
a free C++ implementation of the Minecraft Server program and this ran stupidly fast. When I was logged into the server I was seeing around 10% cpu use and only 30% memory use. 
Sadly though, it wasn’t all perfect as you can see below:

![minecraft]({{ site.baseurl }}/images/rantimages/EdsMinecraftWorld.jpg)

As you can see, no mobs. This wouldn’t do. 
I had to have mobs and full crafting but that meant the real deal PC server software, and that only runs on Java, not known for running that well on 2.5 watt micro computers. 
As it turns out, Oracle stepped up their game by releasing a new version of <a href="https://blogs.oracle.com/henrik/entry/oracle_releases_jdk_for_linux">Java</a> optimised for ARM devices, 
like the Pi. It’s supposed to be for Java FX development, 
but we all know that the best projects are the ones where you bend the rules slightly. I installed the experimental JRE, downloaded a nice and light Minecraft sever implementation 
called <a href="http://www.spigotmc.org/">Spigot</a> and tried running it via the command line. What happened next surprised me and quite a few other people.

![minecraft]({{ site.baseurl }}/images/rantimages/EdsJavaMinecraftWorld.jpg)

It didn’t just work. It didn’t just run. It worked <b>perfectly</b>. We set the server up for 4 people with a low draw distance and the framerate kept up at roughly 60fps. 
TNT didn’t kill it. Workmates burying themselves miles underground and getting lost didnt kill it. My friend <a href="http://insanedev.co.uk/">Steven</a> abusing his admin rights and spawning a 
ghast that set fire to a local forest (which he tried to put out by turning the trees into waterfalls) didn’t kill it. This system ran as well as a <i>normal pc minecraft server</i>.
Friends and I had rented servers for this many people before for around £20 a month. To put that in perspective, the Pi itself cost me roughly £20 and is powered by 
my Huawei HG533 router’s usb port with some old usb and ethernet cables I dug out from the lost lands behind the old tv under the stairs.

![minecraft]({{ site.baseurl }}/images/rantimages/serverPi.jpg)

You don’t need to take my word for all of this however, 
if you have a copy of minecraft you can play it now by visiting my server at <b>minecrafted.no-ip.biz</b> and view the world for yourself. The only rule is not to destroy the work of other players. 

Oh, and just a heads up - I’ve written a custom plugin that will give you a nasty surprise if you try to hit my character in any way. What’s the point of building your own minecraft server if you can’t abuse your power?

I can’t take all the credit for this however, I mostly  used <a href="http://picraftbukkit.webs.com/pi-minecraft-server-how-to">this guide</a> to get my server up and running,
including using the noip client to keep my server address updated as my home ip
will change frequently and TalkTalk sadly do not offer static IP addresses at this moment in time.

To a lot of people, this sort of thing doesn’t seem like much and in many ways they would be right. For me however, building, installing and maintaining my own publicly available minecraft server was some of the most fun I’ve had with computers in as long as I can remember, and I hope to begin another Raspberry Pi based project soon.

You really have to admire the whole idea of the Raspberry Pi. They are brilliantly cheap, low power servers and whilst I may not have learned much about coding with them so far, I sure have learned a lot about the world outside of Windows, and just how much you can get out of very low priced hardware. 
The Pi represents a great deal of opportunity for all sorts of people with the ideas for all sorts of projects. I implore you to think of your own and give it a go, you won’t regret it.


