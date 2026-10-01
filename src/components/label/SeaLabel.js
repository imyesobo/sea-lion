import { css, html, LitElement } from 'lit';
import { t } from '../../tokens/tokens.js';
import { baseStyles } from '../../styles/shared.js';

/**
 * `<sea-label>` — Shadcn label, for standalone usage outside of a lion form control
 * (lion form controls already render their own `slot="label"`).
 *
 * @slot - label text
 * @customElement sea-label
 */
export class SeaLabel extends LitElement {
  static get styles() {
    return [
      baseStyles,
      css`
        :host {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: ${t('text-sm')};
          font-weight: 500;
          line-height: 1;
          user-select: none;
        }
      `,
    ];
  }

  render() {
    return html`<slot></slot>`;
  }
}
