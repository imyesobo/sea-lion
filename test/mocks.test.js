import { expect, fixture, html } from '@open-wc/testing';
import { registerMockRoutes, worker } from '@web/mocks/browser.js';
import { recordInteractions } from 'web-mocks-recorder/wtr.js';
import { http } from '@web/mocks/http.js';
import mocks from '../demo/mocks.js';
import '../src/components/button/sea-button.js';

recordInteractions(worker);

describe('@web/mocks', () => {
  beforeEach(() => {
    registerMockRoutes(mocks.success);
  });

  afterEach(() => {
    registerMockRoutes();
  });

  it('uses shared story mocks to supply component content', async () => {
    const response = await fetch('/api/greeting');
    expect(response.status).to.equal(200);
    const { message } = await response.json();
    const button = await fixture(html`<sea-button>${message}</sea-button>`);
    expect(button.textContent).to.equal('Hello from @web/mocks!');
  });

  it('replaces previous routes with an error scenario', async () => {
    registerMockRoutes(mocks.error);
    const response = await fetch('/api/greeting');
    expect(response.status).to.equal(503);
    expect(await response.json()).to.deep.equal({ message: 'Greeting unavailable' });
  });

  it('combines nested scenarios with test-specific routes', async () => {
    registerMockRoutes(
      [mocks.success],
      http.get('/api/users/:id', ({ params }) =>
        Response.json({ id: params.id }),
      ),
    );
    const greeting = await fetch('/api/greeting').then(response => response.json());
    const user = await fetch('/api/users/123').then(response => response.json());
    expect(greeting.message).to.equal('Hello from @web/mocks!');
    expect(user).to.deep.equal({ id: '123' });
  });

  it('clears handlers when no mocks are registered', () => {
    expect(worker.listHandlers()).to.have.length(1);
    registerMockRoutes();
    expect(worker.listHandlers()).to.have.length(0);
  });
});
