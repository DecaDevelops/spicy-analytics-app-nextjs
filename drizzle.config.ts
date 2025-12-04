import { defineConfig } from "drizzle-kit";
export default defineConfig({
  schema: "./src/_db/schema.ts",
  out: "./drizzle/migrations",
  dialect: "sqlite",
  dbCredentials: {
    url: "./src/_db/database.sqlite",
  },
});
