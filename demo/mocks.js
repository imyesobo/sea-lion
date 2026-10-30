import { http } from "@web/mocks/http.js";

/**
 * Reusable `@web/mocks` scenarios.
 *
 * Handlers return native `Response` objects, so the same scenarios can be reused anywhere:
 * in Storybook through `parameters.mocks`, in Web Test Runner through `registerMockRoutes`.
 */
export default {
  success: [
    http.get("/api/greeting", () =>
      Response.json({ message: "Hello from @web/mocks!" }),
    ),
  ],
  error: [
    http.get("/api/greeting", () =>
      Response.json({ message: "Greeting unavailable" }, { status: 503 }),
    ),
  ],
};
