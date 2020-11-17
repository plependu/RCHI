import React from 'react'
import "components/css/dash.css"
import { Header, Segment } from "semantic-ui-react";


const UnshelteredVsShelteredGird = ({ShelteredStatistics, UnshelteredS}) => {
    return (
        <div>
        <div className="container my-2">
          <Segment>
            <Header size="huge" textAlign="center">
              Sheltered vs Unsheltered
              <Header sub> 2020 Riverside County Pit Count</Header>
            </Header>
          </Segment>
          <div className="row dash-row">
            <div className="col-md dash-col-com">
              <div className="svu-grid">
                <div className="svu-r1">
                  Table 1
                </div>
                <div className="svu-r2-h25">
                  <br />
                  Table 2
                </div>
              </div>
            </div>
            <div className="col-md-6 dash-col-com">
              <div className="svu-grid-2">
                <div className="svu-r1-2">
                  {
                    <span className="component-header">
                      Homeless Population Trend
                    </span>
                  }
                  Line Graph
                </div>
                <div className="svu-r2">
                  <span className="component-header">Age</span>
                  Bar Graph
                </div>
                <div className="svu-r2">
                  <span className="component-header"> Race</span>
                  Bar Graph
                </div>
              </div>
            </div>
            <div className="col-md dash-col-com">
              <div className="svu-grid">
                <div className="svu-r1">
                  Table 3
                </div>
                <div className="svu-r2-h25">
                  <br />
                  Table 4
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default UnshelteredVsShelteredGird