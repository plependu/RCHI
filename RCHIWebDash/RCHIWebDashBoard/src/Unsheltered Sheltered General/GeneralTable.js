import React, { Component } from "react";
import Dashboard from "../components/TestingBranch/GeneralDashboard";

export default class GeneralTable extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Dashboard />
      </div>
    );
  }
}
