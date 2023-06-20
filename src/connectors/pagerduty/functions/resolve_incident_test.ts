/** This file was autogenerated. Follow the steps in src/schema/slack/functions/README.md to rebuild **/
import { assertEquals, assertExists } from "../../../dev_deps.ts";
import { DefineWorkflow } from "../../../dev_deps.ts";
import ResolveIncident from "./resolve_incident.ts";

Deno.test("ResolveIncident can be used as a Slack function in a workflow step", () => {
  const testWorkflow = DefineWorkflow({
    callback_id: "test_ResolveIncident_slack_function",
    title: "Test ResolveIncident",
    description: "This is a generated test to test ResolveIncident",
  });
  testWorkflow.addStep(ResolveIncident, {
    incident_id: "test",
    resolution_note: "test",
    pagerduty_access_token: "test",
  });
  const actual = testWorkflow.steps[0].export();

  assertEquals(actual.function_id, "A04RSGH23L7#/functions/resolve_incident");
  assertEquals(actual.inputs, {
    incident_id: "test",
    resolution_note: "test",
    pagerduty_access_token: "test",
  });
});

Deno.test("All outputs of Slack function ResolveIncident should exist", () => {
  const testWorkflow = DefineWorkflow({
    callback_id: "test_ResolveIncident_slack_function",
    title: "Test ResolveIncident",
    description: "This is a generated test to test ResolveIncident",
  });
  const step = testWorkflow.addStep(ResolveIncident, {
    incident_id: "test",
    resolution_note: "test",
    pagerduty_access_token: "test",
  });
  assertExists(step.outputs.incident_id);
  assertExists(step.outputs.incident_url);
  assertExists(step.outputs.incident_title);
  assertExists(step.outputs.status);
  assertExists(step.outputs.resolution_note);
  assertExists(step.outputs.last_status_change_by);
  assertExists(step.outputs.last_status_change_at);
});