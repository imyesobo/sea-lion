import { css, html, LitElement } from 'lit';
import { VariantMixin } from '../../utils/VariantMixin.js';
import { t } from '../../tokens/tokens.js';
import { baseStyles } from '../../styles/shared.js';

/**
 * `<sea-badge>` — Shadcn badge.
 *
 * @slot - badge content
 * @attr {'default'|'secondary'|'destructive'|'outline'} variant
 * @customElement sea-badge
 */
export class SeaBadge extends VariantMixin(LitElement) {
  static variantConfig = {
    variant: {
      options: ['default', 'secondary', 'destructive', 'outline'],
      default: 'default',
    },
    size: { options: ['default'], default: 'default' },
  };

  static get styles() {
    return [
      baseStyles,
      css`
        :host {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.25rem;
          width: fit-content;
          padding: 0.125rem 0.5rem;
          border: 1px solid transparent;
          border-radius: ${t('radius-md')};
          background-color: ${t('primary')};
          color: ${t('primary-foreground')};
          font-size: ${t('text-xs')};
          font-weight: 500;
          line-height: 1rem;
          white-space: nowrap;
        }

        :host([variant='secondary']) {
          background-color: ${t('secondary')};
          color: ${t('secondary-foreground')};
        }

        :host([variant='destructive']) {
          background-color: ${t('destructive')};
          color: ${t('destructive-foreground')};
        }

        :host([variant='outline']) {
          background-color: transparent;
          border-color: ${t('border')};
          color: ${t('foreground')};
        }

        ::slotted(svg) {
          width: 0.75rem;
          height: 0.75rem;
        }
      `,
    ];
  }

  render() {
    return html`<slot></slot>`;
  }
}
