import { css } from 'lit';
import { LionDialog } from '@lion/ui/dialog.js';
import { baseStyles } from '../../styles/shared.js';
import { ensureOverlayStyles } from '../../styles/overlay.js';

/**
 * `<sea-dialog>` — Shadcn styled dialog on top of `LionDialog`.
 *
 * Lion owns everything hard about overlays: focus trap, scroll locking, `Esc` handling,
 * backdrop, top-layer rendering and accessibility. sea-lion only adds the skin, which lives in
 * `<sea-dialog-content>` because lion teleports the content node to a global overlay container.
 *
 * @slot invoker - the element that opens the dialog
 * @slot content - the dialog surface, typically a `<sea-dialog-content>`
 * @customElement sea-dialog
 */
export class SeaDialog extends LionDialog {
  static get styles() {
    return [
      ...(super.styles || []),
      baseStyles,
      css`
        :host {
          display: inline-block;
        }
      `,
    ];
  }

  connectedCallback() {
    ensureOverlayStyles();
    super.connectedCallback();
  }
}
