import { css } from 'lit';
import { t } from '../tokens/tokens.js';

/**
 * Typography + box-sizing baseline that every sea-lion component inherits.
 */
export const baseStyles = css`
  :host {
    box-sizing: border-box;
    font-family: ${t('font-sans')};
    font-size: ${t('text-sm')};
    line-height: 1.43;
    color: ${t('foreground')};
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  :host([hidden]) {
    display: none;
  }
`;

/**
 * Shadcn focus treatment: a 3px translucent ring plus a solid border-coloured outline.
 * Applied on the host, so it also works for delegated/native focus inside the shadow root.
 */
export const focusRingStyles = css`
  :host(:focus-visible),
  :host(:focus:not([disabled]):not(:focus-visible)) {
    outline: none;
  }

  :host(:focus-visible) {
    outline: 2px solid ${t('ring')};
    outline-offset: 2px;
  }
`;

/**
 * Visually hidden but available to assistive technology.
 */
export const srOnlyStyles = css`
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
`;

/**
 * Shared disabled treatment.
 */
export const disabledStyles = css`
  :host([disabled]) {
    pointer-events: none;
    opacity: 0.5;
  }
`;
