import { css } from 'lit';
import { t } from '../tokens/tokens.js';

/**
 * Shared chrome for every lion `FormControl` (label, help text, validation feedback and the
 * input-group wrapper). Lion gives us the markup + a11y wiring, this gives it the Shadcn look.
 *
 * Markup recap (from `FormControlMixin`):
 *
 * ```
 * .form-field__group-one   > .form-field__label, .form-field__help-text
 * .form-field__group-two   > .input-group > .input-group__container > .input-group__input
 *                          > .form-field__feedback
 * ```
 */
export const formControlStyles = css`
  :host {
    display: block;
    font-family: ${t('font-sans')};
    font-size: ${t('text-sm')};
    color: ${t('foreground')};
  }

  :host([hidden]) {
    display: none;
  }

  .form-field__label {
    display: block;
    margin-bottom: 0.5rem;
  }

  ::slotted([slot='label']) {
    font-size: ${t('text-sm')};
    font-weight: 500;
    line-height: 1;
    color: ${t('foreground')};
  }

  .form-field__help-text {
    display: block;
    margin-bottom: 0.5rem;
    font-size: ${t('text-sm')};
    color: ${t('muted-foreground')};
  }

  .input-group__container {
    display: flex;
    align-items: center;
  }

  .input-group__input {
    display: flex;
    flex: 1 1 auto;
    min-width: 0;
  }

  .input-group__prefix,
  .input-group__suffix {
    display: flex;
    align-items: center;
    color: ${t('muted-foreground')};
  }

  .form-field__feedback {
    display: block;
    margin-top: 0.5rem;
    font-size: ${t('text-sm')};
    color: ${t('muted-foreground')};
  }

  :host([shows-feedback-for~='error']) .form-field__feedback {
    color: ${t('destructive')};
  }

  :host([disabled]) {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

/**
 * The Shadcn text field skin, applied to the slotted native control
 * (`<input slot="input">` / `<textarea slot="input">` / `<select slot="input">`).
 */
export const textFieldStyles = css`
  ::slotted([slot='input']) {
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
    height: 2.25rem;
    padding: 0.25rem 0.75rem;
    border: 1px solid ${t('input')};
    border-radius: ${t('radius-md')};
    background-color: transparent;
    color: ${t('foreground')};
    font-family: inherit;
    font-size: ${t('text-sm')};
    line-height: ${t('leading-normal')};
    box-shadow: ${t('shadow-xs')};
    outline: none;
    transition:
      border-color ${t('duration-fast')} ${t('easing')},
      box-shadow ${t('duration-fast')} ${t('easing')};
  }

  ::slotted([slot='input']:focus) {
    border-color: ${t('ring')};
    box-shadow: 0 0 0 3px color-mix(in oklab, ${t('ring')} 50%, transparent);
  }

  ::slotted([slot='input']:disabled) {
    cursor: not-allowed;
    opacity: 0.5;
  }

  ::slotted([slot='input']::placeholder) {
    color: ${t('muted-foreground')};
  }

  :host([shows-feedback-for~='error']) ::slotted([slot='input']) {
    border-color: ${t('destructive')};
  }

  :host([shows-feedback-for~='error']) ::slotted([slot='input']:focus) {
    box-shadow: 0 0 0 3px color-mix(in oklab, ${t('destructive')} 40%, transparent);
  }
`;

/**
 * Shared skin for choice inputs (checkbox / radio): the native input is visually replaced by a
 * `.choice-field__graphic-container` box, while staying operable and focusable for a11y.
 */
export const choiceFieldStyles = css`
  :host {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    position: relative;
    font-size: ${t('text-sm')};
  }

  ::slotted([slot='input']) {
    position: absolute;
    top: 0;
    left: 0;
    width: 1rem;
    height: 1rem;
    margin: 0;
    opacity: 0;
    cursor: pointer;
  }

  .choice-field__graphic-container {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 1rem;
    height: 1rem;
    margin-top: 0.125rem;
    border: 1px solid ${t('input')};
    background-color: transparent;
    color: ${t('primary-foreground')};
    box-shadow: ${t('shadow-xs')};
    transition:
      background-color ${t('duration-fast')} ${t('easing')},
      border-color ${t('duration-fast')} ${t('easing')},
      box-shadow ${t('duration-fast')} ${t('easing')};
  }

  :host([checked]) .choice-field__graphic-container {
    background-color: ${t('primary')};
    border-color: ${t('primary')};
  }

  :host(:focus-within) .choice-field__graphic-container {
    border-color: ${t('ring')};
    box-shadow: 0 0 0 3px color-mix(in oklab, ${t('ring')} 50%, transparent);
  }

  :host([disabled]) {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .choice-field__label {
    line-height: 1.25rem;
  }

  ::slotted([slot='label']) {
    font-weight: 500;
    cursor: pointer;
  }

  .choice-field__help-text {
    flex-basis: 100%;
    margin-left: 1.5rem;
    color: ${t('muted-foreground')};
  }
`;

/**
 * Shared skin for the fieldset based groups (checkbox-group / radio-group / fieldset).
 */
export const choiceGroupStyles = css`
  :host {
    display: block;
    border: none;
    padding: 0;
    margin: 0;
  }

  /* FormGroupMixin renders its children in the default slot inside .input-group__container */
  .input-group__container {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }
`;
