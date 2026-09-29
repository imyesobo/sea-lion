import { css } from 'lit';
import { LionButton } from '@lion/ui/button.js';
import { VariantMixin } from '../../utils/VariantMixin.js';
import { t } from '../../tokens/tokens.js';
import { baseStyles, disabledStyles } from '../../styles/shared.js';

/**
 * `<sea-button>` — Shadcn styled button on top of `LionButton`.
 *
 * All accessibility behaviour (role, keyboard activation, disabled handling) comes from lion;
 * this class only adds the visual layer and the `variant` / `size` API.
 *
 * @slot - the button label (text, icons, …)
 * @attr {'default'|'secondary'|'destructive'|'outline'|'ghost'|'link'} variant
 * @attr {'sm'|'default'|'lg'|'icon'} size
 * @customElement sea-button
 */
export class SeaButton extends VariantMixin(LionButton) {
  static variantConfig = {
    variant: {
      options: ['default', 'secondary', 'destructive', 'outline', 'ghost', 'link'],
      default: 'default',
    },
    size: { options: ['sm', 'default', 'lg', 'icon'], default: 'default' },
  };

  static get styles() {
    return [
      ...super.styles,
      baseStyles,
      disabledStyles,
      css`
        :host {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          white-space: nowrap;
          border: 1px solid transparent;
          border-radius: ${t('radius-md')};
          font-size: ${t('text-sm')};
          font-weight: 500;
          line-height: ${t('leading-normal')};
          cursor: pointer;
          transition:
            background-color ${t('duration-fast')} ${t('easing')},
            color ${t('duration-fast')} ${t('easing')},
            border-color ${t('duration-fast')} ${t('easing')},
            box-shadow ${t('duration-fast')} ${t('easing')};
          /* neutralise the lion default skin */
          background-color: ${t('primary')};
          color: ${t('primary-foreground')};
          box-shadow: ${t('shadow-xs')};
          padding: 0.5rem 1rem;
          height: 2.25rem;
        }

        /* lion renders a 44x44 hit area pseudo element; keep it but never let it paint */
        :host::before {
          background: transparent;
        }

        .button-content {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          pointer-events: none;
        }

        ::slotted(svg) {
          width: 1rem;
          height: 1rem;
          flex-shrink: 0;
          pointer-events: none;
        }

        /* ---------------------------------------------------------------- sizes */
        :host([size='sm']) {
          height: 2rem;
          padding: 0 0.75rem;
          gap: 0.375rem;
        }

        :host([size='lg']) {
          height: 2.5rem;
          padding: 0 1.5rem;
        }

        :host([size='icon']) {
          width: 2.25rem;
          height: 2.25rem;
          padding: 0;
        }

        /* ------------------------------------------------------------- variants */
        :host(:hover) {
          background-color: color-mix(in oklab, ${t('primary')} 90%, transparent);
        }

        :host([variant='secondary']) {
          background-color: ${t('secondary')};
          color: ${t('secondary-foreground')};
        }
        :host([variant='secondary']:hover) {
          background-color: color-mix(in oklab, ${t('secondary')} 80%, transparent);
        }

        :host([variant='destructive']) {
          background-color: ${t('destructive')};
          color: ${t('destructive-foreground')};
        }
        :host([variant='destructive']:hover) {
          background-color: color-mix(in oklab, ${t('destructive')} 90%, transparent);
        }
        :host([variant='destructive']:focus-visible) {
          outline-color: color-mix(in oklab, ${t('destructive')} 50%, transparent);
        }

        :host([variant='outline']) {
          background-color: ${t('background')};
          color: ${t('foreground')};
          border-color: ${t('border')};
        }
        :host([variant='outline']:hover) {
          background-color: ${t('accent')};
          color: ${t('accent-foreground')};
        }

        :host([variant='ghost']) {
          background-color: transparent;
          color: ${t('foreground')};
          box-shadow: none;
        }
        :host([variant='ghost']:hover) {
          background-color: ${t('accent')};
          color: ${t('accent-foreground')};
        }

        :host([variant='link']) {
          background-color: transparent;
          color: ${t('primary')};
          box-shadow: none;
          text-underline-offset: 4px;
          padding: 0;
          height: auto;
        }
        :host([variant='link']:hover) {
          background-color: transparent;
          text-decoration: underline;
        }

        /* --------------------------------------------------------------- states */
        :host(:active),
        :host([active]) {
          background-color: color-mix(in oklab, ${t('primary')} 85%, transparent);
        }
        :host([variant='outline'][active]),
        :host([variant='ghost'][active]),
        :host([variant='link'][active]) {
          background-color: color-mix(in oklab, ${t('accent')} 80%, transparent);
        }

        :host(:focus:not([disabled])),
        :host(:focus-visible) {
          outline: 2px solid ${t('ring')};
          outline-offset: 2px;
        }

        :host(:focus:not(:focus-visible)) {
          outline: 0;
        }

        :host([disabled]) {
          background-color: ${t('primary')};
          color: ${t('primary-foreground')};
          cursor: not-allowed;
        }
        :host([disabled][variant='secondary']) {
          background-color: ${t('secondary')};
          color: ${t('secondary-foreground')};
        }
        :host([disabled][variant='destructive']) {
          background-color: ${t('destructive')};
          color: ${t('destructive-foreground')};
        }
        :host([disabled][variant='outline']),
        :host([disabled][variant='ghost']),
        :host([disabled][variant='link']) {
          background-color: transparent;
          color: ${t('foreground')};
        }
      `,
    ];
  }
}
