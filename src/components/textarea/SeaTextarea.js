import { css } from 'lit';
import { LionTextarea } from '@lion/ui/textarea.js';
import { t } from '../../tokens/tokens.js';
import { baseStyles } from '../../styles/shared.js';
import { formControlStyles, textFieldStyles } from '../../styles/form-control.js';

/**
 * `<sea-textarea>` — Shadcn styled textarea on top of `LionTextarea`
 * (auto-growing behaviour included, via lion's `rows` / `max-rows`).
 *
 * @fires model-value-changed - the value changed; read it from `.modelValue`. Bubbles.
 * @fires user-input-changed - the user (not code) changed the value. Bubbles.
 * @fires focused-changed - the field gained or lost focus. Bubbles.
 * @fires touched-changed - the field was blurred after being focused. Bubbles.
 * @fires dirty-changed - the value changed at least once. Bubbles.
 * @fires validate-performed - validation ran; inspect `.hasFeedbackFor`. Bubbles.
 * @customElement sea-textarea
 */
export class SeaTextarea extends LionTextarea {
  static get styles() {
    return [
      ...super.styles,
      baseStyles,
      formControlStyles,
      textFieldStyles,
      css`
        ::slotted([slot='input']) {
          height: auto;
          min-height: 4rem;
          padding: 0.5rem 0.75rem;
          resize: vertical;
          field-sizing: content;
        }
      `,
    ];
  }
}
