import {
  OPPORTUNITY_BRANCH_JOIN_LINK,
  OPPORTUNITY_BRANCH_JOIN_LINK_RESET,
  OPPORTUNITY_CONTACT_CREATE,
  OPPORTUNITY_CONTACT_CREATE_FAIL,
  OPPORTUNITY_CONTACT_CREATE_RESET,
  OPPORTUNITY_CONTACT_CREATE_SUCCESS,
  OPPORTUNITY_CONTACT_EDIT,
  OPPORTUNITY_CONTACT_EDIT_FAIL,
  OPPORTUNITY_CONTACT_EDIT_RESET,
  OPPORTUNITY_CONTACT_EDIT_SUCCESS,
  OPPORTUNITY_CONVERT_LEAD,
  OPPORTUNITY_CONVERT_LEAD_FAIL,
  OPPORTUNITY_CONVERT_LEAD_RESET,
  OPPORTUNITY_CONVERT_LEAD_SUCCESS,
  OPPORTUNITY_CREATE,
  OPPORTUNITY_CREATE_FAIL,
  OPPORTUNITY_CREATE_FORM,
  OPPORTUNITY_CREATE_FORM_RESET,
  OPPORTUNITY_CREATE_RESET,
  OPPORTUNITY_CREATE_SUCCESS,
  OPPORTUNITY_CURRENT_RESET,
  OPPORTUNITY_DELETE,
  OPPORTUNITY_DELETE_FAIL,
  OPPORTUNITY_DELETE_SUCCESS,
  OPPORTUNITY_GET,
  OPPORTUNITY_GET_FAIL,
  OPPORTUNITY_GET_SUCCESS,
  OPPORTUNITY_INVITE_USER_FAIL,
  OPPORTUNITY_INVITE_USER_REQUEST,
  OPPORTUNITY_INVITE_USER_RESET,
  OPPORTUNITY_INVITE_USER_SUCCESS,
  OPPORTUNITY_LIST,
  OPPORTUNITY_LIST_FAIL,
  OPPORTUNITY_LIST_NEARBY,
  OPPORTUNITY_LIST_NEARBY_FAIL,
  OPPORTUNITY_LIST_NEARBY_SUCCESS,
  OPPORTUNITY_LIST_SUCCESS,
  OPPORTUNITY_SHARE_LINK,
  OPPORTUNITY_SHARE_LINK_FAIL,
  OPPORTUNITY_SHARE_LINK_RESET,
  OPPORTUNITY_SHARE_LINK_SUCCESS,
  OPPORTUNITY_UPDATE,
  OPPORTUNITY_UPDATE_FAIL,
  OPPORTUNITY_UPDATE_RESET,
  OPPORTUNITY_UPDATE_SUCCESS,
} from "@constants";

const OpportunityInitialState = {
  createForm: {
    name: "",
    notes: "",
    address: "",
  },
  createError: null,
  createLoading: false,
  createSuccess: false,
  updateError: null,
  updateLoading: false,
  updateSuccess: false,
  convertLeadError: null,
  convertLeadInfo: {},
  convertLeadLoading: false,
  convertLeadSuccess: false,
  contactCreateError: null,
  contactCreateLoading: false,
  contactCreateSuccess: false,
  contactEditError: null,
  contactEditLoading: false,
  contactEditSuccess: false,
  currentOpportunity: {},
  deleteSuccess: null,
  error: null,
  loading: false,
  inviteLoading: false,
  inviteSuccess: false,
  nearbyOpportunitys: [],
  opportunities: [],
};

