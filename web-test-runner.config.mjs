import { chromeLauncher } from '@web/test-runner';
import { mockPlugin } from '@web/mocks/plugins.js';
import { recorderPlugin } from 'web-mocks-recorder/plugin.js';

export default {
  files: 'test/**/*.test.js',
  nodeResolve: true,
  // Run test files sequentially: overlays (dialog, tooltip) rely on focus/pointer
  // state, which is unreliable when multiple files share one headless browser concurrently.
  concurrency: 1,
  plugins: [mockPlugin(), recorderPlugin({ enabled: true, outputDir: '.interactions', pathSegments: 2})],
  browsers: [
    chromeLauncher({
      launchOptions: {
        // required to run headless chrome inside containers / CI
        args: ['--no-sandbox', '--disable-dev-shm-usage'],
      },
    }),
  ],
};
