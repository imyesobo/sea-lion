import { expect, fixture, html } from '@open-wc/testing';
import '../src/components/input/sea-input.js';
import '../src/components/textarea/sea-textarea.js';
import '../src/components/select/sea-select.js';
import '../src/components/checkbox-group/sea-checkbox.js';
import '../src/components/checkbox-group/sea-checkbox-group.js';
import '../src/components/radio-group/sea-radio.js';
import '../src/components/radio-group/sea-radio-group.js';
import '../src/components/switch/sea-switch.js';

describe('sea-input', () => {
  it('keeps the lion form control behaviour', async () => {
    const el = await fixture(html`<sea-input label="Email"></sea-input>`);
    expect(el._inputNode).to.be.instanceOf(HTMLInputElement);
    expect(el._labelNode.textContent).to.equal('Email');

    el.modelValue = 'hello@example.com';
    await el.updateComplete;
    expect(el._inputNode.value).to.equal('hello@example.com');
  });

  it('propagates user input to the modelValue', async () => {
    const el = await fixture(html`<sea-input label="Email"></sea-input>`);
    el._inputNode.value = 'typed';
    el._inputNode.dispatchEvent(new Event('input', { bubbles: true }));
    await el.updateComplete;
    expect(el.modelValue).to.equal('typed');
  });
});

describe('sea-textarea', () => {
  it('renders a native textarea', async () => {
    const el = await fixture(html`<sea-textarea label="Bio"></sea-textarea>`);
    expect(el._inputNode).to.be.instanceOf(HTMLTextAreaElement);
  });
});

describe('sea-select', () => {
  it('reads the selected option as modelValue', async () => {
    const el = await fixture(html`
      <sea-select label="Fruit">
        <select slot="input">
          <option value="apple">Apple</option>
          <option value="pear" selected>Pear</option>
        </select>
      </sea-select>
    `);
    expect(el.modelValue).to.equal('pear');
  });
});

describe('sea-checkbox', () => {
  it('renders a check graphic and toggles checked', async () => {
    const el = await fixture(html`<sea-checkbox label="Accept"></sea-checkbox>`);
    expect(el.shadowRoot.querySelector('.checkbox__icon')).to.exist;
    expect(el.checked).to.be.false;

    el._inputNode.click();
    await el.updateComplete;
    expect(el.checked).to.be.true;
  });

  it('shows the graphic container that lion hides by default', async () => {
    const el = await fixture(html`<sea-checkbox label="Accept"></sea-checkbox>`);
    const graphic = el.shadowRoot.querySelector('.choice-field__graphic-container');
    // lion defaults to `display: none`; sea-lion shows it (blockified to `flex` by the flex host)
    expect(getComputedStyle(graphic).display).to.equal('flex');
  });
});

describe('sea-checkbox-group', () => {
  it('collects the checked values', async () => {
    const el = await fixture(html`
      <sea-checkbox-group name="scientists" label="Scientists">
        <sea-checkbox label="Archimedes" .choiceValue=${'Archimedes'}></sea-checkbox>
        <sea-checkbox label="Francis" .choiceValue=${'Francis'} checked></sea-checkbox>
      </sea-checkbox-group>
    `);
    expect(el.modelValue).to.deep.equal(['Francis']);
  });
});

describe('sea-radio-group', () => {
  it('exposes the selected radio as modelValue', async () => {
    const el = await fixture(html`
      <sea-radio-group name="dinos" label="Dinos">
        <sea-radio label="Brontosaurus" .choiceValue=${'brontosaurus'}></sea-radio>
        <sea-radio label="Diplodocus" .choiceValue=${'diplodocus'} checked></sea-radio>
      </sea-radio-group>
    `);
    expect(el.modelValue).to.equal('diplodocus');
  });
});

describe('sea-switch', () => {
  it('toggles and uses the sea-lion switch button', async () => {
    const el = await fixture(html`<sea-switch label="Airplane mode"></sea-switch>`);
    expect(el._inputNode.tagName.toLowerCase()).to.contain('switch-button');
    expect(el.checked).to.be.false;

    el._inputNode.click();
    await el.updateComplete;
    expect(el.checked).to.be.true;
    expect(el._inputNode.getAttribute('aria-checked')).to.equal('true');
  });
});
