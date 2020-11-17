import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import SupervisorialDistricts from "./SupervisoralDistrictDash/SupervisorialDistricts";
import CityTables from "../City Tables/CityTables";

import UnshelteredSubpopulationTrends from "../Unsheltered Trends/UnshelteredSubpopulationTrends";
import UnsheleteredSupervisoryDistricts from "../Unsheltered Supervisory District/UnshelteredSupervisoryDistricts";
// import LLMap from "./map/map";
import LLMap from "Map Dashboard/map";

import GeneralPieChart from "./charts/PieChart";
import GeneralTable from "../Unsheltered Sheltered General/GeneralTable";
import CityTable from "../Unsheltered Cities/CityTable";
import errorPage from "./404Page";

import UnsheleteredVsSheltered from "../Unsheltered vs Sheltered/UnshelteredVsSheltered";
import NewlyHomelessDashboard from "../NewlyHomelessDashboard/NewlyHomeless";
import { router } from "../components/Utilities/constants/routing";

import SeniorsDashboard from "SeniorsDashBoard/SeniorsDashBoard";

//import { aggregateFetchbyConstants } from './Utilities/ListManipulation/aggregateFetch';

export default class Content extends Component {
  constructor() {
    super();
    this.state = {
      rendered: true,
      Tables: [],
    };
  }

  async componentDidMount() {
    // var fetchedTables = await aggregateFetchbyConstants()
    // this.setState({
    //     Tables : fetchedTables,
    //     rendered : true,
    // })
  }

  render() {
    return (
      <div>
        {this.state.rendered ? (
          <div>
            <Switch>
              {/* Main Links */}
              <Route
                exact
                path="/"
                component={() => (
                  <GeneralTable router={router} Tables={this.state.Tables} />
                )}
              />

              <Route
                exact
                path="/GeneralTable"
                component={() => (
                  <GeneralTable router={router} Tables={this.state.Tables} />
                )}
              />
              <Route
                exact
                path="/UnshelteredVsSheltered"
                component={() => (
                  <UnsheleteredVsSheltered
                    router={router}
                    Tables={this.state.Tables}
                  />
                )}
              />
              <Route
                exact
                path="/NewlyHomeless"
                component={() => (
                  <NewlyHomelessDashboard
                    router={router}
                    Tables={this.state.Tables}
                  />
                )}
              />
              <Route
                exact
                path="/SeniorsDashBoard"
                component={() => (
                  <SeniorsDashboard
                    router={router}
                    Tables={this.state.Tables}
                  />
                )}
              />

              <Route
                exact
                path="/UnshelteredTrends"
                component={() => (
                  <UnshelteredSubpopulationTrends
                    router={router}
                    Tables={this.state.Tables}
                  />
                )}
              />
              {/* Supervisory Districts cannot be exact path because it has subpages*/}
              <Route
                path="/SupervisorialDistricts"
                component={() => (
                  <UnsheleteredSupervisoryDistricts
                    router={router}
                    Tables={this.state.Tables}
                  />
                )}
              />
              <Route
                exact
                path="/CityBreakdown"
                component={() => (
                  <CityTable router={router} Tables={this.state.Tables} />
                )}
              />
              <Route
                exact
                path="/CityTables"
                component={() => (
                  <CityTables router={router} Tables={this.state.Tables} />
                )}
              />
              <Route
                exact
                path="/Map"
                component={() => (
                  <LLMap router={router} Tables={this.state.Tables} />
                )}
              />

              <Route component={errorPage} />
            </Switch>
          </div>
        ) : (
          0
        )}
      </div>
    );
  }
}
