import axios from "axios";
import { ADD_LEAD, DELETE_LEAD, GET_LEADS } from "./types";
import { tokenConfig } from "./auth";
import { createMessage, returnErrors } from "./messages";

// GET_LEADS
export const getLeads = () => (dispatch, getState) => {
  axios
    .get("/api/leads/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_LEADS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// DELETE_LEAD
export const deleteLead = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/leads/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ deleteLead: "Lead Deleted..." }));
      dispatch({
        type: DELETE_LEAD,
        payload: id,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// ADD_LEAD
export const addLead = (lead) => (dispatch, getState) => {
  let data = JSON.stringify(lead);

  axios
    .post(`/api/leads/`, data, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ addLead: "Lead Added..." }));

      dispatch({
        type: ADD_LEAD,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
