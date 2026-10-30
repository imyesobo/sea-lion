import { html } from "lit";
import { withEventLog } from "../../../.storybook/story-helpers.js";

/**
 * `<sea-dialog>` is `LionDialog`, which handles the genuinely hard parts of a modal: focus trap,
 * scroll locking, `Esc` to close, the backdrop and top-layer rendering.
 */
export default {
  title: "Overlays/Dialog",
  component: "sea-dialog",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "```js",
          "import '@yesobo/sea-lion/src/components/dialog/sea-dialog.js';",
          "```",
          "",
          "```html",
          "<sea-dialog>",
          '  <sea-button slot="invoker">Open dialog</sea-button>',
          '  <sea-dialog-content slot="content">',
          '    <div slot="header">',
          '      <h2 class="sl-dialog-title">Edit profile</h2>',
          '      <p class="sl-dialog-description">Click save when you are done.</p>',
          "    </div>",
          '    <sea-input label="Name"></sea-input>',
          '    <sea-button slot="footer">Save changes</sea-button>',
          "  </sea-dialog-content>",
          "</sea-dialog>",
          "```",
          "",
          "### Why `<sea-dialog-content>`?",
          "",
          "Lion teleports the content node out of your markup into a global overlay container, so it",
          "escapes the styles of `<sea-dialog>`. `<sea-dialog-content>` is a standalone element that",
          "carries the Shadcn dialog surface with it, which is why the two always appear together.",
          "",
          "### Opening and closing",
          "",
          "```js",
          "const dialog = document.querySelector('sea-dialog');",
          "",
          "dialog.opened = true; // or dialog.opened = false",
          "```",
          "",
          "### Events",
          "",
          "> **None of these bubble.** Listen on the `<sea-dialog>` element itself.",
          "",
          "`before-opened` and `before-closed` are **cancelable**, which makes them the right place",
          'for an "are you sure?" guard:',
          "",
          "```js",
          "dialog.addEventListener('before-closed', event => {",
          "  if (hasUnsavedChanges) event.preventDefault(); // keeps the dialog open",
          "});",
          "",
          "dialog.addEventListener('opened-changed', () => {",
          "  console.log(dialog.opened);",
          "});",
          "```",
          "",
          "`<sea-dialog-content>` renders a close button that fires `close-overlay`; lion listens for",
          "it and closes the dialog. Hide it with `no-close-button` and relabel it with `close-label`.",
        ].join("\n"),
      },
    },
  },
  render: () => html`
    <sea-dialog>
      <sea-button slot="invoker">Open dialog</sea-button>
      <sea-dialog-content slot="content">
        <div slot="header">
          <h2 class="sl-dialog-title">Edit profile</h2>
          <p class="sl-dialog-description">
            Make changes to your profile here. Click save when you're done.
          </p>
        </div>
        <sea-input label="Name"></sea-input>
        <sea-button slot="footer" variant="outline">Cancel</sea-button>
        <sea-button slot="footer">Save changes</sea-button>
      </sea-dialog-content>
    </sea-dialog>
  `,
};

export const Playground = {};

export const WithoutCloseButton = {
  name: "Without close button",
  parameters: {
    docs: {
      description: {
        story:
          "Use `no-close-button` when the dialog must be dismissed deliberately. `Esc` and the " +
          "backdrop still close it unless you cancel `before-closed`.",
      },
    },
  },
  render: () => html`
    <sea-dialog>
      <sea-button slot="invoker" variant="destructive"
        >Delete account</sea-button
      >
      <sea-dialog-content slot="content" no-close-button>
        <div slot="header">
          <h2 class="sl-dialog-title">Are you absolutely sure?</h2>
          <p class="sl-dialog-description">This action cannot be undone.</p>
        </div>
        <sea-button slot="footer" variant="outline">Cancel</sea-button>
        <sea-button slot="footer" variant="destructive">Delete</sea-button>
      </sea-dialog-content>
    </sea-dialog>
  `,
};

export const HandlingEvents = {
  name: "Handling events",
  parameters: {
    docs: {
      description: {
        story:
          "Open and close the dialog to see the order in which the overlay events fire.",
      },
    },
  },
  render: () =>
    withEventLog(
      html`<sea-dialog>
        <sea-button slot="invoker">Open dialog</sea-button>
        <sea-dialog-content slot="content">
          <div slot="header"><h2 class="sl-dialog-title">Hello</h2></div>
          Close me to see <code>before-closed</code>.
        </sea-dialog-content>
      </sea-dialog>`,
      {
        selector: "sea-dialog",
        events: ["before-opened", "opened-changed", "before-closed"],
        readState: (el) => ({ opened: el.opened }),
      },
    ),
};
