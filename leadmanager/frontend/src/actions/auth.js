import axios from "axios";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "../actions/types";

import { returnErrors } from "./messages";

// CHECK TOKEN AND LOAD USER
export const loadUser = () => async (dispatch, getState) => {
  // user Loading
  dispatch({
    type: USER_LOADING,
  });

  try {
    const res = await axios.get("/api/auth/me", tokenConfig(getState));

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({ type: AUTH_ERROR });
  }
};
// LOGIN USER
export const login = (username, password) => async (dispatch) => {
  //   get token from state

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const body = JSON.stringify({ username, password });

    const res = await axios.post("/api/auth/login", body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({ type: LOGIN_FAIL });
  }
};
// REGISTER USER
export const register =
  ({ username, email, password }) =>
  async (dispatch) => {
    //   get token from state

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const body = JSON.stringify({ username, email, password });

      const res = await axios.post("/api/auth/register", body, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: REGISTER_FAIL });
    }
  };

// LOGOUT USER
export const logout = () => async (dispatch, getState) => {
  //   get token from state
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  // token added to header
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  try {
    await axios.post("/api/auth/logout", null, tokenConfig(getState));

    dispatch({
      type: LOGOUT_SUCCESS,
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

// setup config wuth token
export const tokenConfig = (getState) => {
  //   get token from state
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  // token added to header
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};
