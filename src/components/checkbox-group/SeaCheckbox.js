import { css, html } from 'lit';
import { LionCheckbox } from '@lion/ui/checkbox-group.js';
import { t } from '../../tokens/tokens.js';
import { baseStyles } from '../../styles/shared.js';
import { choiceFieldStyles } from '../../styles/form-control.js';

/**
 * `<sea-checkbox>` — Shadcn styled checkbox on top of `LionCheckbox`.
 *
 * The native `<input type="checkbox">` stays in the light DOM (fully operable and announced by
 * screen readers) but is made transparent; the visual box is lion's `choice-field__graphic-container`
 * which we fill with a check icon.
 *
 * @slot label - the checkbox label
 * @fires model-value-changed - the checked state changed; read `.checked` and `.choiceValue`. Bubbles.
 * @customElement sea-checkbox
 */
export class SeaCheckbox extends LionCheckbox {
  static get styles() {
    return [
      ...super.styles,
      baseStyles,
      choiceFieldStyles,
      css`
        .choice-field__graphic-container {
          border-radius: ${t('radius-sm')};
        }

        .checkbox__icon {
          width: 0.75rem;
          height: 0.75rem;
          opacity: 0;
          transform: scale(0.8);
          transition:
            opacity ${t('duration-fast')} ${t('easing')},
            transform ${t('duration-fast')} ${t('easing')};
        }

        :host([checked]) .checkbox__icon {
          opacity: 1;
          transform: scale(1);
        }
      `,
    ];
  }

  /** @protected */
  // eslint-disable-next-line class-methods-use-this
  _choiceGraphicTemplate() {
    return html`
      <svg
        class="checkbox__icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    `;
  }
}
