import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { codeInput } from "@sanity/code-input";
import { schemaTypes } from "./src/sanity/schemas";

export default defineConfig({
  name: "default",
  title: "Blog CMS",

  projectId: "i09efqmg",
  dataset: "production",

  plugins: [structureTool(), codeInput()],

  schema: {
    types: schemaTypes,
  },
});
