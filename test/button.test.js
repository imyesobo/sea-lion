import { expect, fixture, html } from '@open-wc/testing';
import '../src/components/button/sea-button.js';
import '../src/components/badge/sea-badge.js';
import '../src/components/alert/sea-alert.js';
import '../src/components/separator/sea-separator.js';

describe('sea-button', () => {
  it('renders its slotted content and keeps the lion button semantics', async () => {
    const el = await fixture(html`<sea-button>Click me</sea-button>`);
    expect(el.getAttribute('role')).to.equal('button');
    expect(el.textContent.trim()).to.equal('Click me');
  });

  it('defaults to the "default" variant and size', async () => {
    const el = await fixture(html`<sea-button>x</sea-button>`);
    expect(el.getAttribute('variant')).to.equal('default');
    expect(el.getAttribute('size')).to.equal('default');
  });

  it('reflects valid variants and falls back on unknown ones', async () => {
    const el = await fixture(html`<sea-button variant="destructive">x</sea-button>`);
    expect(el.variant).to.equal('destructive');

    el.setAttribute('variant', 'not-a-variant');
    await el.updateComplete;
    expect(el.variant).to.equal('default');
    expect(el.getAttribute('variant')).to.equal('default');
  });

  it('applies the shadcn skin instead of the lion default skin', async () => {
    const el = await fixture(html`<sea-button>x</sea-button>`);
    const { backgroundColor, borderRadius } = getComputedStyle(el);
    // lion's default is rgb(238, 238, 238)
    expect(backgroundColor).to.not.equal('rgb(238, 238, 238)');
    expect(parseFloat(borderRadius)).to.be.greaterThan(0);
  });

  it('is not clickable when disabled', async () => {
    const el = await fixture(html`<sea-button disabled>x</sea-button>`);
    let clicked = 0;
    el.addEventListener('click', () => {
      clicked += 1;
    });
    el.dispatchEvent(new MouseEvent('click'));
    expect(el.getAttribute('aria-disabled')).to.equal('true');
    expect(getComputedStyle(el).pointerEvents).to.equal('none');
    expect(clicked).to.equal(1); // programmatic dispatch still fires; pointer-events blocks real ones
  });
});

describe('sea-badge', () => {
  it('supports its variants', async () => {
    const el = await fixture(html`<sea-badge variant="secondary">new</sea-badge>`);
    expect(el.variant).to.equal('secondary');

    el.variant = 'nope';
    await el.updateComplete;
    expect(el.variant).to.equal('default');
  });
});

describe('sea-alert', () => {
  it('only reserves space for the icon when one is slotted', async () => {
    const plain = await fixture(html`<sea-alert>Heads up</sea-alert>`);
    expect(plain.hasAttribute('has-icon')).to.be.false;

    const withIcon = await fixture(
      html`<sea-alert><svg slot="icon"></svg>Heads up</sea-alert>`,
    );
    expect(withIcon.hasAttribute('has-icon')).to.be.true;
  });
});

describe('sea-separator', () => {
  it('exposes the correct a11y semantics', async () => {
    const el = await fixture(html`<sea-separator></sea-separator>`);
    expect(el.getAttribute('role')).to.equal('separator');
    expect(el.getAttribute('aria-orientation')).to.equal('horizontal');

    el.orientation = 'vertical';
    await el.updateComplete;
    expect(el.getAttribute('aria-orientation')).to.equal('vertical');
  });
});
