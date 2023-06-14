/** This file was autogenerated. Follow the steps in src/schema/slack/functions/README.md to rebuild **/
import { DefineConnector } from "../../../deps.ts";
import { Schema } from "../../../deps.ts";

export default DefineConnector({
  callback_id: "A04RSGH23L7#/functions/escalate_incident",
  title: "Change escalation level",
  description: "Change escalation level of a PagerDuty incident",
  input_parameters: {
    properties: {
      incident_id: {
        type: Schema.types.string,
        description: "Enter incident ID...",
        title: "Incident ID",
      },
      escalation_level: {
        type: Schema.types.string,
        description: "Ex: 2",
        title: "PagerDuty escalation level",
      },
      pagerduty_access_token: {
        type: Schema.slack.types.oauth2,
        description: "Pagerduty access token",
        title: "PagerDuty access token",
      },
    },
    required: ["incident_id", "escalation_level", "pagerduty_access_token"],
  },
  output_parameters: {
    properties: {
      incident_id: {
        type: Schema.types.string,
        description: "Incident id",
        title: "Incident ID",
      },
      incident_url: {
        type: Schema.types.string,
        description: "Incident url",
        title: "Incident URL",
      },
      incident_title: {
        type: Schema.types.string,
        description: "Incident title",
        title: "Incident title",
      },
      incident_details: {
        type: Schema.types.string,
        description: "Incident details",
        title: "Incident details",
      },
      assignments: {
        type: Schema.types.array,
        description: "Assignments",
        title: "Assignments",
        items: { type: undefined },
      },
      escalation_policy: {
        type: Schema.types.object,
        description: "Escalation Policy",
        title: "Escalation policy",
        properties: {
          id: { type: Schema.types.string, title: "Escalation policy ID" },
          summary: {
            type: Schema.types.string,
            title: "Escalation policy summary",
          },
          html_url: {
            type: Schema.types.string,
            title: "Escalation policy URL",
          },
        },
        additionalProperties: true,
        required: [],
      },
      service: {
        type: Schema.types.object,
        description: "Service",
        title: "Service",
        properties: {
          id: { type: Schema.types.string, title: "Service ID" },
          summary: { type: Schema.types.string, title: "Service summary" },
          html_url: { type: Schema.types.string, title: "Service URL" },
        },
        additionalProperties: true,
        required: [],
      },
      escalation_level: {
        type: Schema.types.string,
        description: "Escalation level",
        title: "Escalation level",
      },
    },
    required: [],
  },
});
