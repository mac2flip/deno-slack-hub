/** This file was autogenerated. Follow the steps in src/schema/slack/functions/README.md to rebuild **/
import { assertEquals } from "../../../dev_deps.ts";
import { DefineWorkflow } from "../../../dev_deps.ts";
import DeleteSpreadsheetRow from "./delete_spreadsheet_row.ts";

Deno.test("DeleteSpreadsheetRow can be used as a Slack function in a workflow step", () => {
  const testWorkflow = DefineWorkflow({
    callback_id: "test_DeleteSpreadsheetRow_slack_function",
    title: "Test DeleteSpreadsheetRow",
    description: "This is a generated test to test DeleteSpreadsheetRow",
  });
  testWorkflow.addStep(DeleteSpreadsheetRow, {
    spreadsheet_id: "test",
    sheet: "test",
    column_name: "test",
    cell_value: "test",
    google_access_token: "test",
  });
  const actual = testWorkflow.steps[0].export();

  assertEquals(
    actual.function_id,
    "A04MG80N5CY#/functions/delete_spreadsheet_row",
  );
  assertEquals(actual.inputs, {
    spreadsheet_id: "test",
    sheet: "test",
    column_name: "test",
    cell_value: "test",
    google_access_token: "test",
  });
});