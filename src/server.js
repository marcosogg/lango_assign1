import Vision from "@hapi/vision";
import Hapi from "@hapi/hapi";
import Cookie from "@hapi/cookie";
import Inert from "@hapi/inert";
import dotenv from "dotenv";
import path from "path";
import Joi from "joi";
import { fileURLToPath } from "url";
import Handlebars from "handlebars";
import { apiRoutes } from "./api-routes.js";
import { webRoutes } from "./web-routes.js";
import { db } from "./models/db.js";
import { accountsController } from "./controllers/accounts-controller.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const result = dotenv.config();
if (result.error) {
  console.log(result.error.message);
  // process.exit(1);
}

// Debug logging to check environment variables
console.log('Environment Variables:');
console.log('COOKIE_PASSWORD:', process.env.cookie_password);

async function init() {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
  });

  await server.register(Inert);
  await server.register(Vision);
  await server.register(Cookie);
  
  server.validator(Joi);

  server.views({
    engines: {
      hbs: Handlebars,
    },
    relativeTo: __dirname,
    path: "./views",
    layoutPath: "./views/layouts",
    partialsPath: "./views/partials",
    layout: true,
    isCached: false,
  });

  server.auth.strategy("session", "cookie", {
    cookie: {
      name: process.env.cookie_name,
      password: process.env.cookie_password,
      isSecure: false,
    },
    redirectTo: "/",
    validate: accountsController.validate,
  });
  server.auth.default("session");

  db.init("mongo");
  
  // Register routes
  server.route(webRoutes);
  server.route(apiRoutes);

  await server.start();
  console.log("Server running on %s", server.info.uri);
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
