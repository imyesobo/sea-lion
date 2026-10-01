import { SeaSwitch } from './SeaSwitch.js';

// Note: `SeaSwitchButton` is registered automatically by lion's ScopedElementsMixin as the
// scoped `lion-switch-button` of this element. Registering the same constructor globally under a
// second tag name is not allowed by the CustomElementRegistry, so we only define the switch here.
customElements.define('sea-switch', SeaSwitch);
