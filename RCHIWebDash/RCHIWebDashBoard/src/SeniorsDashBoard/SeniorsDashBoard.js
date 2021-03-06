import React, { Component } from 'react'
import { aggregateFetch } from '../components/Utilities/ListManipulation/aggregateFetch'

import '../components/css/dash.css'
import TableComponent4 from '../components/charts/TableComponent4';
import PieChart2 from '../components/charts/PieChart2';
import BarGraph from '../components/TestingBranch/BarGraph';
import BarChart from '../components/reformatedCharts/BarChart'
import PieChart from '../components/reformatedCharts/PieChart'
import {Header,Segment, Grid, Container, GridColumn} from 'semantic-ui-react'
import {filterList} from '../components/Utilities/ListManipulation/filter'
import { changeVals2020 } from '../components/Utilities/ListManipulation/changeValue'
import { pieDataManiTotal } from '../components/Utilities/ChartDataManipulation/pieDataManipulation'
import { router } from '../components/Utilities/constants/routing';
import { seniorsUnshelteredStyling ,  ContainerWidth} from '../components/Utilities/styling/chartTablesStyling'
import Total from "../components/Numbers/Total";
import PercentageDistrict from "../components/Numbers/PercentageDistrict";

const FILTER_COLUMNS = [

"Veteran No",
"No Substance Abuse",
"Unknown Substance Abuse",
"No PTSD",
"Unknown PTSD",
"No Mental Health Conditions",
"Unknown Mental Health Conditions",
"No Physical Disability",
"Unknown Physical Disability",
"No Developmental Disability",
"Unknown Developmental Disability",
"No Brain Injury",
"Unknown Brain Injury",
"Not Victim of Domestic Violence",
"Unknown Victim of Domestic Violence",
"No AIDS or HIV",
"Unknown AIDS or HIV",
"Jail Release 90 Days: Probation",
"Jail Release 90 Days: Parole",
"Jail Release 90 Days: Completed Sentence",
"Jail Release 90 Days: (Unspecified)",
"Jail Release 12 Months: Probation",
"Jail Release 12 Months: Parole",
"Jail Release 12 Months: Completed Sentence",
"Jail Release 12 Months: (Unspecified)",
"No Jail",
"Unknown Jail",
"Not Chronically Homeless",
"Unknown Veteran",
"Chronically Homeless",
"Couch",
"Individuals"

]


export default class SeniorDashboardGrid extends Component{
    constructor(){
        super();
        this.state = {
            urls: [router.host + '/' + router.root + '/' + router.activeYear +"/SeniorsSubpopulations/"],
            rendered : false,
            Tables : []
        }
    }

    async componentDidMount(){

        var Tables = await aggregateFetch(this.state.urls)

        this.setState({
            Tables : Tables,
            rendered : true,

        })

    }

    renderDashboard(){
        return(
            <div className="container my-2">
            <Segment>
                <Header size="huge"  textAlign='center'>
                    Unsheltered - Newly Homeless
                    <h3><b>Interview Only</b></h3>
                    <h6><i>60+ due program eligibility criteria</i></h6>
                    <Header sub> 2020 Riverside County Pit Count</Header>
                </Header>
            </Segment>

            <div className="row dash-row">
              <div className="col-sm-8 dash-col-com">
                <div className="gen-grid">
                    <div className = "gen-r2">

                        <div className="gen-r2c2">
                        <TableComponent4
                            data = {filterList(this.state.Tables[router.activeYear + "/NewlyHomelessByCity"]["Age"],"subpopulation", FILTER_COLUMNS)}
                            tableName = "Age"
                            height = "120%"
                        />
                        </div>
                        <div className="gen-r2c1">
                        <div className="gen-r2c1r1">
                            <p className="component-header">Ethnicity</p>
                            <PieChart2
                            data = {filterList(this.state.Tables[router.activeYear + "/NewlyHomelessByCity"]["Ethnicity"],"subpopulation", ["Total"])}
                            margin = {{top: 30, bottom: 20}}
                            />
                        </div>
                        <div className="gen-r2c1r2">
                        <p className="component-header">Gender</p>
                        <PieChart2
                            data = {filterList(this.state.Tables[router.activeYear + "/NewlyHomelessByCity"]["Gender"],"subpopulation", ["Total"])}
                            margin = {{top: 30,bottom: 20}}
                            />
                        </div>
                        </div>
                    </div>
                    <div style = {{position: "relative",
                                    display: "grid",
                                    height: "100%"}}>
                    <p className="component-header">Race</p>
                    <BarGraph
                      data = {this.state.Tables[router.activeYear + "/NewlyHomelessByCity"]["Race"]}
                      indexBy = {"subpopulation"}
                      keys = {["total"]}
                      margin = {{ top: 50, right: 30, bottom: 50, left: 50}}
                    />
                    </div>
                </div>
              </div>
              <div className="col-sm-4 dash-col-com" >
                {/*<span className="component-header">Unsheltered Only Demographic</span> */}
                <div className="gen-r2">
                  <TableComponent4 
                    data = {changeVals2020(filterList(this.state.Tables[router.activeYear + "/NewlyHomelessByCity"]["Subpopulations"],"subpopulation", FILTER_COLUMNS))}
                    tableName = "Subpopulations"
                    height = "120%"
                    />

                </div>
              </div>
            </div>
          </div>
        )
    }

