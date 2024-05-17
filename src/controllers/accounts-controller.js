import { JSDOM } from "jsdom";
import createDOMPurify from "dompurify";
import bcrypt from "bcrypt";
import { UserSpec, UserCredentialsSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

const { window } = new JSDOM("");
const DOMPurify = createDOMPurify(window);
const SALT_ROUNDS = 10;

export const accountsController = {
  index: {
    auth: false,
    handler: function (request, h) {
      return h.view("main", { title: "Welcome to Lango" });
    },
  },
  showSignup: {
    auth: false,
    handler: function (request, h) {
      return h.view("signup-view", { title: "Sign up for Lango" });
    },
  },
  signup: {
    auth: false,
    validate: {
      payload: UserSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        const sanitizedErrors = error.details.map(err => ({
          ...err,
          message: DOMPurify.sanitize(err.message)
        }));
        return h
          .view("signup-view", {
            title: "Sign up error",
            errors: sanitizedErrors,
          })
          .takeover()
          .code(400);
      },
    },
    handler: async function (request, h) {
      const { firstName, lastName, email, password } = request.payload;
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      const user = {
        firstName: DOMPurify.sanitize(firstName),
        lastName: DOMPurify.sanitize(lastName),
        email: DOMPurify.sanitize(email),
        password: hashedPassword
      };
      await db.userStore.addUser(user);
      return h.redirect("/");
    },
  },
  
  showLogin: {
    auth: false,
    handler: function (request, h) {
      return h.view("login-view", { title: "Login to Lango" });
    },
  },

  login: {
    auth: false,
    validate: {
      payload: UserCredentialsSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        const sanitizedErrors = error.details.map(err => ({
          ...err,
          message: DOMPurify.sanitize(err.message)
        }));
        return h.view("login-view", {
            title: "Log in error",
            errors: sanitizedErrors
        }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const { email, password } = request.payload;
      const user = await db.userStore.getUserByEmail(email);
      
      // Logging user data
      console.log("Retrieved user:", user);
      
      const isValid = user ? await bcrypt.compare(password, user.password) : false;
      
      // Logging bcrypt comparison result
      console.log("Password comparison result:", isValid);
      
      if (!user || !isValid) {
        return h.view("login-view", {
          title: "Log in error",
          errors: [{ message: "Invalid email or password" }]
        }).takeover().code(400);
      }
      request.cookieAuth.set({ id: user._id });
      return h.redirect("/dashboard");
    },
  },
  
  logout: {
    handler: function (request, h) {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },

  async validate(request, session) {
    const user = await db.userStore.getUserById(session.id);
    if (!user) {
      return { isValid: false };
    }
    return { isValid: true, credentials: user };
  },
};
