import { css, html, LitElement } from 'lit';
import { VariantMixin } from '../../utils/VariantMixin.js';
import { t } from '../../tokens/tokens.js';
import { baseStyles } from '../../styles/shared.js';

/**
 * `<sea-alert>` — Shadcn alert.
 *
 * @slot icon - leading icon
 * @slot title - alert title
 * @slot - alert description
 * @attr {'default'|'destructive'} variant
 * @customElement sea-alert
 */
export class SeaAlert extends VariantMixin(LitElement) {
  static variantConfig = {
    variant: { options: ['default', 'destructive'], default: 'default' },
    size: { options: ['default'], default: 'default' },
  };

  static get styles() {
    return [
      baseStyles,
      css`
        :host {
          display: grid;
          grid-template-columns: 0 1fr;
          gap: 0 0;
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid ${t('border')};
          border-radius: ${t('radius-lg')};
          background-color: ${t('card')};
          color: ${t('card-foreground')};
          font-size: ${t('text-sm')};
        }

        :host([has-icon]) {
          grid-template-columns: calc(1rem) 1fr;
          gap: 0 0.75rem;
        }

        :host([variant='destructive']) {
          color: ${t('destructive')};
          border-color: color-mix(in oklab, ${t('destructive')} 50%, transparent);
          background-color: color-mix(in oklab, ${t('destructive')} 8%, ${t('card')});
        }

        .alert__icon {
          grid-column: 1;
          grid-row: 1 / span 2;
          display: flex;
          align-items: center;
          height: 1rem;
          translate: 0 0.15rem;
        }

        .alert__title {
          grid-column: 2;
          font-weight: 500;
          line-height: 1.25rem;
        }

        .alert__description {
          grid-column: 2;
          color: ${t('muted-foreground')};
          line-height: 1.25rem;
        }

        :host([variant='destructive']) .alert__description {
          color: color-mix(in oklab, ${t('destructive')} 80%, ${t('foreground')});
        }

        ::slotted(svg) {
          width: 1rem;
          height: 1rem;
        }
      `,
    ];
  }

  render() {
    return html`
      <div class="alert__icon"><slot name="icon" @slotchange=${this.__onIconSlotChange}></slot></div>
      <div class="alert__title"><slot name="title"></slot></div>
      <div class="alert__description"><slot></slot></div>
    `;
  }

  /**
   * Reflects whether an icon was provided, so the grid can collapse its first column.
   * @param {Event} event
   * @private
   */
  __onIconSlotChange(event) {
    const slot = /** @type {HTMLSlotElement} */ (event.target);
    this.toggleAttribute('has-icon', slot.assignedNodes({ flatten: true }).length > 0);
  }
}
