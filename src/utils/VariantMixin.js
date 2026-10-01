import { dedupeMixin } from '@open-wc/dedupe-mixin';

/**
 * @typedef {{ options: string[], default: string }} VariantDefinition
 * @typedef {Record<string, VariantDefinition>} VariantConfig
 */

/**
 * Declarative variants, the sea-lion equivalent of Shadcn's `class-variance-authority`.
 *
 * Instead of computing class names in JS, variants are reflected as attributes on the host
 * (`<sea-button variant="destructive" size="sm">`) so that all styling stays in plain CSS
 * (`:host([variant='destructive'])`) and remains overridable by consumers.
 *
 * A component declares its own options through the static `variantConfig` field:
 *
 * ```js
 * static variantConfig = {
 *   variant: { options: ['default', 'destructive'], default: 'default' },
 *   size: { options: ['sm', 'default'], default: 'default' },
 * };
 * ```
 *
 * Unknown values fall back to the default so a typo can never leave a component unstyled.
 *
 * @type {import('@open-wc/dedupe-mixin').DedupeMixinFunction}
 */
export const VariantMixin = dedupeMixin(
  superclass =>
    // eslint-disable-next-line no-shadow
    class VariantMixin extends superclass {
      static get properties() {
        return {
          ...super.properties,
          variant: { type: String, reflect: true },
          size: { type: String, reflect: true },
        };
      }

      /** @type {VariantConfig} */
      static variantConfig = {
        variant: { options: ['default'], default: 'default' },
        size: { options: ['default'], default: 'default' },
      };

      constructor() {
        super();
        const config = /** @type {typeof VariantMixin} */ (this.constructor).variantConfig;
        /** @type {string} */
        this.variant = config.variant.default;
        /** @type {string} */
        this.size = config.size.default;
      }

      /** @param {import('lit').PropertyValues} changedProperties */
      willUpdate(changedProperties) {
        const config = /** @type {typeof VariantMixin} */ (this.constructor).variantConfig;
        Object.keys(config).forEach(key => {
          if (!changedProperties.has(key)) {
            return;
          }
          const { options, default: fallback } = config[key];
          // @ts-ignore indexed access on a reactive property
          if (!options.includes(this[key])) {
            // @ts-ignore indexed access on a reactive property
            this[key] = fallback;
          }
        });
        super.willUpdate?.(changedProperties);
      }
    },
);
