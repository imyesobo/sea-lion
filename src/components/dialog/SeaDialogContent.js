import { css, html, LitElement } from 'lit';
import { t } from '../../tokens/tokens.js';
import { baseStyles } from '../../styles/shared.js';

/**
 * `<sea-dialog-content>` — the Shadcn dialog surface.
 *
 * It is a standalone element (not a lion extension) on purpose: lion teleports the content node
 * out of `<sea-dialog>` into the global overlay container, so the surface has to carry its own
 * styles. Closing is done by dispatching lion's `close-overlay` event.
 *
 * @slot header - title/description block
 * @slot - the dialog body
 * @slot footer - action buttons
 * @attr {boolean} no-close-button - hides the built-in close button
 * @customElement sea-dialog-content
 */
export class SeaDialogContent extends LitElement {
  static get properties() {
    return {
      noCloseButton: { type: Boolean, attribute: 'no-close-button', reflect: true },
      closeLabel: { type: String, attribute: 'close-label' },
    };
  }

  static get styles() {
    return [
      baseStyles,
      css`
        :host {
          display: flex;
          position: relative;
          flex-direction: column;
          gap: 1rem;
          width: calc(100vw - 2rem);
          max-width: 32rem;
          max-height: calc(100vh - 4rem);
          overflow: auto;
          padding: 1.5rem;
          border: 1px solid ${t('border')};
          border-radius: ${t('radius-lg')};
          background-color: ${t('background')};
          color: ${t('foreground')};
          box-shadow: ${t('shadow-lg')};
        }

        ::slotted([slot='header']) {
          display: flex;
          flex-direction: column;
          gap: 0.375rem;
          text-align: left;
        }

        ::slotted([slot='footer']) {
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          gap: 0.5rem;
        }

        .dialog__close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 1.5rem;
          height: 1.5rem;
          padding: 0;
          border: none;
          border-radius: ${t('radius-sm')};
          background: transparent;
          color: ${t('muted-foreground')};
          cursor: pointer;
          opacity: 0.7;
          transition: opacity ${t('duration-fast')} ${t('easing')};
        }

        .dialog__close:hover {
          opacity: 1;
          background-color: ${t('accent')};
          color: ${t('accent-foreground')};
        }

        .dialog__close:focus-visible {
          outline: 2px solid ${t('ring')};
          outline-offset: 2px;
        }

        .dialog__close svg {
          width: 1rem;
          height: 1rem;
        }
      `,
    ];
  }

  constructor() {
    super();
    /** @type {boolean} */
    this.noCloseButton = false;
    /** @type {string} */
    this.closeLabel = 'Close';
  }

  render() {
    return html`
      <slot name="header"></slot>
      <slot></slot>
      <slot name="footer"></slot>
      ${this.noCloseButton
        ? ''
        : html`
            <button
              class="dialog__close"
              type="button"
              aria-label=${this.closeLabel}
              @click=${this.close}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          `}
    `;
  }

  /**
   * Requests the surrounding overlay to close.
   */
  close() {
    this.dispatchEvent(new Event('close-overlay', { bubbles: true, composed: true }));
  }
}
