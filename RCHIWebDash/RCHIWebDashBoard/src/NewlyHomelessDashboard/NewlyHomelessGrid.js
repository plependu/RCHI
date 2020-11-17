import React, { Component } from "react";
import { aggregateFetch } from "../components/Utilities/ListManipulation/aggregateFetch";

import "../components/css/dash.css";
import TableComponent4 from "../components/charts/TableComponent4";
import PieChart2 from "../components/charts/PieChart2";
import BarGraph from "../components/TestingBranch/BarGraph";
import BarChart from "../components/reformatedCharts/BarChart";
import PieChart from "../components/reformatedCharts/PieChart";
import { Header, Segment, Grid, Container } from "semantic-ui-react";
import { filterList } from "../components/Utilities/ListManipulation/filter";
import { changeVals2020 } from "../components/Utilities/ListManipulation/changeValue";
import { pieDataManiTotal } from "../components/Utilities/ChartDataManipulation/pieDataManipulation";
import { router } from "../components/Utilities/constants/routing";
import {
  newlyHomelessStyling,
  ContainerWidth,
} from "../components/Utilities/styling/chartTablesStyling";

import Total from "../components/Numbers/Total";
import PercentageDistrict from "../components/Numbers/PercentageDistrict";

import { FILTER_COLUMNS } from "constants/NewlyHomelessGrid";

export default class NewlyHomelessGrid extends Component {
  constructor() {
    super();
    this.state = {
      urls: [
        router.host +
          "/" +
          router.root +
          "/" +
          router.activeYear +
          "/NewlyHomelessByCity/",
      ],
      rendered: false,
      Tables: [],
    };
  }

  async componentDidMount() {
    var Tables = await aggregateFetch(this.state.urls);

    this.setState({
      Tables: Tables,
      rendered: true,
    });
  }

  dashboard() {
    return (
      <Container style={{ width: ContainerWidth }}>
        <Segment>
          <Header as="h1" textAlign="center">
            Unsheltered - Newly Homeless
            <h3>
              <b>Interview Only</b>
            </h3>
            <h6>
              <i>First time homeless within 12 months</i>
            </h6>
            <Header sub> 2020 Riverside County Pit Count</Header>
          </Header>
        </Segment>

        <Grid stackable>
          <Grid.Row verticalAlign="middle" stretched columns={3} divided>
            <Grid.Column>
              {/* <Segment> */}
              <TableComponent4
                data={changeVals2020(
                  filterList(
                    this.state.Tables[
                      router.activeYear + "/NewlyHomelessByCity"
                    ]["Age"],
                    "subpopulation",
                    FILTER_COLUMNS
                  )
                ).sort((a, b) => {
                  return b.total - a.total;
                })}
                {...newlyHomelessStyling["Age"]}
                percentage_flag={1}
              />
              <TableComponent4
                data={filterList(
                  this.state.Tables[router.activeYear + "/NewlyHomelessByCity"][
                    "Living Situation"
                  ],
                  "subpopulation",
                  FILTER_COLUMNS
                ).sort((a, b) => {
                  return b.total - a.total;
                })}
                {...newlyHomelessStyling["Living Situation"]}
              />
              {/* </Segment> */}
            </Grid.Column>
            <Grid.Column>
              <div className="sub-tots">
                <div className="sub-tots-c1r1">
                  <span className="component-header">Total Unsheltered</span>
                </div>
                <div className="sub-tots-c1r2">
                  <div className="component-header">
                    <Total
                      height={400}
                      url={
                        router.host +
                        "/" +
                        router.root +
                        "/" +
                        router.activeYear +
                        "/NewlyHomelessByCity/?search=Individuals"
                      }
                      cityChoice={""}
                      dashboard={"Newly Homeless"}
                    />
                  </div>
                </div>
                <div className="sub-tots-c2r1">
                  <span className="component-header">
                    Percentage of Unsheltered
                  </span>
                </div>
                <div className="sub-tots-c2r2">
                  <div className="component-header">
                    <PercentageDistrict
                      height={400}
                      url={
                        router.host +
                        "/" +
                        router.root +
                        "/" +
                        router.activeYear +
                        "/NewlyHomelessByCity/?search=Individuals"
                      }
                      districtUrl={
                        router.host +
                        "/" +
                        router.root +
                        "/" +
                        router.activeYear +
                        "/CityTotalByYear/"
                      }
                      activeYear={router.activeYear}
                      cityChoice={""}
                      dashboard={"Newly Homeless"}
                    />
                  </div>
                </div>
              </div>
              {/* <Segment> */}
              <PieChart
                data={pieDataManiTotal(
                  filterList(
                    this.state.Tables[
                      router.activeYear + "/NewlyHomelessByCity"
                    ]["Ethnicity"],
                    "subpopulation",
                    ["Total"]
                  )
                )}
                {...newlyHomelessStyling["Ethnicity"]}
              />

              <br />

              <PieChart
                data={pieDataManiTotal(
                  filterList(
                    this.state.Tables[
                      router.activeYear + "/NewlyHomelessByCity"
                    ]["Gender"],
                    "subpopulation",
                    ["Total"]
                  ),
                  newlyHomelessStyling["Gender"].percentage
                )}
                {...newlyHomelessStyling["Gender"]}
              />
              {/* </Segment> */}
            </Grid.Column>

            <Grid.Column>
              {/* <Segment> */}
              <TableComponent4
                data={changeVals2020(
                  filterList(
                    this.state.Tables[
                      router.activeYear + "/NewlyHomelessByCity"
                    ]["Subpopulations"],
                    "subpopulation",
                    FILTER_COLUMNS
                  )
                )}
                {...newlyHomelessStyling["Subpopulations"]}
                percentage_flag={1}
                individuals_row={null}
              />
              {/* </Segment> */}
            </Grid.Column>
          </Grid.Row>

          <Grid.Row verticalAlign="middle" stretched>
            <Grid.Column width={12}>
              <Segment>
                <BarChart
                  data={filterList(
                    this.state.Tables[
                      router.activeYear + "/NewlyHomelessByCity"
                    ]["Race"],
                    "subpopulation",
                    ["Total"]
                  )}
                  {...newlyHomelessStyling["Race"]}
                />
              </Segment>
            </Grid.Column>

            <Grid.Column width={4}>
              <Segment>
                <TableComponent4
                  data={
                    this.state.Tables[
                      router.activeYear + "/NewlyHomelessByCity"
                    ]["Households"]
                  }
                  {...newlyHomelessStyling["Household"]}
                  percentage_flag={1}
                />
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
  render() {
    return (
      <div>
        {this.state.rendered ? (
          this.dashboard()
        ) : (
          <div class="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
      </div>
    );
  }
}
