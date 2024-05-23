---
layout: post
title: Use function evaluate of document object get html element by using xpath
tags: ["javascript","browser","xpath"]
---
Write your code to query element by xpath selector

```javascript
    // $x() is not a JS standard -
    // this is only sugar syntax in chrome devtools
    // use document.evaluate()
    const featureArticle = document
        .evaluate(
            '//*[@id="mp-tfa"]',
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        )
        .singleNodeValue;

    console.log(featureArticle.textContent);
    
    // or using the function

    // only get first element
    function getElementByXpath(xpath) {
        return document.evaluate(
            xpath, document, null,
            XPathResult.FIRST_ORDERED_NODE_TYPE, null
        ).singleNodeValue
    }
    
    // get multiple elements
    function getElementsByXpath(xpath) {
        const snapshot = document.evaluate(
            xpath, document, null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
        );
    
        return [...Array(snapshot.snapshotLength)]
            .map((_, i) => snapshot.snapshotItem(i));
    }
    
    
    // get multiple node element
    function getNoteValueOfElementsByXpath(xpath) {
        const snapshot = document.evaluate(
            xpath, document, null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
        );
    
        return [...Array(snapshot.snapshotLength)]
            .map((_, i) => snapshot.snapshotItem(i).nodeValue);
    }
    
    // for example to get all href of a tag
    getNoteValueOfElementsByXpath('//a[@href]/@href');
```

See more:
- [https://stackoverflow.com/questions/48448586/how-to-use-xpath-in-chrome-headlesspuppeteer-evaluate](https://stackoverflow.com/questions/48448586/how-to-use-xpath-in-chrome-headlesspuppeteer-evaluate)
- [https://gist.github.com/LeCoupa/8c305ec8c713aad07b14](https://gist.github.com/LeCoupa/8c305ec8c713aad07b14)
