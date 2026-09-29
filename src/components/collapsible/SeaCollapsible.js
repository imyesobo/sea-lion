import { css } from 'lit';
import { LionCollapsible } from '@lion/ui/collapsible.js';
import { t } from '../../tokens/tokens.js';
import { baseStyles } from '../../styles/shared.js';

/**
 * `<sea-collapsible>` — Shadcn styled collapsible on top of `LionCollapsible`.
 *
 * @slot invoker - the toggle button
 * @slot content - the collapsible content
 * @customElement sea-collapsible
 */
export class SeaCollapsible extends LionCollapsible {
  static get styles() {
    return [
      ...super.styles,
      baseStyles,
      css`
        :host {
          display: block;
        }

        ::slotted([slot='content']) {
          padding-top: 0.5rem;
          color: ${t('muted-foreground')};
          font-size: ${t('text-sm')};
        }
      `,
    ];
  }
}
