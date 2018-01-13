---
layout: post
title:  Porting my site to Jekyll
---

I've had a problem for a while, and that problem was that this website was getting rather dusty. I originally wrote it way back in 2010 as a [WordPress](https://wordpress.com/) website straight after university and it looked, well, pretty basic. I ported it to ASP.NET in 2012 to allow me to make it more flexible. I wrote everything from scratch including the css and scripts the page used. This site looked OK but it didn't age well and it was left to rot for far too long.

I also had a problem in that my blog was pretty basic and hard to use. I'd written a custom system that involved sub master pages so I could upload new blog posts
as new .aspx files. The problem with this was I had to hand craft the HTML by hand for each post which was time consuming and meant over the years I wrote far fewer
blog posts than I would have liked. When I learned about [Markdown](https://en.wikipedia.org/wiki/Markdown) I thought about the best way to rebuild my blog to allow me to feed in Markdown files and treat them as blog posts.

I had a third issue, in that hosting for ASP.NET sites was getting harder to find as fewer and fewer hosts were offering it as an option. Ideally, I needed a system that required no server side logic whatsoever to render my site so I could host it anywhere.

I thought of several ways to do all this. Originally I tried out [Angular](https://angular.io/), then [Vue.js](https://vuejs.org/) but both seemed a little heavy-weight for a simple blog system. Thankfully my friend [Jon](https://www.devopsdude.uk/) introduced me to the wonders of [Github Pages](https://pages.github.com/). This is a brilliant free system by Github that allows you to host static sites for free via your own public repository. It also uses [Jekyll](https://jekyllrb.com/) under the hood so you can do far more than you might think, including rendering markdown files as normal HTML for blogging purposes.

I spent my Saturday forking and modifying his [pre built Jekyll repository](https://github.com/jonhoare/jonhoare.github.io) which in turn is based on [another repository by Barry Clark.](https://github.com/barryclark/jekyll-now) It was pretty easy to follow the [guide](https://github.com/barryclark/jekyll-now/blob/master/README.md) to get this site looking as it does now, minus a few tweaks to keep things like my Facebook comments plugin working and my custom domain name. All in all it was far easier than I imagined and much quicker to set up than I expected. I managed to snag the [Hyde](https://github.com/poole/hyde) theme to make my site look a bit more modern. It also makes the site work better on mobile which has been a problem in the past, as [Google will drop your rank if you don't have a mobile optimized website.](https://support.google.com/adsense/answer/6196932?hl=en-GB) *It also looked good on Jon's page, so why not steal it?* 😉

If you are scratching your head trying to come up with your own website, you should give Github Pages a try. I've yet to find a better free hosting solution and with Jekyll you can do quite a lot of fun customization.