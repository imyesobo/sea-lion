import { css, html, LitElement } from 'lit';
import { t } from '../../tokens/tokens.js';
import { baseStyles } from '../../styles/shared.js';

/**
 * `<sea-tooltip-content>` — the Shadcn tooltip surface.
 *
 * Standalone element (like `<sea-dialog-content>`) because lion teleports the content node
 * out of the component into the global overlay container.
 *
 * @slot - the tooltip text
 * @customElement sea-tooltip-content
 */
export class SeaTooltipContent extends LitElement {
  static get styles() {
    return [
      baseStyles,
      css`
        :host {
          display: block;
          width: max-content;
          max-width: 20rem;
          padding: 0.375rem 0.75rem;
          border-radius: ${t('radius-md')};
          background-color: ${t('primary')};
          color: ${t('primary-foreground')};
          font-size: ${t('text-xs')};
          line-height: 1rem;
          box-shadow: ${t('shadow-md')};
        }
      `,
    ];
  }

  render() {
    return html`<slot></slot>`;
  }
}
