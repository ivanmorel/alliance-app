import { RESET_APP_STATE } from "@constants";

export function resetAppState() {
  return {
    type: RESET_APP_STATE,
  };
}
