import { chromeLauncher } from '@web/test-runner';
import { mockPlugin } from '@web/mocks/plugins.js';
import { recorderPlugin } from 'web-mocks-recorder/plugin.js';

export default {
  files: 'test/**/*.test.js',
  nodeResolve: true,
  plugins: [
    // serves the MSW service worker (@web/mocks) used by test/mocks.test.js
    mockPlugin(),
    // turns the mocked requests of that test into .interactions/wtr/<test file>.<api>.openapi.json.
    // The upstream plugin is opt-in for WTR (WEB_MOCKS_RECORDER=1) but on-by-default for Storybook,
    // so `enabled` is set here to give both the same semantics: on unless WEB_MOCKS_RECORDER=0.
    recorderPlugin({
      outputDir: '.interactions',
      pathSegments: 2,
      enabled: !['0', 'false'].includes(process.env.WEB_MOCKS_RECORDER ?? ''),
    }),
  ],
  browsers: [
    chromeLauncher({
      launchOptions: {
        args: [
          // required to run headless chrome inside containers / CI
          '--no-sandbox',
          '--disable-dev-shm-usage',
          // keep background tabs from being throttled/paused
          '--disable-background-timer-throttling',
          '--disable-backgrounding-occluded-windows',
          '--disable-renderer-backgrounding',
        ],
      },
      // Every test file runs in its own browser context (= its own window in headless
      // chrome). Pages created as plain tabs of one window are "hidden" except for the
      // active one, and hidden pages never run requestAnimationFrame - which makes any
      // rAF based wait (open-wc's nextFrame/nextRender, overlay layout, ...) hang until
      // mocha times out. Separate contexts keep all sessions visible, so the files can
      // still run in parallel.
      createPage: async ({ browser }) => {
        const context = await browser.createBrowserContext();
        return context.newPage();
      },
    }),
  ],
};
