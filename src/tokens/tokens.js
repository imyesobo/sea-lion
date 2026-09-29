import { unsafeCSS } from 'lit';

/**
 * Design tokens of the default sea-lion theme.
 *
 * The values mirror the Shadcn UI "default" palette (OKLCH based). They exist in JS as well as
 * in `src/tokens/tokens.css`, because web components render in a shadow root: a component should
 * look correct even when the consumer never loads the global stylesheet. Every token is therefore
 * consumed as `var(--sl-<name>, <default>)`, which keeps theming (setting `--sl-*` on any
 * ancestor, including `:root`) fully working while providing a sane fallback.
 *
 * @type {Record<string, string>}
 */
export const defaultTokens = {
  // Surfaces
  background: 'oklch(1 0 0)',
  foreground: 'oklch(0.145 0 0)',
  card: 'oklch(1 0 0)',
  'card-foreground': 'oklch(0.145 0 0)',
  popover: 'oklch(1 0 0)',
  'popover-foreground': 'oklch(0.145 0 0)',

  // Intents
  primary: 'oklch(0.205 0 0)',
  'primary-foreground': 'oklch(0.985 0 0)',
  secondary: 'oklch(0.97 0 0)',
  'secondary-foreground': 'oklch(0.205 0 0)',
  muted: 'oklch(0.97 0 0)',
  'muted-foreground': 'oklch(0.556 0 0)',
  accent: 'oklch(0.97 0 0)',
  'accent-foreground': 'oklch(0.205 0 0)',
  destructive: 'oklch(0.577 0.245 27.325)',
  'destructive-foreground': 'oklch(0.985 0 0)',

  // Lines & focus
  border: 'oklch(0.922 0 0)',
  input: 'oklch(0.922 0 0)',
  ring: 'oklch(0.708 0 0)',

  // Radii
  radius: '0.625rem',
  'radius-sm': 'calc(var(--sl-radius, 0.625rem) - 4px)',
  'radius-md': 'calc(var(--sl-radius, 0.625rem) - 2px)',
  'radius-lg': 'var(--sl-radius, 0.625rem)',
  'radius-xl': 'calc(var(--sl-radius, 0.625rem) + 4px)',

  // Typography
  'font-sans': `ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`,
  'font-mono': `ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace`,
  'text-xs': '0.75rem',
  'text-sm': '0.875rem',
  'text-base': '1rem',
  'text-lg': '1.125rem',
  'leading-normal': '1.25rem',

  // Elevation
  'shadow-xs': '0 1px 2px 0 oklch(0 0 0 / 0.05)',
  'shadow-sm': '0 1px 3px 0 oklch(0 0 0 / 0.1), 0 1px 2px -1px oklch(0 0 0 / 0.1)',
  'shadow-md': '0 4px 6px -1px oklch(0 0 0 / 0.1), 0 2px 4px -2px oklch(0 0 0 / 0.1)',
  'shadow-lg': '0 10px 15px -3px oklch(0 0 0 / 0.1), 0 4px 6px -4px oklch(0 0 0 / 0.1)',

  // Motion
  'duration-fast': '150ms',
  'duration-normal': '200ms',
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
};

/**
 * Returns a themable `var(--sl-<name>, <fallback>)` reference for use inside `css` templates.
 *
 * @param {string} name token name without the `--sl-` prefix
 * @returns {import('lit').CSSResult}
 */
export function t(name) {
  const fallback = defaultTokens[name];
  if (fallback === undefined) {
    throw new Error(`[sea-lion] Unknown design token "${name}".`);
  }
  return unsafeCSS(`var(--sl-${name}, ${fallback})`);
}
