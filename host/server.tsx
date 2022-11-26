/** @jsx jsx */
/** @jsxFrag  Fragment */
import { serve, serveStatic } from "@honojs/node-server"; // Write above `Hono`
import { Hono } from "hono";
import { jsx } from "hono/jsx";
import { prettyJSON } from "hono/pretty-json";
import { logger } from "hono/logger";

const app = new Hono();

app.use("*", prettyJSON());
app.use("*", logger());

app.get("/dist/*", serveStatic({ root: "host" }));

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

serve({ port: 3000, fetch: app.fetch });
