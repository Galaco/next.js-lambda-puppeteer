import { Page, LoadEvent } from 'puppeteer';

export interface ScreenshotOptions {
  output?: string;
  quality?: number;
  encoding?: string;
  url: string;
  transparent: boolean;
  waitUntil?: LoadEvent;
}

export const makeScreenshot = async function (
  page: Page,
  {
    output,
    quality,
    encoding,
    url,
    transparent = false,
    waitUntil = 'networkidle0',
  }: ScreenshotOptions
): Promise<string> {
  let screeshotArgs = <any>{};

  const type = 'jpeg';
  screeshotArgs.quality = quality ? quality : 100;

  await page.goto(url, { waitUntil });

  const buffer = await page.screenshot({
    path: output,
    type,
    omitBackground: transparent,
    encoding,
    ...screeshotArgs,
  });

  return buffer;
};
