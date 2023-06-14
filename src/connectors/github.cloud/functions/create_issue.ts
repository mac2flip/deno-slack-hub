/** This file was autogenerated. Follow the steps in src/schema/slack/functions/README.md to rebuild **/
import { DefineConnector } from "../../../deps.ts";
import { Schema } from "../../../deps.ts";

export default DefineConnector({
  callback_id: "A050QFW22F5#/functions/create_issue",
  title: "Create an issue",
  description: "Create a GitHub issue",
  input_parameters: {
    properties: {
      repository: {
        type: Schema.types.string,
        description: "Select a GitHub repository",
        title: "Select a repository",
      },
      title: {
        type: Schema.types.string,
        description: "Enter an issue title...",
        title: "Issue title",
      },
      description: {
        type: Schema.types.string,
        description: "Enter a description...",
        title: "Description",
      },
      github_access_token: {
        type: Schema.slack.types.oauth2,
        description: "GitHub Credential to use",
        title: "Github Access Token",
      },
    },
    required: ["repository", "title", "github_access_token"],
  },
  output_parameters: {
    properties: {
      issue_number: {
        type: Schema.types.string,
        description: "Issue number",
        title: "Issue number",
      },
      issue_url: {
        type: Schema.types.string,
        description: "Issue URL",
        title: "Issue URL",
      },
      title: {
        type: Schema.types.string,
        description: "Issue title",
        title: "Issue title",
      },
      body: {
        type: Schema.types.string,
        description: "Issue description",
        title: "Description",
      },
    },
    required: ["issue_number", "issue_url", "title", "body"],
  },
});
