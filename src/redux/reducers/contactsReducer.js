const initialState = {
  contacts: {
    contactList: [],
    newContact: {
      name: "",
      surname: "",
      email: "",
      address: "",
      phone: "",
    },
  },
};

export default function contactReducer(state = initialState.contacts, action) {
  switch (action.type) {
    /* Add contacts to the state array */
    case "ADD_CONTACT": {
      return {
        ...state,
        contactList: [...state.contactList, state.newContact],
      };
    }

    default:
      return state;
  }
}
