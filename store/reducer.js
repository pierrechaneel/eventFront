import {actions} from "./actions";

const reducer = (state, action, payload) => {
  switch (action.type) {
    case actions.SWITCH_THEME:
      return {};
    case actions.SWITCH_LANGUAGE: {
      return {};
    }
    case actions.SET_USER_METADATA: {
      return {};
    }

    case actions.GET_USER_METADATA:
      return {};
    default:
      return state;
  }
};

export { reducer}