import { combineReducers } from "redux";

import Activity from "./Activity";
import Business from "./Business";
import Chat from "./Chat";
import CRM from "./CRM";
import Feedback from "./Feedback";
import Group from "./Group";
import Lead from "./Lead";
import Modal from "./Modal";
import Notification from "./Notification";
import Opportunity from "./Opportunity";
import OTAUpdates from "./OTAUpdates";
import Product from "./Product";
import Rating from "./Rating";
import Snackbar from "./Snackbar";
import User from "./User";

export default combineReducers({
  activity: Activity,
  business: Business,
  chat: Chat,
  crm: CRM,
  feedback: Feedback,
  group: Group,
  lead: Lead,
  modal: Modal,
  notification: Notification,
  opportunity: Opportunity,
  otaUpdates: OTAUpdates,
  product: Product,
  rating: Rating,
  snackbar: Snackbar,
  user: User,
});
