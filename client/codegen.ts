import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: ["http://localhost:8080/graphql"],
  documents: ["src/**/*.tsx"],
  ignoreNoDocuments: true,
  generates: {
    "./src/gql/": {
      preset: "client",
    },
  },
};

export default config;
