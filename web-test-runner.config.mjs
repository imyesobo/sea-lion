import { chromeLauncher } from '@web/test-runner';

export default {
  files: 'test/**/*.test.js',
  nodeResolve: true,
  browsers: [
    chromeLauncher({
      launchOptions: {
        // required to run headless chrome inside containers / CI
        args: ['--no-sandbox', '--disable-dev-shm-usage'],
      },
    }),
  ],
};
