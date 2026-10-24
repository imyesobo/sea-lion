import { http } from "@web/mocks/http.js";

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
