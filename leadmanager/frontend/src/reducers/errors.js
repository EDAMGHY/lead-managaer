import { GET_ERRORS } from "../actions/types";

const initialState = {
  status: null,
  msg: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        msg: action.payload.msg,
        status: action.payload.status,
      };

    default:
      return state;
  }
}
