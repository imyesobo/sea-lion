import { html } from "lit";

/** `<sea-progress>` is `LionProgressIndicator` with the Shadcn bar. */
export default {
  title: "Components/Progress",
  component: "sea-progress",
  tags: ["autodocs"],
  argTypes: {
    value: {
      description:
        "Current value. **Omit it entirely for the indeterminate bar.**",
      control: { type: "range", min: 0, max: 100, step: 1 },
    },
    min: {
      description: "Lower bound.",
      control: "number",
      table: { defaultValue: { summary: "0" } },
    },
    max: {
      description: "Upper bound.",
      control: "number",
      table: { defaultValue: { summary: "100" } },
    },
  },
  args: { value: 60, min: 0, max: 100 },
  parameters: {
    docs: {
      description: {
        component: [
          "```js",
          "import '@yesobo/sea-lion/src/components/progress/sea-progress.js';",
          "```",
          "",
          "```html",
          '<sea-progress value="60"></sea-progress>',
          "<sea-progress></sea-progress> <!-- indeterminate -->",
          "```",
          "",
          'Lion supplies `role="progressbar"` and keeps `aria-valuenow` / `aria-valuemin` /',
          "`aria-valuemax` in sync, so updating `.value` is all you need:",
          "",
          "```js",
          "const progress = document.querySelector('sea-progress');",
          "progress.value = 75;",
          "```",
          "",
          "No events — progress is driven by your code, so react to whatever is producing it",
          "(a `fetch`, an upload, a timer) rather than to the component.",
        ].join("\n"),
      },
    },
  },
  render: ({ value, min, max }) =>
    html`<sea-progress value=${value} min=${min} max=${max}></sea-progress>`,
};

export const Playground = {};

export const Indeterminate = {
  parameters: {
    docs: {
      description: {
        story:
          "Omit `value` when the duration is unknown. Lion announces it as indeterminate.",
      },
    },
  },
  render: () => html`<sea-progress></sea-progress>`,
};

export const Steps = {
  render: () => html`
    <div class="sl-story-stack" style="max-width: 32rem">
      <sea-progress value="0"></sea-progress>
      <sea-progress value="33"></sea-progress>
      <sea-progress value="66"></sea-progress>
      <sea-progress value="100"></sea-progress>
    </div>
  `,
};
