const fs = require("fs");
const puppeteer = require("puppeteer");

async function autoScroll(page) {
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
    });
  });
}

function isRecoverableNetworkErrorMessage(err) {
  if (err instanceof Error) {
    const message = err.message;
    const re = /net::(ERR_NETWORK_CHANGED|ERR_CONNECTION_CLOSED)/;
    return re.test(message);
  }
  return false;
}

async function sleep(seconds) {
  console.log(`sleeping ${seconds} seconds`);
  await new Promise((r) => setTimeout(r, seconds * 1000));
}

async function goto(url) {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--disable-setuid-sandbox",
      "--no-first-run",
      "--no-zygote",
      "--no-sandbox",
    ],
  });

  const page = await browser.newPage();
  await page.emulateTimezone("Asia/Shanghai");
  await page.goto(url, {
    waitUntil: "networkidle2",
  });
  await page.setViewport({
    width: 1200,
    height: 800,
  });
  await autoScroll(page);

  let path = "/tmp/example";
  await page.screenshot({ path: path, fullPage: true, type: "png" });
  await browser.close();

  const fileData = fs.readFileSync(path);
  const base64Data = Buffer.from(fileData).toString("base64");
  const dataUrl = `data:image/png;base64,${base64Data}`;
  const html = `
  <div style="text-align: center;">
    <img src="${dataUrl}" alt="Base64 Image" style="display: inline-block;">
  </div>
`;

  return {
    body: html,
    headers: {
      "content-type": "text/html",
    },
    statusCode: 200,
  };
}

exports.handler = async function (event, context, callback) {
  const evt = JSON.parse(event);

  let url = evt.queryParameters["url"];

  if (!url) {
    url = "https://www.aliyun.com/";
  }

  if (!url.startsWith("https://") && !url.startsWith("http://")) {
    url = "http://" + url;
  }

  console.log(`url = ${url}`);

  let interval = 1;
  const rate = 2;
  const count = 3;

  for (let i = 0; i < count; i++) {
    try {
      const ret = await goto(url);
      callback(null, ret);
    } catch (err) {
      if (i < count - 1) {
        if (isRecoverableNetworkErrorMessage(err)) {
          await sleep(interval);
          interval = rate * interval;
          continue;
        }
      } else {
        callback(null, {
          body: err.message,
          headers: {
            "content-type": "text/plain",
          },
          statusCode: 500,
        });
      }
    }
  }
};
