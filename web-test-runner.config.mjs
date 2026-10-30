import { chromeLauncher } from '@web/test-runner';

export default {
  files: 'test/**/*.test.js',
  nodeResolve: true,
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
