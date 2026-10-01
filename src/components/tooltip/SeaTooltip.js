import { css } from 'lit';
import { LionTooltip } from '@lion/ui/tooltip.js';
import { t } from '../../tokens/tokens.js';
import { baseStyles } from '../../styles/shared.js';
import { ensureOverlayStyles } from '../../styles/overlay.js';

/**
 * `<sea-tooltip>` — Shadcn styled tooltip on top of `LionTooltip`.
 *
 * Positioning (popper), hover/focus triggers and the aria relation are handled by lion.
 *
 * @slot invoker - the element the tooltip describes
 * @slot content - the tooltip surface, typically a `<sea-tooltip-content>`
 * @fires before-opened - cancelable; call `preventDefault()` to stop the tooltip showing. Does **not** bubble.
 * @fires opened-changed - the tooltip showed or hid; read `.opened`. Does **not** bubble.
 * @customElement sea-tooltip
 */
export class SeaTooltip extends LionTooltip {
  static get styles() {
    return [
      ...super.styles,
      baseStyles,
      css`
        :host {
          display: inline-block;
        }

        /* the arrow is rendered inside the teleported content wrapper */
        .arrow svg {
          fill: ${t('primary')};
        }
      `,
    ];
  }

  connectedCallback() {
    ensureOverlayStyles();
    super.connectedCallback();
  }
}
