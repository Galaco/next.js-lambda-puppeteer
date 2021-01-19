const fs = require('fs-extra');

console.log('-> Copying require external dependencies');

const dependencies = [
  {
    src: './node_modules/chrome-aws-lambda',
    dest: './.serverless_nextjs/api-lambda/node_modules/chrome-aws-lambda',
  },
  {
    src: './node_modules/lambdafs',
    dest: './.serverless_nextjs/api-lambda/node_modules/lambdafs',
  },
];

dependencies.forEach(dep => {
  console.log(`   Copying ${dep.src}`);
  fs.copySync(dep.src, dep.dest, { recursive: true });
});

console.log('External dependencies copied successfully');
