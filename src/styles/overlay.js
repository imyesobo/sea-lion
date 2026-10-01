import { css } from 'lit';
import { t } from '../tokens/tokens.js';

/**
 * Lion teleports overlay content (dialog, tooltip) into a global `.overlays` container and wraps it
 * in a native `<dialog data-overlay-outer-wrapper>`. Those nodes live outside every shadow root, so
 * they can only be styled from the document.
 *
 * `ensureOverlayStyles()` injects that (idempotent, dependency free) document stylesheet the first
 * time a sea-lion overlay component is used, so overlays look right without extra setup.
 */
const overlayStyles = css`
  dialog[data-overlay-outer-wrapper] {
    border: none;
    padding: 0;
    margin: 0;
    max-width: none;
    max-height: none;
    background: transparent;
    overflow: visible;
  }

  dialog[data-overlay-outer-wrapper]::backdrop {
    background: transparent;
  }

  .overlays__backdrop {
    position: fixed;
    inset: 0;
    background-color: oklch(0 0 0 / 0.5);
    opacity: 0;
    transition: opacity ${t('duration-normal')} ${t('easing')};
  }

  .overlays__backdrop--visible {
    opacity: 1;
  }

  @media (prefers-reduced-motion: reduce) {
    .overlays__backdrop {
      transition: none;
    }
  }
`;

const STYLE_ID = 'sea-lion-overlay-styles';

let injected = false;

/**
 * Injects the document level overlay styles exactly once.
 */
export function ensureOverlayStyles() {
  if (injected || typeof document === 'undefined' || document.getElementById(STYLE_ID)) {
    injected = true;
    return;
  }
  const styleEl = document.createElement('style');
  styleEl.id = STYLE_ID;
  styleEl.textContent = overlayStyles.cssText;
  document.head.appendChild(styleEl);
  injected = true;
}
