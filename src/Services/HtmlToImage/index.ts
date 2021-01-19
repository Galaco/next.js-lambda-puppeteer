import { stringType } from 'aws-sdk/clients/iam';
import puppeteer, { Page, Browser, Viewport } from 'puppeteer';
import {
  makeScreenshot,
} from '@/Services/HtmlToImage/screenshot';

export const generateImage = async (): Promise<string | null> => {
  let browserInstance;
  try {
    const browserInstance = await newInstance();
    const page = await browserInstance.newPage();

    const image = await takeScreenshot(
      page,
      {
        width: 512,
        height: 512,
        deviceScaleFactor: 1,
      },
      `http://${
        process.env.APP_URL
      }/image/example`
    );

    await closeInstance(browserInstance);

    return image;
  } catch (error) {
    console.log(error);
    if (browserInstance) {
      await closeInstance(browserInstance);
    }
  }
  return null;
};

const takeScreenshot = async (
  page: Page,
  viewport: Viewport,
  url?: stringType
): Promise<string> => {
  await page.setViewport(viewport);

  if (!url) {
    throw Error('You must provide an html or url property.');
  }

  const buffer = await makeScreenshot(page, {
    transparent: false,
    url,
    // @ts-ignore
    waitUntil: process.env.PUPPETEER_WAITFOR || 'networkidle0',
  });

  return buffer;
};



let chromium: any;

const newInstance = async (): Promise<Browser> => {
  // @TODO: Non-api routes attempt these requires and will fail (chrome-aws-lambda is stripped out)
  // Instead handle the require only when we hit the entrypoint where its actually needed (i.e only api routes)
  // It should be investigated why the require was being handled in the first place. Probably just some tree-shaking required
  if (!chromium) {
    try {
      chromium = require('chrome-aws-lambda');
    } catch (error) {
      throw new Error('chromium failed to load');
    }
  }
  return await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });
};

const closeInstance = async (browser: Browser): Promise<void> => {
  return await browser.close();
};
