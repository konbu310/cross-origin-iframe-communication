/** @jsx jsx */
/** @jsxFrag  Fragment */
import { serve, serveStatic } from "@honojs/node-server"; // Write above `Hono`
import { Hono } from "hono";
import { jsx } from "hono/jsx";
import { prettyJSON } from "hono/pretty-json";
import { logger } from "hono/logger";
import { validator } from "hono/validator";
import { cors } from "hono/cors";

const app = new Hono();

app.use("*", prettyJSON());
app.use("*", logger());

app.use(
  "*",
  cors({
    origin: "http://localhost:3000",
  })
);

app.get("/dist/*", serveStatic({ root: "iframe" }));

app.get("/health_check", (c) => {
  return c.text("OK");
});

app.post(
  "/hello",
  validator((v) => ({
    name: v.json("name"),
  })),
  async (c) => {
    const { name } = c.req.valid();
    return c.text(`Hello, ${name}!`);
  }
);

app.get("/", (c) => {
  return c.html(
    <html>
      <body>
        <div id="root"></div>
        <script src="/dist/client.js"></script>
      </body>
    </html>
  );
});

serve({ port: 4000, fetch: app.fetch });
