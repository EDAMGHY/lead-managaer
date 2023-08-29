import axios from "axios";
import { ADD_LEAD, DELETE_LEAD, GET_LEADS } from "./types";
import { createMessage, returnErrors } from "./messages";

// GET_LEADS
export const getLeads = () => (dispatch) => {
  axios
    .get("/api/leads/")
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
export const deleteLead = (id) => (dispatch) => {
  axios
    .delete(`/api/leads/${id}/`)
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
export const addLead = (lead) => (dispatch) => {
  console.log("add lead");
  let data = JSON.stringify(lead);

  let options = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios
    .post(`/api/leads/`, data, options)
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