const OpportunityReducer = (state = OpportunityInitialState, action) => {
  switch (action.type) {
    case OPPORTUNITY_GET:
      return {
        ...state,
        currentOpportunity: {},
        loading: true,
      };
    case OPPORTUNITY_GET_SUCCESS:
      return {
        ...state,
        currentOpportunity: action.payload,
        error: null,
        loading: false,
      };
    case OPPORTUNITY_GET_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case OPPORTUNITY_LIST_NEARBY:
      return {
        ...state,
        loading: true,
        nearbyOpportunitys: [],
      };

    case OPPORTUNITY_LIST_NEARBY_FAIL:
      return {
        ...state,
        loading: false,
      };

    case OPPORTUNITY_LIST_NEARBY_SUCCESS:
      return {
        ...state,
        loading: false,
        nearbyOpportunitys: action.payload.opportunitiesNearby,
      };

    case OPPORTUNITY_LIST:
      return {
        ...state,
        loading: true,
      };
    case OPPORTUNITY_LIST_SUCCESS:
      return {
        ...state,
        opportunities: action.payload,
        error: null,
        loading: false,
      };
    case OPPORTUNITY_LIST_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case OPPORTUNITY_CURRENT_RESET:
      return {
        ...state,
        loading: false,
        error: null,
        currentOpportunity: {},
      };

    case OPPORTUNITY_CREATE_FORM:
      return {
        ...state,
        createForm: { ...state.createForm, ...action.payload },
      };

    case OPPORTUNITY_CREATE_FORM_RESET:
      return {
        ...state,
        createForm: OpportunityInitialState.createForm,
      };

    case OPPORTUNITY_CREATE:
      return {
        ...state,
        createLoading: true,
        createSuccess: false,
        createError: null,
      };
    case OPPORTUNITY_CREATE_SUCCESS:
      return {
        ...state,
        createError: null,
        createSuccess: true,
        createLoading: false,
      };

    case OPPORTUNITY_CREATE_FAIL:
      return {
        ...state,
        createError: action.payload,
        createLoading: false,
      };
    case OPPORTUNITY_CREATE_RESET:
      return {
        ...state,
        createLoading: false,
        createSuccess: false,
        createError: null,
      };

    case OPPORTUNITY_CONVERT_LEAD:
      return {
        ...state,
        convertLeadLoading: true,
        convertLeadSuccess: false,
        convertLeadError: null,
        convertLeadInfo: {},
      };
    case OPPORTUNITY_CONVERT_LEAD_SUCCESS:
      return {
        ...state,
        convertLeadInfo: action.payload,
        convertLeadError: null,
        convertLeadSuccess: true,
        convertLeadLoading: false,
      };

    case OPPORTUNITY_CONVERT_LEAD_FAIL:
      return {
        ...state,
        convertLeadError: action.payload,
        convertLeadLoading: false,
        convertLeadInfo: {},
      };
    case OPPORTUNITY_CONVERT_LEAD_RESET:
      return {
        ...state,
        convertLeadLoading: false,
        convertLeadSuccess: false,
        convertLeadError: null,
        convertLeadInfo: {},
      };

    case OPPORTUNITY_UPDATE:
      return {
        ...state,
        updateLoading: true,
        updateSuccess: false,
        updateError: null,
      };
    case OPPORTUNITY_UPDATE_SUCCESS: {
      const opportunities = state.opportunities.map((opportunity) => {
        if (opportunity.id === action.payload.opportunityId) {
          return action.payload;
        }
        return opportunity;
      });

      return {
        ...state,
        opportunities,
        updateError: null,
        updateSuccess: true,
        updateLoading: false,
      };
    }

    case OPPORTUNITY_UPDATE_FAIL:
      return {
        ...state,
        updateError: action.payload,
        updateLoading: false,
      };
    case OPPORTUNITY_UPDATE_RESET:
      return {
        ...state,
        updateLoading: false,
        updateSuccess: false,
        updateError: null,
      };

    case OPPORTUNITY_DELETE_SUCCESS:
      return {
        ...state,
        deleteSuccess: true,
        deleteLoading: false,
        error: null,
      };
    case OPPORTUNITY_DELETE:
      return {
        ...state,
        deleteLoading: true,
        deleteSuccess: null,
        error: null,
      };
    case OPPORTUNITY_DELETE_FAIL:
      return {
        ...state,
        deleteSuccess: null,
        deleteLoading: false,
        error: action.payload,
      };

    case OPPORTUNITY_INVITE_USER_RESET:
      return {
        ...state,
        inviteSuccess: false,
      };

    case OPPORTUNITY_INVITE_USER_REQUEST: {
      return {
        ...state,
        error: null,
        inviteLoading: true,
        inviteSuccess: false,
      };
    }
    case OPPORTUNITY_INVITE_USER_FAIL: {
      return {
        ...state,
        error: action.payload,
        inviteLoading: false,
        inviteSuccess: false,
      };
    }
    case OPPORTUNITY_INVITE_USER_SUCCESS: {
      return {
        ...state,
        error: null,
        inviteLoading: false,
        inviteSuccess: true,
      };
    }

    case OPPORTUNITY_SHARE_LINK: {
      return {
        ...state,
        error: null,
        inviteLoading: true,
        inviteSuccess: false,
      };
    }
    case OPPORTUNITY_SHARE_LINK_FAIL: {
      return {
        ...state,
        error: action.payload,
        inviteLoading: false,
        inviteSuccess: false,
      };
    }
    case OPPORTUNITY_SHARE_LINK_SUCCESS: {
      return {
        ...state,
        error: null,
        inviteLoading: false,
        inviteSuccess: true,
      };
    }
    case OPPORTUNITY_SHARE_LINK_RESET:
      return {
        ...state,
        inviteSuccess: false,
      };
    case OPPORTUNITY_BRANCH_JOIN_LINK:
      return {
        ...state,
        opportunityInvite: action.payload,
      };
    case OPPORTUNITY_BRANCH_JOIN_LINK_RESET:
      return {
        ...state,
        opportunityInvite: null,
      };

    case OPPORTUNITY_CONTACT_CREATE:
      return {
        ...state,
        contactCreateLoading: true,
        contactCreateSuccess: false,
        contactCreateError: null,
      };
    case OPPORTUNITY_CONTACT_CREATE_SUCCESS:
      return {
        ...state,
        contactCreateError: null,
        contactCreateSuccess: true,
        contactCreateLoading: false,
      };
    case OPPORTUNITY_CONTACT_CREATE_FAIL:
      return {
        ...state,
        contactCreateError: action.payload,
        contactCreateLoading: false,
        contactCreateSuccess: false,
      };
    case OPPORTUNITY_CONTACT_CREATE_RESET:
      return {
        ...state,
        contactCreateLoading: false,
        contactCreateSuccess: false,
        contactCreateError: null,
      };

    case OPPORTUNITY_CONTACT_EDIT:
      return {
        ...state,
        contactEditLoading: true,
        contactEditSuccess: false,
        contactEditError: null,
      };
    case OPPORTUNITY_CONTACT_EDIT_SUCCESS:
      return {
        ...state,
        contactEditError: null,
        contactEditSuccess: true,
        contactEditLoading: false,
      };
    case OPPORTUNITY_CONTACT_EDIT_FAIL:
      return {
        ...state,
        contactEditError: action.payload,
        contactEditLoading: false,
      };
    case OPPORTUNITY_CONTACT_EDIT_RESET:
      return {
        ...state,
        contactEditLoading: false,
        contactEditSuccess: false,
        contactEditError: null,
      };

    default:
      return state;
  }
};

export default OpportunityReducer;