    dashboard(){
       return <Container style={{width:ContainerWidth}}>
            <Segment>
                <Header as='h1'  textAlign='center'>
                     Unsheltered - Seniors 60+
                    <h3><b>Interview Only</b></h3>
                    <h6><i>60+ due to program eligibility criteria</i></h6>
                <Header sub> 2020 Riverside County Pit Count</Header>
                </Header>
            </Segment>

            <Grid stackable >
                <Grid.Row verticalAlign='middle' stretched columns={3} divided>
                    <Grid.Column>
                        {/* <Segment> */}
                            <TableComponent4
                                data = {filterList(this.state.Tables[router.activeYear + "/SeniorsSubpopulations"]["Living Situation"],"subpopulation", FILTER_COLUMNS).sort( (a,b) => { return b.total - a.total})}
                                {...seniorsUnshelteredStyling["Living Situation"]}
                            />
                        {/* </Segment> */}
                    </Grid.Column>
                    <Grid.Column>
                        {/* <Segment> */}
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
                                        "/SeniorsSubpopulations/?search=Individuals"
                                        }

                                        cityChoice = {""}
                                    />
                                </div>
                            </div>
                            <div className="sub-tots-c2r1">
                                <span className="component-header">Percentage of Unsheltered</span>
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
                                        "/SeniorsSubpopulations/?search=Individuals"
                                        }

                                        districtUrl = {
                                            router.host +
                                            "/" +
                                            router.root +
                                            "/" +
                                            router.activeYear +
                                                "/CityTotalByYear/"
                                          }
                                          activeYear = {router.activeYear}
                                          dashboard = {"Seniors"}
                                    />
                                </div>
                            </div>
                        </div>
                        <PieChart 
                            data = {pieDataManiTotal(filterList(this.state.Tables[router.activeYear + "/SeniorsSubpopulations"]["Ethnicity"],"subpopulation", ["Total"]))}
                            {...seniorsUnshelteredStyling["Ethnicity"]}
                        />
                        <br />
                        <PieChart 
                            data = {pieDataManiTotal(filterList(this.state.Tables[router.activeYear + "/SeniorsSubpopulations"]["Gender"],"subpopulation", ["Total", "Unknown Gender", "Gender Non-Conforming","Transgender"]))}
                            {...seniorsUnshelteredStyling["Gender"]}
                        />
                        {/* </Segment> */}
                    </Grid.Column>
                    <Grid.Column>
                        {/* <Segment> */}
                            <TableComponent4 
                                data = {changeVals2020(filterList(this.state.Tables[router.activeYear + "/SeniorsSubpopulations"]["Subpopulations"],"subpopulation", FILTER_COLUMNS))}
                                {...seniorsUnshelteredStyling["Subpopulations"]}
                                percentage_flag = {1}
                                individuals_row = {null}
                            />
                        {/* </Segment> */}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row verticalAlign='middle' stretched >
                    <Grid.Column width={12}>
                        <Segment>
                                <BarChart 
                                    data = {filterList(this.state.Tables[router.activeYear + "/SeniorsSubpopulations"]["Race"],"subpopulation",["Total"])}
                                    {...seniorsUnshelteredStyling["Race"]}
                                />
                            </Segment>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Segment>
                            <TableComponent4
                                data = {this.state.Tables[router.activeYear + "/SeniorsSubpopulations"]["Households"]}
                                {...seniorsUnshelteredStyling["Household"]}
                            />
                            </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        </Container>
    }
    render(){
        return(
            <div>
                {this.state.rendered ?
                    this.dashboard()
                    : (
                        <div class="lds-ring">
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                        </div>
                      )}
            </div>
        )
    }
}
