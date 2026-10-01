import { css } from 'lit';
import { LionSelect } from '@lion/ui/select.js';
import { t } from '../../tokens/tokens.js';
import { baseStyles } from '../../styles/shared.js';
import { formControlStyles, textFieldStyles } from '../../styles/form-control.js';

/**
 * `<sea-select>` — Shadcn styled select on top of `LionSelect`.
 *
 * Uses the native `<select>` (best mobile/a11y behaviour, just like lion) with a custom chevron.
 * For a fully custom listbox, use `LionSelectRich` as base in your own extension.
 *
 * @slot label - the field label
 * @slot input - the native `<select>` with its `<option>`s
 * @fires model-value-changed - the value changed; read it from `.modelValue`. Bubbles.
 * @fires user-input-changed - the user (not code) changed the value. Bubbles.
 * @fires focused-changed - the field gained or lost focus. Bubbles.
 * @fires touched-changed - the field was blurred after being focused. Bubbles.
 * @fires dirty-changed - the value changed at least once. Bubbles.
 * @fires validate-performed - validation ran; inspect `.hasFeedbackFor`. Bubbles.
 * @customElement sea-select
 */
export class SeaSelect extends LionSelect {
  static get styles() {
    return [
      ...super.styles,
      baseStyles,
      formControlStyles,
      textFieldStyles,
      css`
        ::slotted([slot='input']) {
          appearance: none;
          -webkit-appearance: none;
          padding-right: 2rem;
          cursor: pointer;
          background-repeat: no-repeat;
          background-position: right 0.625rem center;
          background-size: 1rem 1rem;
          /* chevron-down, stroke uses currentColor via the muted foreground token */
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23737373' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
        }

        ::slotted([slot='input']:disabled) {
          cursor: not-allowed;
        }

        .input-group__container {
          position: relative;
        }

        :host([shows-feedback-for~='error']) ::slotted([slot='input']) {
          border-color: ${t('destructive')};
        }
      `,
    ];
  }
}
