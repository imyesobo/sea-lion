import { html } from "lit";

/** `<sea-card>` is a layout container with `header`, default and `footer` slots. */
export default {
  title: "Components/Card",
  component: "sea-card",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "```js",
          "import 'sea-lion/src/components/card/sea-card.js';",
          "```",
          "",
          "```html",
          "<sea-card>",
          '  <div slot="header">',
          '    <h3 class="sl-dialog-title">Create project</h3>',
          '    <p class="sl-dialog-description">Deploy your new project in one click.</p>',
          "  </div>",
          '  <sea-input label="Name"></sea-input>',
          '  <sea-button slot="footer" variant="outline">Cancel</sea-button>',
          '  <sea-button slot="footer">Deploy</sea-button>',
          "</sea-card>",
          "```",
          "",
          "The `sl-dialog-title` and `sl-dialog-description` classes style light-DOM headings",
          "consistently across cards and dialogs. They come from the global `tokens.css`.",
          "",
          "No events — compose it with whatever interactive components you need.",
        ].join("\n"),
      },
    },
  },
  render: () => html`
    <sea-card style="max-width: 24rem">
      <div slot="header">
        <h3 class="sl-dialog-title">Create project</h3>
        <p class="sl-dialog-description">
          Deploy your new project in one click.
        </p>
      </div>
      <sea-input label="Name"></sea-input>
      <sea-button slot="footer" variant="outline">Cancel</sea-button>
      <sea-button slot="footer">Deploy</sea-button>
    </sea-card>
  `,
};

export const Playground = {};

export const ContentOnly = {
  name: "Content only",
  parameters: {
    docs: { description: { story: "Header and footer are optional." } },
  },
  render: () => html`
    <sea-card style="max-width: 24rem">
      A card can hold nothing but content.
    </sea-card>
  `,
};
