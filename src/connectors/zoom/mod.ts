/** This file was autogenerated. Follow the steps in src/schema/slack/functions/README.md to rebuild **/
import CreateMeeting from "./functions/create_meeting.ts";

// type CreateMeetingInputs = {
//   topic: string;
//   agenda: string;
//   invitees: string[];
//   zoom_access_token: {
//     credential_source: "DEVELOPER" | "END_USER";
//   };
// };
/**
 * @typedef {{topic: string;agenda: string;invitees: string[];zoom_access_token: {credential_source: "DEVELOPER" | "END_USER";};}} CreateMeetingInput
 */
const Zoom = {
  functions: {
    /**
     * @param {string} topic
     * @param {string} agenda
     * @param {string[]} invitees
     * @param {{credential_source: "DEVELOPER" | "END_USER"}} zoom_access_token
     */
    CreateMeeting,
  },
} as const;

export default Zoom;
