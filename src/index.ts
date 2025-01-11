import { Elysia } from "elysia";

import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { APIRoute } from "./routers";

const port = process.env.PORT || 4000;

const app = new Elysia()
  .use(
    cors({
      allowedHeaders: ["*"],
      origin: ["*"],
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    })
  )
  .use(
    swagger({
      documentation: {
        info: {
          title: "Elysia Documentation",
          version: "1.0.0",
          license: {
            name: "MIT",
            url: "https://opensource.org/license/mit/",
          },
          contact: {
            name: "Chau Chan Bang",
            url: "https://www.facebook.com/profile.php?id=100083708621101",
          },
        },
      },
      autoDarkMode: true,
      path: "/api/swagger",
    })
  )
  .use(APIRoute)
  .listen(port);

console.log(`🦊 Elysia is running at ${app.server?.url}`);
