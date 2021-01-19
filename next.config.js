const localEnvironment = {
  DEFAULT_APP_URL: 'localhost:3000',
};

module.exports = {
  target: 'serverless',
  env: {
    APP_URL: process.env.APP_URL || localEnvironment.DEFAULT_APP_URL,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));

    // This exists to keep the package size below the lambda 50mb zipped limit
    if (isServer) {
      if (!dev) {
        config.externals = ['aws-sdk', 'chrome-aws-lambda', 'lambdafs'];
      }
    }

    return config;
  },
};
