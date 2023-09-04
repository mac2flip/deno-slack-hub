/** This file was autogenerated on Mon Sep 04 2023. Follow the steps in src/schema/slack/functions/README.md to rebuild **/
import Calendly from "./calendly/mod.ts";
import Giphy from "./giphy/mod.ts";
import GithubCloud from "./github.cloud/mod.ts";
import Gitlab from "./gitlab/mod.ts";
import GoogleSheets from "./google.sheets/mod.ts";
import JiraCloud from "./jira.cloud/mod.ts";
import Pagerduty from "./pagerduty/mod.ts";
import Salesforce from "./salesforce/mod.ts";
import Zoom from "./zoom/mod.ts";

const Connectors = {
  Calendly,
  Giphy,
  GithubCloud,
  Gitlab,
  GoogleSheets,
  JiraCloud,
  Pagerduty,
  Salesforce,
  Zoom,
} as const;

export default Connectors;
