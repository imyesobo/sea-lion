import { aTimeout, expect, fixture, html, nextFrame, oneEvent } from '@open-wc/testing';
import '../src/components/button/sea-button.js';
import '../src/components/tabs/sea-tabs.js';
import '../src/components/accordion/sea-accordion.js';
import '../src/components/dialog/sea-dialog.js';
import '../src/components/tooltip/sea-tooltip.js';
import '../src/components/progress/sea-progress.js';

describe('sea-tabs', () => {
  it('keeps lion selection behaviour and applies the shadcn skin', async () => {
    const el = await fixture(html`
      <sea-tabs>
        <button slot="tab">One</button>
        <div slot="panel">Panel one</div>
        <button slot="tab">Two</button>
        <div slot="panel">Panel two</div>
      </sea-tabs>
    `);
    const tabs = el.querySelectorAll('[slot="tab"]');
    expect(tabs[0].getAttribute('aria-selected')).to.equal('true');

    tabs[1].click();
    await el.updateComplete;
    expect(el.selectedIndex).to.equal(1);
    expect(tabs[1].hasAttribute('selected')).to.be.true;

    const tabGroup = el.shadowRoot.querySelector('.tabs__tab-group');
    expect(parseFloat(getComputedStyle(tabGroup).borderTopLeftRadius)).to.be.greaterThan(0);
  });
});

describe('sea-accordion', () => {
  it('expands the clicked invoker', async () => {
    const el = await fixture(html`
      <sea-accordion>
        <h3 slot="invoker"><button>First</button></h3>
        <div slot="content">First content</div>
        <h3 slot="invoker"><button>Second</button></h3>
        <div slot="content">Second content</div>
      </sea-accordion>
    `);
    // lion moves invokers into its internal `_accordion` slot and tags them with `.invoker`
    const invokers = el.querySelectorAll('.invoker button');
    invokers[1].click();
    await el.updateComplete;
    expect(el.expanded).to.deep.equal([1]);
  });
});

describe('sea-progress', () => {
  it('renders a determinate bar', async () => {
    const el = await fixture(html`<sea-progress value="40"></sea-progress>`);
    expect(el.getAttribute('role')).to.equal('progressbar');
    expect(el.getAttribute('aria-valuenow')).to.equal('40');
    const indicator = el.shadowRoot.querySelector('.progress__indicator');
    expect(indicator.getAttribute('style')).to.contain('scaleX(0.4)');
  });

  it('renders an indeterminate bar when no value is given', async () => {
    const el = await fixture(html`<sea-progress></sea-progress>`);
    expect(el.indeterminate).to.be.true;
    expect(el.shadowRoot.querySelector('.progress__indicator--indeterminate')).to.exist;
  });
});

describe('sea-dialog', () => {
  it('opens on invoker click and closes via the close-overlay event', async () => {
    const el = await fixture(html`
      <sea-dialog>
        <sea-button slot="invoker">Open</sea-button>
        <sea-dialog-content slot="content">
          <div slot="header"><h2>Title</h2></div>
          Body
        </sea-dialog-content>
      </sea-dialog>
    `);
    const content = el.querySelector('sea-dialog-content');
    await nextFrame();

    el.querySelector('[slot="invoker"]').click();
    await aTimeout(0);
    expect(el.opened).to.be.true;

    content.close();
    await aTimeout(0);
    expect(el.opened).to.be.false;
  });

  it('injects the document level overlay styles', async () => {
    await fixture(html`<sea-dialog><button slot="invoker">Open</button><div slot="content">x</div></sea-dialog>`);
    expect(document.getElementById('sea-lion-overlay-styles')).to.exist;
  });
});

describe('sea-tooltip', () => {
  it('shows its content on invoker focus', async () => {
    const el = await fixture(html`
      <sea-tooltip>
        <button slot="invoker">Hover me</button>
        <sea-tooltip-content slot="content">Tooltip text</sea-tooltip-content>
      </sea-tooltip>
    `);
    await nextFrame();
    const invoker = el.querySelector('[slot="invoker"]');
    setTimeout(() => invoker.focus());
    await oneEvent(el, 'opened-changed');
    expect(el.opened).to.be.true;

    setTimeout(() => invoker.blur());
    await oneEvent(el, 'opened-changed');
    expect(el.opened).to.be.false;
  });
});
