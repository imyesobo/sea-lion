import { chromeLauncher } from '@web/test-runner';
import { mockPlugin } from '@web/mocks/plugins.js';

export default {
  files: 'test/**/*.test.js',
  nodeResolve: true,
  plugins: [mockPlugin()],
  browsers: [
    chromeLauncher({
      launchOptions: {
        // required to run headless chrome inside containers / CI
        args: ['--no-sandbox', '--disable-dev-shm-usage'],
      },
    }),
  ],
};
