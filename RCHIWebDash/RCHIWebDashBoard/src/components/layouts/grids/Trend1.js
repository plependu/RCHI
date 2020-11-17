import React from 'react'
import {Grid, Segment} from 'semantic-ui-react'

const Layout = ({trendsSelected}) => 
    (
        <Grid stackable>
            <Grid.Row verticalAlign='middle'> 
                <Grid.Column width={8}>
                    <Segment>{trendsSelected[0]}</Segment>
                </Grid.Column>
                <Grid.Column width={8}>
                    <Segment>{trendsSelected[1]}</Segment>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row verticalAlign='middle'>
                <Grid.Column width={4}>
                    <Segment>{trendsSelected[2]}</Segment>
                </Grid.Column>
                <Grid.Column width={8}>
                    <Segment>{trendsSelected[3]}</Segment>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Segment>{trendsSelected[4]}</Segment>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )

export default Layout