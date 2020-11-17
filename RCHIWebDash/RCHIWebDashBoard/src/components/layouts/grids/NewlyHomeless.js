import React from "react";
import "components/css/dash.css"
import { Header, Segment, Grid, Container } from "semantic-ui-react";
import { ContainerWidth } from "components/Utilities/styling/chartTablesStyling";

const NewlyHomelessGrid = ({
  Total,
  Percentage,
  LivingSituation,
  Age,
  Ethnicity,
  Gender,
  Subpopulations,
  Race,
  Households
}) => {
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
            {Age}
            {LivingSituation}
          </Grid.Column>
          <Grid.Column>
            <div className="sub-tots">
              <div className="sub-tots-c1r1">
                <span className="component-header">Total Unsheltered</span>
              </div>
              <div className="sub-tots-c1r2">
                <div className="component-header">{Total}</div>
              </div>
              <div className="sub-tots-c2r1">
                <span className="component-header">
                  Percentage of Unsheltered
                </span>
              </div>
              <div className="sub-tots-c2r2">
                <div className="component-header">{Percentage}</div>
              </div>
            </div>
            {Ethnicity}

            <br />

            {Gender}
          </Grid.Column>

          <Grid.Column>{Subpopulations}</Grid.Column>
        </Grid.Row>

        <Grid.Row verticalAlign="middle" stretched>
          <Grid.Column width={12}>
            <Segment>{Race}</Segment>
          </Grid.Column>

          <Grid.Column width={4}>
            <Segment>{Households}</Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default NewlyHomelessGrid;