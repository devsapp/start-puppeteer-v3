const fs = require('fs');
const puppeteer = require('puppeteer');

function autoScroll(page) {
  return page.evaluate(() => {
    return new Promise((resolve, reject) => {
      var totalHeight = 0;
      var distance = 100;
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    })
  });
}

module.exports.handler = function (event, context, callback) {

  (async () => {
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--disable-setuid-sandbox',
        '--no-first-run',
        '--no-zygote',
        '--no-sandbox'
      ]
    });

    const evt = JSON.parse(event)

    let url = evt.queryParameters['url'];

    if (!url) {
      url = 'https://www.serverless-devs.com';
    }

    if (!url.startsWith('https://') && !url.startsWith('http://')) {
      url = 'http://' + url;
    }

    console.log(`url = ${url}`);

    const page = await browser.newPage();

    await page.emulateTimezone('Asia/Shanghai');
    await page.goto(url, {
      'waitUntil': 'networkidle2'
    });
    await page.setViewport({
      width: 1200,
      height: 800
    });
    await autoScroll(page)

    let path = '/tmp/example';
    await page.screenshot({ path: path, fullPage: true, type: 'png' });
    await browser.close();

    const fileData = fs.readFileSync(path);
    const base64Data = Buffer.from(fileData).toString('base64');
    const dataUrl = `data:image/png;base64,${base64Data}`;
    const html = `
  <div style="text-align: center;">
    <img src="${dataUrl}" alt="Base64 Image" style="display: inline-block;">
  </div>
`;

    callback(null, {
      'body': html,
      'headers': {
        'content-type': 'text/html'
      },
      'statusCode': 200
    });
  })().catch(err => {
    callback(null, {
      'body': err.message,
      'headers': {
        'content-type': 'text/plain'
      },
      'statusCode': 500
    });
  });
};