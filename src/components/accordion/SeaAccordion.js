import { css } from 'lit';
import { LionAccordion } from '@lion/ui/accordion.js';
import { t } from '../../tokens/tokens.js';
import { baseStyles } from '../../styles/shared.js';

/**
 * `<sea-accordion>` — Shadcn styled accordion on top of `LionAccordion`.
 *
 * Light DOM contract is unchanged: `<h3 slot="invoker"><button>…</button></h3>` +
 * `<div slot="content">…</div>` pairs.
 *
 * @slot invoker - the headings containing the toggle buttons
 * @slot content - the collapsible panels
 * @customElement sea-accordion
 */
export class SeaAccordion extends LionAccordion {
  static get styles() {
    return [
      ...super.styles,
      baseStyles,
      css`
        :host {
          display: block;
        }

        /* lion moves invokers/content into its internal _accordion slot and tags
           them with the invoker / content classes */
        ::slotted(.invoker) {
          margin: 0;
          border-top: 1px solid ${t('border')};
          font-size: ${t('text-sm')};
        }

        ::slotted(.invoker:first-of-type) {
          border-top: none;
        }

        ::slotted(.content) {
          padding: 0 0 1rem;
          color: ${t('muted-foreground')};
          font-size: ${t('text-sm')};
        }
      `,
    ];
  }
}
