import { html } from "lit";
import { withEventLog } from "../../../.storybook/story-helpers.js";
import mocks from "../../../demo/mocks.js";

/**
 * `<sea-button>` is `LionButton` — which gives a real, form-participating, keyboard accessible
 * button — restyled with the Shadcn UI button recipe.
 */
export default {
  title: "Components/Button",
  component: "sea-button",
  tags: ["autodocs"],
  argTypes: {
    variant: {
      description: "Visual style of the button.",
      control: "select",
      options: [
        "default",
        "secondary",
        "destructive",
        "outline",
        "ghost",
        "link",
      ],
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "default" },
      },
    },
    size: {
      description:
        "Size of the button. Use `icon` for a square icon-only button.",
      control: "select",
      options: ["default", "sm", "lg", "icon"],
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "default" },
      },
    },
    disabled: {
      description: "Disables the button and blocks `click`.",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    label: { description: "Default slot content.", control: "text" },
  },
  args: {
    variant: "default",
    size: "default",
    disabled: false,
    label: "Button",
  },
  parameters: {
    docs: {
      description: {
        component: [
          "```js",
          "import 'sea-lion/src/components/button/sea-button.js';",
          "```",
          "",
          "```html",
          '<sea-button variant="destructive" size="sm">Delete</sea-button>',
          "```",
          "",
          "### Events",
          "",
          "| Event | Bubbles | Description |",
          "| --- | --- | --- |",
          "| `click` | yes | Standard DOM click. Not fired while `disabled`. |",
          "",
          "Because `click` bubbles you can delegate it from an ancestor, which is handy for toolbars:",
          "",
          "```js",
          "toolbar.addEventListener('click', event => {",
          "  const button = event.target.closest('sea-button');",
          "  if (button) console.log(button.textContent.trim());",
          "});",
          "```",
        ].join("\n"),
      },
    },
  },
  render: ({ variant, size, disabled, label }) =>
    html`<sea-button variant=${variant} size=${size} ?disabled=${disabled}
      >${label}</sea-button
    >`,
};

export const Playground = {};

export const Variants = {
  parameters: {
    docs: {
      description: {
        story:
          "The six Shadcn button recipes, mapped to the `variant` attribute.",
      },
    },
  },
  render: () => html`
    <div class="sl-story-row">
      <sea-button>Default</sea-button>
      <sea-button variant="secondary">Secondary</sea-button>
      <sea-button variant="destructive">Destructive</sea-button>
      <sea-button variant="outline">Outline</sea-button>
      <sea-button variant="ghost">Ghost</sea-button>
      <sea-button variant="link">Link</sea-button>
    </div>
  `,
};

export const Sizes = {
  parameters: {
    docs: {
      description: {
        story:
          'Use `size="icon"` for a square button and always give it an `aria-label`.',
      },
    },
  },
  render: () => html`
    <div class="sl-story-row">
      <sea-button size="sm">Small</sea-button>
      <sea-button>Default</sea-button>
      <sea-button size="lg">Large</sea-button>
      <sea-button size="icon" aria-label="Add">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </sea-button>
    </div>
  `,
};

export const Disabled = {
  parameters: {
    docs: {
      description: {
        story:
          "A disabled `<sea-button>` stays in the accessibility tree but does not fire `click`. " +
          "Click both buttons and compare the log.",
      },
    },
  },
  render: () =>
    withEventLog(
      html`<div class="sl-story-row">
        <sea-button id="enabled">Enabled</sea-button>
        <sea-button id="disabled" disabled>Disabled</sea-button>
      </div>`,
      {
        selector: ".sl-story-row",
        events: ["click"],
        readState: (row) =>
          row.ownerDocument.activeElement?.id || "click received",
      },
    ),
};

export const HandlingClicks = {
  name: "Handling clicks",
  parameters: {
    docs: {
      description: {
        story: [
          "Listen for `click` exactly as you would on a native `<button>`.",
          "",
          "```js",
          "document.querySelector('sea-button').addEventListener('click', event => {",
          "  console.log(event.target.textContent.trim());",
          "});",
          "```",
        ].join("\n"),
      },
    },
  },
  render: () =>
    withEventLog(html`<sea-button>Click me</sea-button>`, {
      selector: "sea-button",
      events: ["click"],
      readState: (button) => ({ label: button.textContent.trim() }),
    }),
};

export const MockedRequest = {
  parameters: {
    mocks: mocks.success,
    docs: {
      description: {
        story:
          "Click to fetch /api/greeting. The response is intercepted by @web/mocks; " +
          "no backend is needed. Any story can declare parameters.mocks.",
      },
    },
  },
  render: () => html`
    <div>
      <sea-button
        @click=${async (event) => {
          const button = event.currentTarget;
          const output = button.parentElement.querySelector('[role="status"]');
          button.disabled = true;
          output.textContent = "Loading...";
          try {
            const response = await fetch("/api/greeting");
            if (!response.ok) {
              throw new Error(`Request failed (${response.status})`);
            }
            const data = await response.json();
            output.textContent = data.message;
          } catch (error) {
            output.textContent = error.message;
          } finally {
            button.disabled = false;
          }
        }}
        >Load greeting</sea-button
      >
      <p role="status"></p>
    </div>
  `,
};

export const MockedRequestError = {
  ...MockedRequest,
  parameters: {
    mocks: mocks.error,
    docs: {
      description: {
        story: "The same request with a mocked HTTP 503 response.",
      },
    },
  },
};
