import { css } from 'lit';
import { LionSwitchButton } from '@lion/ui/switch.js';
import { t } from '../../tokens/tokens.js';
import { baseStyles } from '../../styles/shared.js';

/**
 * `<sea-switch-button>` — the track/thumb graphic used by `<sea-switch>`.
 * Extends `LionSwitchButton`, which owns the keyboard + aria-checked behaviour.
 *
 * @customElement sea-switch-button
 */
export class SeaSwitchButton extends LionSwitchButton {
  static get styles() {
    return [
      ...super.styles,
      baseStyles,
      css`
        :host {
          display: inline-block;
          width: 2rem;
          height: 1.15rem;
          cursor: pointer;
        }

        :host([disabled]) {
          cursor: not-allowed;
          opacity: 0.5;
        }

        .switch-button__track {
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          border: 1px solid transparent;
          border-radius: 9999px;
          background-color: color-mix(in oklab, ${t('primary')} 20%, transparent);
          box-shadow: ${t('shadow-xs')};
          transition: background-color ${t('duration-normal')} ${t('easing')};
        }

        :host([checked]) .switch-button__track {
          background-color: ${t('primary')};
        }

        .switch-button__thumb {
          position: absolute;
          top: 50%;
          left: 2px;
          width: 0.875rem;
          height: 0.875rem;
          border-radius: 9999px;
          background-color: ${t('background')};
          box-shadow: ${t('shadow-sm')};
          transform: translate(0, -50%);
          transition: transform ${t('duration-normal')} ${t('easing')};
        }

        :host([checked]) .switch-button__thumb {
          right: auto;
          transform: translate(calc(2rem - 0.875rem - 4px), -50%);
        }

        :host(:focus:not([disabled])) .switch-button__thumb,
        :host(:focus-visible) .switch-button__thumb {
          outline: none;
        }

        :host(:focus-visible) .switch-button__track {
          outline: 2px solid ${t('ring')};
          outline-offset: 2px;
        }
      `,
    ];
  }
}
