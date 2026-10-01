import { LionRadioGroup } from '@lion/ui/radio-group.js';
import { baseStyles } from '../../styles/shared.js';
import { formControlStyles, choiceGroupStyles } from '../../styles/form-control.js';

/**
 * `<sea-radio-group>` — Shadcn styled group wrapper on top of `LionRadioGroup`.
 *
 * @fires model-value-changed - the selection changed; `.modelValue` is the checked `choiceValue`. Bubbles.
 * @customElement sea-radio-group
 */
export class SeaRadioGroup extends LionRadioGroup {
  static get styles() {
    return [...super.styles, baseStyles, formControlStyles, choiceGroupStyles];
  }
}
