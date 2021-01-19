# Next.js 10 Puppeteer

A Next.js 10 application template that includes Puppeteer and chrome-aws-lambda. This application is a simple showcase of how to setup chrome-aws-lambda using puppeteer, and an example api route that screenshots another page and returns it as the response body.

## Local Development
#### Installation
* Install dependencies via `yarn install`
* Run `yarn dev`

##### Pitfalls that it took ages to find solutions to...
* If you are screenshotting pages in this application, for local development Puppeteer's waitfor value must be set to `networkidle2`, because the dev server keeps 1+ connections alive for quick-refreshing the page. For Lambda environments, this should be set to `networkidle0`.
