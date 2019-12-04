---
layout: post
title: Write your own browser extension
---

In my day to day work I'm often reading a lot of database records that are sorted by time, usually using [unix timestamps](https://www.unixtimestamp.com/). The problem I usually have with this is when I view these records via some sort of web portal the numbers are a bit meaningless - I can't tell by eye if `1575468821` is an older date than `1575598821` without a little reading. Realising that I could do with a tool that automatically converted these for me I decided to bite the bullet and write a simple extension called stampy for [Chrome](https://chrome.google.com/webstore/detail/stampy/ccicllkpedpkilncdaololajfojgaodg) (and [Firefox](https://addons.mozilla.org/en-GB/firefox/addon/stampy/)). It turns out writing one is easy and this post details how I wrote mine.

A chrome extension at heart consists of a folder that contains a [JSON](https://en.wikipedia.org/wiki/JSON) file and one to many [JavaScript](https://en.wikipedia.org/wiki/JavaScript) files. The JSON file is known as the [manifest](https://developer.chrome.com/extensions/manifest) and just contains some details about your application such as its name, description, version number and which JavaScript files the extension uses. These broadly fall into two categories, [background scripts](https://developer.chrome.com/extensions/background_pages) and [content scripts](https://developer.chrome.com/extensions/content_scripts).

Content scripts are similar to website scripts you may have written before and can read or modify the contents of a page as you'd expect. They are basically standard JavaScript with the proviso that what you have access to may be controlled by the permissions you've configured your extension to have in the manifest.

Background scripts are more interesting, these represent the "host" of your extension. This is the place you would write code to hook into browser events such as somebody opening a new tab or clicking your extension's button. You can think of these as contexts that run inside the browser itself, extending how it functions. In my extension I use a background script to listen for any events that occur when somebody clicks the extension's button and then invoke a custom content script on the currently active browse tab with the following short snippet of code:

``` js 
chrome.browserAction.onClicked.addListener(
    function (tab) {
        chrome.tabs.executeScript(tab.id, { file: "content.js" });
    });

```

As you can see, the `chrome` object and its associated APIs are not what you would normally be able to access inside of a JavaScript browser context or console. This is the place where you can glue together the internal workings of a web browser with custom logic to change how your browser works. For reference, this is what `content.js` looks like:

```js
// use an anon function to avoid polluting the environment after the script is run
(function () {
    console.info("stampy - running unix timestamp conversion for page");

    const timerName = "stampy - document body parsing took";
    console.time(timerName);

    function replaceTimestamp(value) {
        let date = new Date(value * 1000);
        let locale = window.navigator.language;
        let replacement = `${date.toLocaleDateString(locale)} @ ${date.toLocaleTimeString(locale)} (UTC)`;

        return replacement;
    }

    function filterInvalidTextNodes(node) {

        // invisible elements should not be considered for timestamp conversion
        if (node.parentElement.style.display === 'none') {
            return NodeFilter.FILTER_SKIP;
        }

        return NodeFilter.FILTER_ACCEPT;
    }

    const timestampRegex = RegExp("[0-9]{10}");
    const nodeIterator = document.createNodeIterator(document.body, NodeFilter.SHOW_TEXT, filterInvalidTextNodes);

    let node;
    while (node = nodeIterator.nextNode()) {
        node.textContent = node.textContent.replace(timestampRegex, replaceTimestamp);
    }

    console.timeEnd(timerName);
    console.info("stampy - timestamp conversion completed");
})();
```

The basic flow of the script is basically that I search through all the text nodes of the page that are children of _visible_ html elements (so I don't risk modifying [script](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script) or [style](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/style) elements) and check to see if they contain a certain timestamp-eske pattern with a regex. This pattern is 10 consecutive numerical digits which usually represents a unix timestamp between 2001 and 2286. I feel this is a broad enough range to be useful and a fair enough concession to make to avoid accidentally converting _every_ number on a page. Any strings that match this pattern are then replaced with a string representation of the associated date and time in [UTC](https://en.wikipedia.org/wiki/Coordinated_Universal_Time), the formatting of which is controlled by the user's locale settings for their browser. I invoke this all via an [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) so I don't pollute the environment for any other running scripts.

Once I'd tried this out via [chrome's development tools](https://support.google.com/chrome/a/answer/2714278?hl=en) all I had to do was log in to the [chrome developer dashboard](https://chrome.google.com/webstore/developer/dashboard) and register it by uploading a zip file containing the source code. There was a small sign up fee of $5 but other than that it was trivial to get my extension published.

I wondered how hard it would be to convert the extension to Firefox but I really should not have. Not only does Firefox support most of the [chrome extension apis](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Chrome_incompatibilities), Mozilla don't charge to publish an extension! It was even less work to get my extension published for Firefox than it was for Chrome.

All in all it was good fun and quite educational to write my own browser extension. The source code is available on [GitHub.](https://github.com/edwin-jones/stampy) If you're interested in writing your own I'd recommend using [google's free developer guide](https://developer.chrome.com/extensions/getstarted) and go from there. Who knows what you might come up with?
