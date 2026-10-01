import { css, html } from 'lit';
import { LionRadio } from '@lion/ui/radio-group.js';
import { t } from '../../tokens/tokens.js';
import { baseStyles } from '../../styles/shared.js';
import { choiceFieldStyles } from '../../styles/form-control.js';

/**
 * `<sea-radio>` — Shadcn styled radio on top of `LionRadio`.
 *
 * @slot label - the radio label
 * @fires model-value-changed - the checked state changed; read `.checked` and `.choiceValue`. Bubbles.
 * @customElement sea-radio
 */
export class SeaRadio extends LionRadio {
  static get styles() {
    return [
      ...super.styles,
      baseStyles,
      choiceFieldStyles,
      css`
        .choice-field__graphic-container {
          border-radius: 9999px;
        }

        :host([checked]) .choice-field__graphic-container {
          background-color: transparent;
          border-color: ${t('primary')};
        }

        .radio__dot {
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 9999px;
          background-color: ${t('primary')};
          transform: scale(0);
          transition: transform ${t('duration-fast')} ${t('easing')};
        }

        :host([checked]) .radio__dot {
          transform: scale(1);
        }
      `,
    ];
  }

  /** @protected */
  // eslint-disable-next-line class-methods-use-this
  _choiceGraphicTemplate() {
    return html`<span class="radio__dot" aria-hidden="true"></span>`;
  }
}
