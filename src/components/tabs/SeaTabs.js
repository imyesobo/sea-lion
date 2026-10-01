import { css } from 'lit';
import { LionTabs } from '@lion/ui/tabs.js';
import { t } from '../../tokens/tokens.js';
import { baseStyles } from '../../styles/shared.js';

/**
 * `<sea-tabs>` — Shadcn styled tabs on top of `LionTabs`.
 *
 * Lion owns the roving tabindex, aria wiring and selection logic; the light DOM contract is
 * unchanged: `<button slot="tab">` + `<div slot="panel">` pairs.
 *
 * @slot tab - the tab invokers
 * @slot panel - the tab panels
 * @fires selected-changed - the active tab changed; read `.selectedIndex`. Does **not** bubble.
 * @customElement sea-tabs
 */
export class SeaTabs extends LionTabs {
  static get styles() {
    return [
      ...super.styles,
      baseStyles,
      css`
        :host {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .tabs__tab-group {
          display: inline-flex;
          align-items: center;
          justify-content: flex-start;
          width: fit-content;
          padding: 3px;
          gap: 0.25rem;
          border-radius: ${t('radius-lg')};
          background-color: ${t('muted')};
          color: ${t('muted-foreground')};
        }

        .tabs__tab-group ::slotted([slot='tab']) {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.375rem;
          height: calc(100% - 1px);
          padding: 0.25rem 0.625rem;
          border: 1px solid transparent;
          border-radius: ${t('radius-md')};
          background-color: transparent;
          color: ${t('muted-foreground')};
          font-family: inherit;
          font-size: ${t('text-sm')};
          font-weight: 500;
          line-height: ${t('leading-normal')};
          white-space: nowrap;
          cursor: pointer;
          transition:
            background-color ${t('duration-fast')} ${t('easing')},
            color ${t('duration-fast')} ${t('easing')},
            box-shadow ${t('duration-fast')} ${t('easing')};
        }

        .tabs__tab-group ::slotted([slot='tab']:hover) {
          color: ${t('foreground')};
        }

        .tabs__tab-group ::slotted([slot='tab'][selected]) {
          background-color: ${t('background')};
          color: ${t('foreground')};
          box-shadow: ${t('shadow-sm')};
          font-weight: 500;
        }

        .tabs__tab-group ::slotted([slot='tab']:focus-visible) {
          outline: 2px solid ${t('ring')};
          outline-offset: 2px;
        }

        .tabs__tab-group ::slotted([slot='tab'][disabled]) {
          opacity: 0.5;
          pointer-events: none;
        }

        .tabs__panels ::slotted([slot='panel']) {
          outline: none;
          color: ${t('foreground')};
        }
      `,
    ];
  }
}
