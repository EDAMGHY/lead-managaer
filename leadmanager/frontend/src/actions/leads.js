import axios from "axios";
import { ADD_LEAD, DELETE_LEAD, GET_LEADS } from "./types";

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
    .catch((err) => console.log(err));
};

// DELETE_LEAD
export const deleteLead = (id) => (dispatch) => {
  axios
    .delete(`/api/leads/${id}/`)
    .then((res) => {
      dispatch({
        type: DELETE_LEAD,
        payload: id,
      });
    })
    .catch((err) => console.log(err));
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
      dispatch({
        type: ADD_LEAD,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
