import { css, html, LitElement } from 'lit';
import { t } from '../../tokens/tokens.js';
import { baseStyles } from '../../styles/shared.js';

/**
 * `<sea-separator>` — Shadcn separator.
 *
 * @attr {'horizontal'|'vertical'} orientation
 * @customElement sea-separator
 */
export class SeaSeparator extends LitElement {
  static get properties() {
    return {
      orientation: { type: String, reflect: true },
    };
  }

  static get styles() {
    return [
      baseStyles,
      css`
        :host {
          display: block;
          flex-shrink: 0;
          background-color: ${t('border')};
          width: 100%;
          height: 1px;
        }

        :host([orientation='vertical']) {
          width: 1px;
          height: 100%;
          align-self: stretch;
        }
      `,
    ];
  }

  constructor() {
    super();
    /** @type {'horizontal'|'vertical'} */
    this.orientation = 'horizontal';
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'separator');
    }
    this.setAttribute('aria-orientation', this.orientation);
  }

  /** @param {import('lit').PropertyValues} changedProperties */
  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('orientation')) {
      this.setAttribute('aria-orientation', this.orientation);
    }
  }

  render() {
    return html``;
  }
}
