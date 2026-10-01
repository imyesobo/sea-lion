import { css } from 'lit';
import { LionInput } from '@lion/ui/input.js';
import { t } from '../../tokens/tokens.js';
import { baseStyles } from '../../styles/shared.js';
import { formControlStyles, textFieldStyles } from '../../styles/form-control.js';

/**
 * `<sea-input>` — Shadcn styled text field on top of `LionInput`.
 *
 * Keeps lion's formatting, parsing, validation and a11y wiring; only the skin is replaced.
 *
 * @slot label - the field label
 * @slot input - the native `<input>` (created by lion when omitted)
 * @slot help-text - supporting copy under the label
 * @slot prefix,suffix,before,after - adornments
 * @slot feedback - validation feedback (managed by lion)
 * @fires model-value-changed - the value changed; read it from `.modelValue`. Bubbles.
 * @fires user-input-changed - the user (not code) changed the value. Bubbles.
 * @fires focused-changed - the field gained or lost focus. Bubbles.
 * @fires touched-changed - the field was blurred after being focused. Bubbles.
 * @fires dirty-changed - the value changed at least once. Bubbles.
 * @fires validate-performed - validation ran; inspect `.hasFeedbackFor`. Bubbles.
 * @customElement sea-input
 */
export class SeaInput extends LionInput {
  static get styles() {
    return [
      ...super.styles,
      baseStyles,
      formControlStyles,
      textFieldStyles,
      css`
        .input-group__prefix ::slotted(*),
        .input-group__suffix ::slotted(*) {
          font-size: ${t('text-sm')};
          color: ${t('muted-foreground')};
        }
      `,
    ];
  }
}
