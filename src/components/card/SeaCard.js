import { css, html, LitElement } from 'lit';
import { t } from '../../tokens/tokens.js';
import { baseStyles } from '../../styles/shared.js';

/**
 * `<sea-card>` — Shadcn card surface.
 *
 * Purely presentational, so there is no lion counterpart to extend: it is a plain LitElement
 * using the same design tokens as the rest of the library.
 *
 * @slot header - card title/description
 * @slot - card body
 * @slot footer - card actions
 * @customElement sea-card
 */
export class SeaCard extends LitElement {
  static get styles() {
    return [
      baseStyles,
      css`
        :host {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding: 1.5rem 0;
          border: 1px solid ${t('border')};
          border-radius: ${t('radius-xl')};
          background-color: ${t('card')};
          color: ${t('card-foreground')};
          box-shadow: ${t('shadow-sm')};
        }

        .card__section {
          padding: 0 1.5rem;
        }

        .card__header {
          display: flex;
          flex-direction: column;
          gap: 0.375rem;
        }

        .card__footer {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        ::slotted([slot='header'] *) {
          margin: 0;
        }
      `,
    ];
  }

  render() {
    return html`
      <div class="card__section card__header"><slot name="header"></slot></div>
      <div class="card__section card__content"><slot></slot></div>
      <div class="card__section card__footer"><slot name="footer"></slot></div>
    `;
  }
}
