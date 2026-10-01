import { LionCheckboxGroup } from '@lion/ui/checkbox-group.js';
import { baseStyles } from '../../styles/shared.js';
import { formControlStyles, choiceGroupStyles } from '../../styles/form-control.js';

/**
 * `<sea-checkbox-group>` — Shadcn styled group wrapper on top of `LionCheckboxGroup`.
 * Handles the shared label, help text, group validation and the modelValue of its children.
 *
 * @fires model-value-changed - the selection changed; `.modelValue` is an array of checked `choiceValue`s. Bubbles.
 * @customElement sea-checkbox-group
 */
export class SeaCheckboxGroup extends LionCheckboxGroup {
  static get styles() {
    return [...super.styles, baseStyles, formControlStyles, choiceGroupStyles];
  }
}
