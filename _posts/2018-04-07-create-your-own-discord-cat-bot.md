---
layout: post
title:  Create your own Discord cat bot
---

I've been using [Discord](https://discordapp.com/) for a while, primarily to chat to friends while playing games. It's replaced [TeamSpeak](https://www.teamspeak.com/en/) and [Mumble](https://www.mumble.com/) entirely for pretty much
everybody I know online - for good reason! It's easy to use and simple to administer, requiring only a web browser.

I've also wanted to write a bot for a ages and after joking about it for a bit, I was inspired by my friends [Jason Browne](https://jbrowne.io) and [Jordan Campbell](https://twitter.com/Dante556). They have had their own various bots over the years so I thought I'd have a stab at it. 
I decided I wanted to make a simple cat bot with that could perform two simple actions:

* Post cat pictures to Discord.
* Post random cat facts to Discord.

I started out with a basic [Node.js](https://nodejs.org/en/) tutorial from [Renemari Padillo](https://medium.com/@renesansz/tutorial-creating-a-simple-discord-bot-9465a2764dc0) and worked from there.
It turns out that the Discord API is pretty easy to work with and allows you to get something running in a hour or two. My own bot's code is available [here](https://github.com/edwinj85/discord-catbot) in a simple 126 line javascript file. I pass in the Discord secret/password via an environment variable which makes it super portable. So portable in fact that the whole thing runs on my Raspberry Pi 3 downstairs. It runs as a service via a systemctl script and auto restarts if anything falls over or fails giving maximum uptime. I did originally use crontab but found it far too flakey as if the bot disconnected it wouldn't restart automatically.

Originally I chose to rely on third party APIs to provide cat facts and pictures - the pictures from [the cat api](http://thecatapi.com/) work great and I still use them but the cat facts were a little vulgar and I didn't really feel comfortable using them. I decided to roll my own and host it on [Heroku](https://www.heroku.com/). I've set up swagger so you can easily see how the API works and have a play with it if you'd like to know more by clicking [here.](https://polite-catfacts.herokuapp.com/docs/) I found the Heroku platform surprisingly pleasant to work with. You have to mostly use a set of supported languages to be able to host an app but you get a lot for free. You easily get enough free hosting time to run an application 24/7. 

There is free github integration so I get an automatic rebuild and deploy every time I push a change to the master branch of my cat fact api [repository](https://github.com/edwinj85/polite-catfacts). It's a little annoying that on the free tier the container that hosts your project will get suspended every 30 minutes unless a request is made to it. This does limit what you can do project wise, but overall it's a very compelling package with slick administration tools that I do recommend.

I had real fun with the cat fact API. I went a little overboard with it by adding the aforementioned swagger support as well as automated testing with the [Chai](http://www.chaijs.com/) fluent assertion library and the [Mocha](https://mochajs.org/) testing framework. It was good to learn and contrast with what I normally use for similar work in C#, [Fluent Assertions](https://fluentassertions.com/) and [NUnit](http://nunit.org/). I was surprised with how much I could get done with so little work.

All in all, if you want to write your own chat bot for Discord or similar apps such as [Slack](https://slack.com/) I'd heavily recommend giving it a try. It's way easier than you think!

![get coding!](https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/giphy.gif)

