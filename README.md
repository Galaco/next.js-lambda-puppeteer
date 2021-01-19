# Next.js 10 Puppeteer

A Next.js 10 application template that includes Puppeteer and chrome-aws-lambda. This application is a simple showcase of how to setup chrome-aws-lambda using puppeteer, and an example api route that screenshots another page and returns it as the response body.

## Local Development
#### Installation
* Install dependencies via `yarn install`
* Run `yarn dev`

## Production 

This serverless application uses: [https://github.com/serverless-nextjs/serverless-next.js#readme](https://github.com/serverless-nextjs/serverless-next.js#readme). See the documents for more comprehensive information.

Ensure that your serverless.yml reflects your intended infrastructure and environment configuration, then run:
    * `env STAGE=<dev|prod> serverless`.

##### Pitfalls that it took ages to find solutions to...
* If you are screenshotting pages in this application, for local development Puppeteer's waitfor value must be set to `networkidle2`, because the dev server keeps 1+ connections alive for quick-refreshing the page. For Lambda environments, this should be set to `networkidle0`.
* By default, each deployment will create a new cloudfront distribution. To use a consistent cloudfront distribution, there are 2 (recommended) options by the library authors:
    * Commit the `.serverless` directory generated on first deploy (it contains references to the generated aws resources for future deploys).
    * Update `serverless.yml` to uncomment `cloudfront.distributionId` and change the distribution id to the id of the cloudfront distro generated on first deploy.
* If you experience the following/similar npm/yarn error: `enoent ENOENT: no such file or directory, lstat '/root/.serverless/components/registry/npm/@serverless/aws-s3@4.2.0'`, then the only current solution is to manually create these missing directories, due to a library bug. See: [https://github.com/serverless-nextjs/serverless-next.js/issues/707](https://github.com/serverless-nextjs/serverless-next.js/issues/707). I.e. run something like this: `/root/.serverless/components/registry/npm/@serverless/aws-s3@4.2.0`
