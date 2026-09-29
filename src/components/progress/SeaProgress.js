import { css, html } from 'lit';
import { LionProgressIndicator } from '@lion/ui/progress-indicator.js';
import { t } from '../../tokens/tokens.js';
import { baseStyles } from '../../styles/shared.js';

/**
 * `<sea-progress>` — Shadcn styled progress bar on top of `LionProgressIndicator`.
 *
 * Lion provides `role="progressbar"`, the aria-value* attributes and localized labels for the
 * indeterminate state; this class only provides the graphic.
 *
 * Omit `value` for the indeterminate variant.
 *
 * @attr {number} value
 * @attr {number} min
 * @attr {number} max
 * @customElement sea-progress
 */
export class SeaProgress extends LionProgressIndicator {
  static get styles() {
    return [
      ...(super.styles || []),
      baseStyles,
      css`
        :host {
          display: block;
          position: relative;
          width: 100%;
          height: 0.5rem;
          overflow: hidden;
          border-radius: 9999px;
          background-color: color-mix(in oklab, ${t('primary')} 20%, transparent);
        }

        .progress__indicator {
          height: 100%;
          width: 100%;
          border-radius: inherit;
          background-color: ${t('primary')};
          transform-origin: left center;
          transition: transform ${t('duration-normal')} ${t('easing')};
        }

        .progress__indicator--indeterminate {
          width: 40%;
          animation: sl-progress-slide 1.4s infinite ${t('easing')};
        }

        @keyframes sl-progress-slide {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(250%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .progress__indicator {
            transition: none;
          }
          .progress__indicator--indeterminate {
            animation: none;
            width: 100%;
          }
        }
      `,
    ];
  }

  /** @protected */
  _graphicTemplate() {
    if (this.indeterminate) {
      return html`
        <div class="progress__indicator progress__indicator--indeterminate" aria-hidden="true"></div>
      `;
    }
    const percentage = this._progressPercentage || 0;
    return html`
      <div
        class="progress__indicator"
        aria-hidden="true"
        style="transform: scaleX(${percentage / 100})"
      ></div>
    `;
  }
}
