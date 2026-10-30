import { html, render } from "lit";

/**
 * Shared helpers for the sea-lion stories.
 *
 * Keeping these here (rather than in `src/`) means they never ship in the published package.
 */

/**
 * Wraps a template in a live event log.
 *
 * Several sea-lion components inherit their events from lion, and a few of those events do **not**
 * bubble, so the listener has to sit on the component itself. Logging them next to the component
 * makes both the event name and the payload observable instead of merely documented.
 *
 * @param {import('lit').TemplateResult} template the story markup
 * @param {object} options
 * @param {string} options.selector element to observe, resolved inside the story root
 * @param {string[]} options.events event names to listen for
 * @param {(target: Element) => unknown} [options.readState] value shown alongside each event
 * @returns {Element} the story root
 */
export function withEventLog(template, { selector, events, readState }) {
  const root = document.createElement("div");
  render(
    html`${template}
      <pre class="sl-event-log"></pre>`,
    root,
  );

  const log = /** @type {HTMLPreElement} */ (
    root.querySelector(".sl-event-log")
  );
  const target = root.querySelector(selector);

  if (!target) {
    log.textContent = `Story error: no element matched "${selector}".`;
    return root;
  }

  let count = 0;
  events.forEach((eventName) => {
    target.addEventListener(eventName, () => {
      count += 1;
      const state = readState ? ` → ${JSON.stringify(readState(target))}` : "";
      log.textContent = `${String(count).padStart(2, "0")}  ${eventName}${state}\n${log.textContent}`;
    });
  });

  return root;
}

/**
 * Renders the `sea-lion` import that a story needs, for the generated code snippet.
 *
 * @param {string[]} tags tag names used by the story
 * @returns {string}
 */
export function importSnippet(tags) {
  return tags
    .map(
      (tag) => `import '@yesobo/sea-lion/src/components/${folderFor(tag)}/${tag}.js';`,
    )
    .join("\n");
}

/** @param {string} tag */
function folderFor(tag) {
  /** @type {Record<string, string>} */
  const folders = {
    "sea-checkbox": "checkbox-group",
    "sea-checkbox-group": "checkbox-group",
    "sea-radio": "radio-group",
    "sea-radio-group": "radio-group",
  };
  return folders[tag] ?? tag.replace(/^sea-/, "");
}
