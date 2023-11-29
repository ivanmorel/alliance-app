import {
  LEAD_CLEAR,
  LEAD_CREATE,
  LEAD_CREATE_FAIL,
  LEAD_CREATE_RESET,
  LEAD_CREATE_SUCCESS,
  LEAD_DELETE,
  LEAD_DELETE_FAIL,
  LEAD_DELETE_SUCCESS,
  LEAD_GET,
  LEAD_GET_FAIL,
  LEAD_GET_SUCCESS,
  LEAD_LIST,
  LEAD_LIST_FAIL,
  LEAD_LIST_NEARBY,
  LEAD_LIST_NEARBY_FAIL,
  LEAD_LIST_NEARBY_SUCCESS,
  LEAD_LIST_NEW,
  LEAD_LIST_NEW_FAIL,
  LEAD_LIST_NEW_SUCCESS,
  LEAD_LIST_SUCCESS,
  RESET_DELETE_LEAD,
} from "@constants";

const LeadInitialState = {
  leads: [],
  currentLead: {},
  error: null,
  createLoading: false,
  createSuccess: false,
  createError: null,
  loading: false,
  currentGroupId: null,
  newLeads: [],
  nearbyLeads: [],
  deleteSuccess: null,
};

const LeadReducer = (state = LeadInitialState, action) => {
  switch (action.type) {
    case LEAD_GET:
      return {
        ...state,
        currentLead: {},
        loading: true,
      };

    case LEAD_GET_SUCCESS:
      return {
        ...state,
        currentLead: action.payload,
        error: null,
        loading: false,
      };

    case LEAD_GET_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case LEAD_LIST_NEARBY_FAIL: {
      return {
        ...state,
        loading: false,
      };
    }
    case LEAD_LIST_NEARBY_SUCCESS: {
      return {
        ...state,
        loading: false,
        nearbyLeads: action.payload.leadsNearby,
      };
    }
    case LEAD_LIST_NEARBY: {
      return {
        ...state,
        loading: true,
      };
    }

    case LEAD_LIST:
      return {
        ...state,
        loading: true,
      };

    case LEAD_LIST_SUCCESS: {
      let leads;
      if (state.currentGroupId === action.payload.groupId && action.paginated) {
        leads = [...state.leads, ...action.payload.leads];
      } else {
        leads = action.payload.leads;
      }

      return {
        ...state,
        leads,
        error: null,
        currentGroupId: action.payload.groupId,
        loading: false,
      };
    }

    case LEAD_CLEAR:
      return {
        ...state,
        loading: false,
        error: null,
        currentLead: {},
      };

    case LEAD_LIST_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case LEAD_CREATE:
      return {
        ...state,
        createLoading: true,
        createSuccess: false,
        createError: null,
      };

    case LEAD_CREATE_SUCCESS:
      return {
        ...state,
        leads: [...state.leads, action.payload],
        createError: null,
        createSuccess: true,
        createLoading: false,
      };

    case LEAD_CREATE_FAIL:
      return {
        ...state,
        createError: action.payload,
        createLoading: false,
      };

    case LEAD_CREATE_RESET:
      return {
        ...state,
        createLoading: false,
        createSuccess: false,
        createError: null,
      };

    case LEAD_LIST_NEW:
      return {
        ...state,
        loading: false,
      };

    case LEAD_LIST_NEW_SUCCESS:
      return {
        ...state,
        newLeads: action.payload,
        error: null,
        loading: false,
      };

    case LEAD_LIST_NEW_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case LEAD_DELETE_SUCCESS:
      return {
        ...state,
        deleteSuccess: true,
        deleteLoading: false,
        error: null,
      };

    case LEAD_DELETE:
      return {
        ...state,
        deleteLoading: true,
        deleteSuccess: null,
        error: null,
      };

    case LEAD_DELETE_FAIL:
      return {
        ...state,
        deleteSuccess: null,
        deleteLoading: false,
        error: action.payload,
      };

    case RESET_DELETE_LEAD:
      return {
        ...state,
        deleteSuccess: null,
        deleteLoading: false,
        error: null,
      };

    default:
      return state;
  }
};

export default LeadReducer;
