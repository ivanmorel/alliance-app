import {
  GROUP_ADD,
  GROUP_ADD_FAIL,
  GROUP_ADD_SUCCESS,
  GROUP_BRANCH_JOIN_LINK,
  GROUP_BRANCH_RESET,
  GROUP_CREATE_FORM,
  GROUP_CREATE_FORM_RESET,
  GROUP_CREATE_PRIVATE,
  GROUP_CREATE_PRIVATE_FAIL,
  GROUP_CREATE_PRIVATE_SUCCESS,
  GROUP_DELETE_FAIL,
  GROUP_DELETE_REQUEST,
  GROUP_DELETE_RESET,
  GROUP_DELETE_SUCCESS,
  GROUP_EXPAND_NETWORK,
  GROUP_EXPAND_NETWORK_FAIL,
  GROUP_EXPAND_NETWORK_SUCCESS,
  GROUP_FETCH_INVITE_CODE_FAIL,
  GROUP_FETCH_INVITE_CODE_REQUEST,
  GROUP_FETCH_INVITE_CODE_RESET,
  GROUP_FETCH_INVITE_CODE_SUCCESS,
  GROUP_FETCH_USERS,
  GROUP_FETCH_USERS_SUCCESS,
  GROUP_INVITE_USER,
  GROUP_INVITE_USER_FAIL,
  GROUP_INVITE_USER_RESET,
  GROUP_INVITE_USER_SUCCESS,
  GROUP_LIST,
  GROUP_LIST_FAIL,
  GROUP_LIST_SUCCESS,
  GROUP_RESET_USERS,
  GROUP_SET_SELECTED_GROUP,
  GROUP_SHARE_INVITE_LINK,
  GROUP_SHARE_INVITE_LINK_FAIL,
  GROUP_SHARE_INVITE_LINK_OPEN_SHEET,
  GROUP_SHARE_INVITE_LINK_SUCCESS,
} from "@constants";

const GroupInitialState = {
  selectedGroupUsers: {},
  groups: [],
  group: null,
  groupNameExists: null,
  error: null,
  inviteLoading: false,
  sharingInvite: false,
  sharingInviteSheetOpened: false,
  loading: false,
  groupInvite: null,
  groupCode: null,
  selectedGroup: {},
  notificationSetting: {},
  groupCreateForm: {
    name: "",
    description: "",
    product: "",
    target: "",
  },
};

const GroupReducer = (state = GroupInitialState, action) => {
  switch (action.type) {
    case GROUP_EXPAND_NETWORK:
      return {
        ...state,
        loading: true,
      };

    case GROUP_EXPAND_NETWORK_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
      };

    case GROUP_EXPAND_NETWORK_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case GROUP_LIST:
      return {
        ...state,
        loading: true,
      };

    case GROUP_INVITE_USER_RESET:
      return {
        ...state,
        inviteSuccess: false,
      };

    case GROUP_INVITE_USER: {
      return {
        ...state,
        error: null,
        inviteLoading: true,
        inviteSuccess: false,
      };
    }
    case GROUP_INVITE_USER_FAIL: {
      return {
        ...state,
        error: action.payload,
        inviteLoading: false,
        inviteSuccess: false,
      };
    }
    case GROUP_INVITE_USER_SUCCESS: {
      return {
        ...state,
        error: null,
        inviteLoading: false,
        inviteSuccess: true,
      };
    }

    case GROUP_LIST_SUCCESS:
      if (action.paginated) {
        return {
          ...state,
          groups: [...state.groups, ...action.payload],
          error: null,
          loading: false,
        };
      }
      return {
        ...state,
        groups: action.payload,
        error: null,
        loading: false,
      };

    case GROUP_LIST_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case GROUP_CREATE_PRIVATE:
      return {
        ...state,
        loading: true,
      };

    case GROUP_CREATE_PRIVATE_SUCCESS:
      return {
        ...state,
        group: action.payload,
        error: null,
        loading: false,
      };

    case GROUP_CREATE_PRIVATE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case GROUP_CREATE_FORM:
      return {
        ...state,
        groupCreateForm: { ...state.groupCreateForm, ...action.payload },
      };

    case GROUP_CREATE_FORM_RESET:
      return {
        ...state,
        groupCreateForm: GroupInitialState.groupCreateForm,
      };

    case GROUP_ADD:
      return {
        ...state,
        loading: true,
      };

    case GROUP_ADD_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        inviteCode: null,
      };

    case GROUP_ADD_FAIL:
      return {
        ...state,
        inviteCode: null,
        error: action.payload,
        loading: false,
      };

    case GROUP_DELETE_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
        groupDeleted: false,
      };
    }

    case GROUP_DELETE_RESET: {
      return {
        ...state,
        loading: false,
        error: null,
        groupDeleted: false,
      };
    }

    case GROUP_DELETE_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        groupDeleted: true,
      };
    }

    case GROUP_DELETE_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload || "Error",
        groupDeleted: false,
      };
    }

    case GROUP_SHARE_INVITE_LINK: {
      return {
        ...state,
        sharingInvite: true,
        sharingInviteSheetOpened: false,
      };
    }

    case GROUP_SHARE_INVITE_LINK_SUCCESS: {
      return {
        ...state,
        sharingInvite: false,
        sharingInviteSheetOpened: false,
      };
    }

    case GROUP_SHARE_INVITE_LINK_FAIL: {
      return {
        ...state,
        sharingInvite: false,
      };
    }

    case GROUP_SHARE_INVITE_LINK_OPEN_SHEET: {
      return {
        ...state,
        sharingInviteSheetOpened: true,
      };
    }

    case GROUP_FETCH_USERS: {
      return {
        ...state,
        loading: true,
      };
    }
    case GROUP_FETCH_USERS_SUCCESS: {
      return {
        ...state,
        selectedGroupUsers: action.payload,
        loading: false,
      };
    }
    case GROUP_RESET_USERS: {
      return {
        ...state,
        selectedGroupUsers: [],
        loading: false,
      };
    }
    case GROUP_SET_SELECTED_GROUP:
      return {
        ...state,
        selectedGroup: action.payload,
      };
    case GROUP_FETCH_INVITE_CODE_REQUEST:
      return {
        ...state,
        inviteLoading: true,
        error: false,
      };
    case GROUP_FETCH_INVITE_CODE_SUCCESS:
      return {
        ...state,
        inviteLoading: false,
        error: false,
        inviteCode: action.payload,
      };
    case GROUP_FETCH_INVITE_CODE_RESET:
      return {
        ...state,
        inviteCode: null,
      };
    case GROUP_FETCH_INVITE_CODE_FAIL:
      return {
        ...state,
        inviteLoading: false,
        error: action.payload,
      };
    case GROUP_BRANCH_JOIN_LINK:
      return {
        ...state,
        groupInvite: action.payload,
      };
    case GROUP_BRANCH_RESET:
      return {
        ...state,
        groupInvite: null,
      };
    default:
      return state;
  }
};

export default GroupReducer;
