import React from 'react'
import {Grid, Segment} from 'semantic-ui-react'

const PageThreeTrend = (props) => (
        <Grid stackable>
            <Grid.Row verticalAlign='middle'> 
                <Grid.Column width={8}>
                    <Segment>{props.trendsSelected[0]}</Segment>
                </Grid.Column>
                <Grid.Column width={8}>
                    <Segment>{props.trendsSelected[1]}</Segment>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={8}>
                    <Segment>{props.trendsSelected[2]}</Segment>
                </Grid.Column>
                <Grid.Column width={8}>
                    <Segment>{props.trendsSelected[3]}</Segment>
                </Grid.Column>
            </Grid.Row>
        </Grid>
)

export default PageThreeTrend