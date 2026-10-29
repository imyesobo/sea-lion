# sea-lion

**Shadcn UI, but as web components.** `sea-lion` is a component library that extends
[`ing-bank/lion`](https://github.com/ing-bank/lion) — a white-label, accessibility-first web
component library built on [Lit](https://lit.dev) — and dresses it in the
[Shadcn UI](https://ui.shadcn.com) styleguide.

> Shadcn UI is to Radix UI what sea-lion is to lion: lion brings the behaviour, accessibility and
> API; sea-lion brings the look.

Everything hard (focus traps, roving tabindex, ARIA wiring, form model/validation, overlay
positioning, i18n) stays in lion. sea-lion only adds design tokens, a variant API and CSS.

```html
<link rel="stylesheet" href="node_modules/sea-lion/src/tokens/tokens.css" />
<script type="module">
  import "sea-lion/define.js";
</script>

<sea-button variant="destructive">Delete account</sea-button>
<sea-input label="Email" help-text="We never share your address."></sea-input>
<sea-switch label="Airplane mode"></sea-switch>
```

## Install

```bash
npm install sea-lion
```

`lit` is a peer dependency; `@lion/ui` is a regular dependency.

## Usage

Three import styles, pick what fits:

```js
// 1. everything, registered as <sea-*> elements
import "sea-lion/define.js";

// 2. a single component (best for tree shaking)
import "sea-lion/src/components/button/sea-button.js";

// 3. classes only — register under your own tag names, or extend them further
import { SeaButton } from "sea-lion";
customElements.define("acme-button", class extends SeaButton {});
```

The global theme sheet is optional: every component carries the light theme as built-in fallback
values. Load `sea-lion/tokens.css` to enable page-level theming, dark mode and the light DOM
helper classes.

## Components

| Element                                                                      | lion base               | Notes                                                                                                           |
| ---------------------------------------------------------------------------- | ----------------------- | --------------------------------------------------------------------------------------------------------------- |
| `<sea-button>`                                                               | `LionButton`            | `variant`: default \| secondary \| destructive \| outline \| ghost \| link, `size`: sm \| default \| lg \| icon |
| `<sea-input>`                                                                | `LionInput`             | full lion form model, formatters and validators                                                                 |
| `<sea-textarea>`                                                             | `LionTextarea`          | auto-grow via `rows` / `max-rows`                                                                               |
| `<sea-select>`                                                               | `LionSelect`            | native `<select slot="input">` with a custom chevron                                                            |
| `<sea-checkbox>` / `<sea-checkbox-group>`                                    | `LionCheckbox(Group)`   | custom check graphic, native input kept for a11y                                                                |
| `<sea-radio>` / `<sea-radio-group>`                                          | `LionRadio(Group)`      | custom dot graphic                                                                                              |
| `<sea-switch>`                                                               | `LionSwitch`            | swaps lion's switch button for `SeaSwitchButton`                                                                |
| `<sea-tabs>`                                                                 | `LionTabs`              | `slot="tab"` + `slot="panel"` pairs                                                                             |
| `<sea-accordion>`                                                            | `LionAccordion`         | use `class="sl-accordion-trigger"` on the invoker button                                                        |
| `<sea-collapsible>`                                                          | `LionCollapsible`       |                                                                                                                 |
| `<sea-dialog>` + `<sea-dialog-content>`                                      | `LionDialog`            | focus trap, scroll lock, Esc, backdrop from lion                                                                |
| `<sea-tooltip>` + `<sea-tooltip-content>`                                    | `LionTooltip`           | popper positioning from lion                                                                                    |
| `<sea-progress>`                                                             | `LionProgressIndicator` | determinate and indeterminate                                                                                   |
| `<sea-card>`, `<sea-badge>`, `<sea-alert>`, `<sea-label>`, `<sea-separator>` | —                       | purely presentational, so plain `LitElement`s                                                                   |

### Why some components have a separate `*-content` element

Lion teleports overlay content to a global overlay container outside of the component, so styles
from the dialog/tooltip shadow root can no longer reach it. `<sea-dialog-content>` and
`<sea-tooltip-content>` are standalone elements that carry their own styles, which keeps the
surfaces looking right wherever lion moves them. Closing is done by dispatching lion's
`close-overlay` event (`content.close()`).

## Theming

Tokens follow the Shadcn palette (OKLCH) and are plain CSS custom properties prefixed with `--sl-`.
Because custom properties inherit into shadow DOM, overriding them anywhere above a component
re-skins it:

```css
:root {
  --sl-primary: oklch(0.55 0.22 264);
  --sl-primary-foreground: oklch(0.99 0 0);
  --sl-radius: 0.375rem;
}
```

Set the theme with a class (or `data-theme` attribute) on `<html>`, or on any ancestor:

| Value                                  | Behaviour                     |
| -------------------------------------- | ----------------------------- |
| `class="light"` / `data-theme="light"` | always light (the default)    |
| `class="dark"` / `data-theme="dark"`   | always dark                   |
| `class="theme-system"`                 | follow `prefers-color-scheme` |

An explicit `light`/`dark` always wins over `theme-system`, so you can start from the system
preference and still let users override it:

```js
const root = document.documentElement; // <html class="theme-system">
root.classList.toggle("dark", userWantsDark);
root.classList.toggle("light", !userWantsDark);
```

Scoped theming works too — put the variables on a wrapper element to theme only part of a page.

## Variants

Instead of composing class names like `class-variance-authority` does in Shadcn, sea-lion reflects
variants as attributes, so all styling stays in CSS and stays overridable:

```html
<sea-button variant="outline" size="sm">Cancel</sea-button>
```

`VariantMixin` declares the allowed values and falls back to the default for unknown ones:

```js
import { VariantMixin } from "sea-lion";

class AcmeChip extends VariantMixin(LitElement) {
  static variantConfig = {
    variant: { options: ["default", "brand"], default: "default" },
    size: { options: ["sm", "default"], default: "default" },
  };
}
```

## Extending sea-lion

The same way sea-lion extends lion, you extend sea-lion. Import the class, add styles, register it:

```js
import { css } from "lit";
import { SeaButton, t } from "sea-lion";

export class AcmeButton extends SeaButton {
  static get styles() {
    return [
      ...super.styles,
      css`
        :host([variant="default"]) {
          background-color: ${t("primary")};
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
      `,
    ];
  }
}

customElements.define("acme-button", AcmeButton);
```

Exported building blocks: `t()` and `defaultTokens` (tokens), `VariantMixin`, `baseStyles`,
`focusRingStyles`, `srOnlyStyles`, `disabledStyles`, `formControlStyles`, `textFieldStyles`,
`choiceFieldStyles`, `choiceGroupStyles` and `ensureOverlayStyles()`.

Lion components that sea-lion does not skin yet (combobox, select-rich, input-datepicker,
input-tel, pagination, steps, …) can be added with the exact same recipe: extend the lion class,
append token-based styles, export a `sea-*.js` definition file.

## Light DOM helpers

A few Shadcn parts are authored by the consumer outside of any shadow root and therefore cannot be
styled by a component. `tokens.css` ships classes for them:

- `.sl-accordion-trigger` — the `<button>` inside an accordion invoker heading (includes the chevron)
- `.sl-dialog-title` / `.sl-dialog-description` — dialog and card header typography

## Documentation

Every component has a Storybook page with a live playground, usage snippets and — where the
component emits something — an interactive event log.

```bash
npm run storybook        # http://localhost:6006
npm run build-storybook  # static build in storybook-static/
```

Both scripts regenerate `custom-elements.json` first (`npm run analyze`), so the attribute, slot and
event tables are derived from the source JSDoc and cannot drift from the implementation.

### Mocking network requests

Stories that talk to a backend never need one: `@web/mocks` (MSW under the hood) intercepts `fetch`
in the browser, `@web/storybook-addon-mocks` connects it to Storybook, and `web-mocks-recorder`
turns the recorded interactions into an OpenAPI spec.

Scenarios are plain `@web/mocks` handlers, kept in one place in `demo/mocks.js`:

```js
// demo/mocks.js
import { http } from "@web/mocks/http.js";

export default {
  success: [http.get("/api/greeting", () => Response.json({ message: "Hello from @web/mocks!" }))],
  error: [http.get("/api/greeting", () => Response.json({}, { status: 503 }))],
};
```

```js
// src/components/button/button.stories.js
import mocks from "../../../demo/mocks.js";

export const MockedRequest = {
  parameters: { mocks: mocks.success }, // any @web/mocks handler works here
  render: () => html`…click to fetch("/api/greeting")…`,
};
```

The `Mocks` panel in Storybook lists the handlers of the current story and lets you edit them live.

Recording is part of the dev server (`.storybook/main.js` → `web-mocks-recorder/storybook`), so
browsing the mocked stories writes `.interactions/storybook/<stories file>.<api>.openapi.json` — add
`har: true` to the addon options for the raw HAR as well, or `enabled: false` / `WEB_MOCKS_RECORDER=0`
to switch it off. `@web/storybook-addon-mocks` serves the MSW service worker at `/__msw_sw__.js` in
dev and copies it into `storybook-static/` on build, so mocks also work in the static build.

### Events at a glance

| Element                                                                                        | Events                                                                                                                   | Read state from       |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | --------------------- |
| `<sea-button>`                                                                                 | `click`                                                                                                                  | —                     |
| `<sea-input>`, `<sea-textarea>`, `<sea-select>`                                                | `model-value-changed`, `user-input-changed`, `focused-changed`, `touched-changed`, `dirty-changed`, `validate-performed` | `.modelValue`         |
| `<sea-checkbox>`, `<sea-radio>`, `<sea-switch>`                                                | `model-value-changed`                                                                                                    | `.checked`            |
| `<sea-checkbox-group>`                                                                         | `model-value-changed`                                                                                                    | `.modelValue` (array) |
| `<sea-radio-group>`                                                                            | `model-value-changed`                                                                                                    | `.modelValue`         |
| `<sea-tabs>`                                                                                   | `selected-changed` †                                                                                                     | `.selectedIndex`      |
| `<sea-accordion>`                                                                              | `expanded-changed`, `focused-changed` †                                                                                  | `.expanded` (array)   |
| `<sea-collapsible>`                                                                            | `opened-changed` †                                                                                                       | `.opened`             |
| `<sea-dialog>`, `<sea-tooltip>`                                                                | `before-opened`, `opened-changed`, `before-closed` (dialog) †                                                            | `.opened`             |
| `<sea-card>`, `<sea-badge>`, `<sea-alert>`, `<sea-label>`, `<sea-separator>`, `<sea-progress>` | —                                                                                                                        | —                     |

† These events do **not** bubble — attach the listener to the element itself. Form control events
do bubble, so a form can listen once at the top. `before-opened` and `before-closed` are cancelable.

## Development

```bash
npm install
npm start           # dev server with the demo page at demo/index.html
npm run storybook   # component documentation
npm test            # web-test-runner (headless Chrome)
```

## Credits

- [ing-bank/lion](https://github.com/ing-bank/lion) — behaviour, accessibility and APIs (MIT)
- [Shadcn UI](https://ui.shadcn.com) — the design language this library reproduces (MIT)

## License

MIT
