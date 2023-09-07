/** This file was autogenerated. Follow the steps in src/schema/slack/functions/README.md to rebuild **/
import { DefineConnector } from "../../../deps.ts";
import { Schema } from "../../../deps.ts";

export default DefineConnector({
  callback_id: "A04MG80N5CY#/functions/update_spreadsheet_row",
  title: "Update a spreadsheet",
  description: "Update a row in a Google Sheets spreadsheet",
  input_parameters: {
    properties: {
      spreadsheet_id: {
        type: Schema.types.string,
        description: "Select a spreadsheet",
        title: "Spreadsheet",
      },
      sheet_title: {
        type: Schema.types.string,
        description: "Select a sheet",
        title: "Sheet",
      },
      column_name: {
        type: Schema.types.string,
        description: "Select a column",
        title: "Choose a column to search",
      },
      cell_value: {
        type: Schema.types.string,
        description: "Add a value",
        title: "Cell value to find",
      },
      updated_values: {
        type: Schema.types.object,
        description: "updated_values",
        title: "Updated Values",
      },
      google_access_token: {
        type: Schema.slack.types.oauth2,
        description: "Which account should we use to write to the spreadsheet?",
        title: "Google Access Token",
      },
    },
    required: [
      "spreadsheet_id",
      "sheet_title",
      "column_name",
      "cell_value",
      "updated_values",
      "google_access_token",
    ],
  },
  output_parameters: { properties: {}, required: [] },
});
