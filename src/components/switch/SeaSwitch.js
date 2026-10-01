import { css } from 'lit';
import { LionSwitch } from '@lion/ui/switch.js';
import { t } from '../../tokens/tokens.js';
import { baseStyles } from '../../styles/shared.js';
import { formControlStyles } from '../../styles/form-control.js';
import { SeaSwitchButton } from './SeaSwitchButton.js';

/**
 * `<sea-switch>` — Shadcn styled switch on top of `LionSwitch`.
 *
 * The inner switch button is swapped for `SeaSwitchButton` through lion's scoped elements,
 * so no lion styling leaks into the component.
 *
 * @slot label - the switch label
 * @fires model-value-changed - the switch was toggled; read `.checked`. Bubbles.
 * @customElement sea-switch
 */
export class SeaSwitch extends LionSwitch {
  static get scopedElements() {
    return {
      ...super.scopedElements,
      'lion-switch-button': SeaSwitchButton,
    };
  }

  static get styles() {
    return [
      ...super.styles,
      baseStyles,
      formControlStyles,
      css`
        :host {
          display: flex;
          flex-direction: row-reverse;
          align-items: center;
          justify-content: flex-end;
          gap: 0.5rem;
        }

        .form-field__label {
          margin-bottom: 0;
        }

        ::slotted([slot='label']) {
          cursor: pointer;
          font-weight: 500;
        }

        :host([disabled]) ::slotted([slot='label']) {
          cursor: not-allowed;
          color: ${t('muted-foreground')};
        }
      `,
    ];
  }
}
