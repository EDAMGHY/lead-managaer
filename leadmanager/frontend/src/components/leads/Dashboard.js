import React, { Fragment } from "react";
import Leads from "./Leads";
import Form from "./Form";

function Dashboard() {
  return (
    <Fragment>
      <Form />
      <Leads />
    </Fragment>
  );
}

export default Dashboard;
