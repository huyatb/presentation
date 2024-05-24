---
layout: post
title: Run puppeteer to control chromium with full header on docker container
tags: ["puppeteer","headless","docker","container","ubuntu", "20.04", "xvfb", "headless", "chromium"]
---
# Install nodejs, npm
```bash
sudo apt-get install nodejs npm -y
```

# Install missing library for chromium
```bash
sudo apt-get install libnss3-dev -y
sudo apt-get install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget libgbm1
```

# Missing X server or $DISPLAY
```bash
sudo apt-get install -y xvfb
sudo apt-get -y install xorg xvfb gtk2-engines-pixbuf
sudo apt-get -y install dbus-x11 xfonts-base xfonts-100dpi xfonts-75dpi xfonts-cyrillic xfonts-scalable
```

# Make sure that Xvfb starts every time the box/vm or container is booted:
```bash
Xvfb -ac :99 -screen 0 1280x1024x16 &
```

# Test your result

## Create a node project

- Make test directory

```bash
mkdir ~/test
cd ~/test 
npm i puppeteer
```

- Create a test.js script in the folder ~/test with the content is

```js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
     args : [
       '--start-maximized',
       '--no-sandbox',
     ],
     headless: false
  });
  
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({ path: 'example.png' });

  await browser.close();
})();

```

## Run node command to test. You can see the file example.png on ~/test folder that show you run header chromium successful

```bash 
DISPLAY=:99 node test.js
```