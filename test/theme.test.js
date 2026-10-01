import { expect, fixture, html } from '@open-wc/testing';

/**
 * Regression tests for the theme selection rules in `src/tokens/tokens.css`.
 *
 * The `prefers-color-scheme` block is declared after `.dark` and has the same specificity, so
 * without the `:not()` guards it silently overrode an explicit theme. That made a manual dark mode
 * toggle a no-op on machines with a dark OS preference (see the demo's theme toggle).
 */
describe('theme tokens', () => {
  /** @type {CSSStyleSheet} */
  let sheet;

  const LIGHT_BACKGROUND = 'oklch(1 0 0)';
  const DARK_BACKGROUND = 'oklch(0.145 0 0)';

  /** @param {string} className */
  const backgroundTokenOf = async className => {
    const el = await fixture(html`<div class="${className}"></div>`);
    return getComputedStyle(el).getPropertyValue('--sl-background').trim();
  };

  before(async () => {
    const css = await (await fetch(new URL('../src/tokens/tokens.css', import.meta.url))).text();
    sheet = new CSSStyleSheet();
    sheet.replaceSync(css);
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
  });

  after(() => {
    document.adoptedStyleSheets = document.adoptedStyleSheets.filter(s => s !== sheet);
  });

  it('applies the light palette by default', async () => {
    expect(await backgroundTokenOf('')).to.equal(LIGHT_BACKGROUND);
  });

  it('applies the dark palette for .dark and [data-theme="dark"]', async () => {
    expect(await backgroundTokenOf('dark')).to.equal(DARK_BACKGROUND);

    const el = await fixture(html`<div data-theme="dark"></div>`);
    expect(getComputedStyle(el).getPropertyValue('--sl-background').trim()).to.equal(
      DARK_BACKGROUND,
    );
  });

  it('lets an explicit .light win over an inherited dark theme', async () => {
    const wrapper = await fixture(html`<div class="dark"><div class="light"></div></div>`);
    const inner = wrapper.firstElementChild;
    expect(getComputedStyle(inner).getPropertyValue('--sl-background').trim()).to.equal(
      LIGHT_BACKGROUND,
    );
  });

  describe('theme-system', () => {
    /** Selector of the `.theme-system` rule inside the `prefers-color-scheme: dark` media block. */
    const systemDarkSelector = () => {
      const mediaRule = [...sheet.cssRules].find(
        rule => rule instanceof CSSMediaRule && rule.conditionText.includes('prefers-color-scheme'),
      );
      expect(mediaRule, 'prefers-color-scheme media rule').to.exist;
      return mediaRule.cssRules[0].selectorText;
    };

    it('follows the system preference while no explicit theme is set', () => {
      const el = document.createElement('div');
      el.className = 'theme-system';
      expect(el.matches(systemDarkSelector())).to.be.true;
    });

    it('stands down for an explicit theme, so a manual toggle always wins', () => {
      const selector = systemDarkSelector();
      for (const explicit of ['dark', 'light']) {
        const byClass = document.createElement('div');
        byClass.className = `theme-system ${explicit}`;
        expect(byClass.matches(selector), `class="theme-system ${explicit}"`).to.be.false;

        const byAttribute = document.createElement('div');
        byAttribute.className = 'theme-system';
        byAttribute.dataset.theme = explicit;
        expect(byAttribute.matches(selector), `data-theme="${explicit}"`).to.be.false;
      }
    });

    it('still resolves to the explicit palette when combined with theme-system', async () => {
      expect(await backgroundTokenOf('theme-system dark')).to.equal(DARK_BACKGROUND);
      expect(await backgroundTokenOf('theme-system light')).to.equal(LIGHT_BACKGROUND);
    });
  });
});
