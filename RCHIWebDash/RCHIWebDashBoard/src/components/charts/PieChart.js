import React from 'react';
import {ResponsivePie} from "@nivo/pie";
import { ResponsiveBar } from '@nivo/bar';

export default class GeneralPieChart extends React.Component {

      constructor(props){
        super(props)
        this.state = {  
            data: [],
            newData: []
         };

        this.runPie = this.runPie.bind(this)
    }



       async componentDidMount(){

        var self = this
        await fetch('http://127.0.0.1:8000/api/GeneralTableSubpopulations2019/?search=Gender', {
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        .then(response => response.json())
        .then((data) =>{
            this.setState({mydata:data})
        })
        .catch(err => {
            console.log("no data found")
        })
        
        console.log("data:")
        console.log(this.state.mydata)
        const filterData = this.state.mydata.filter(index => (index.id !== "Total"))
        this.state.newData = filterData
        console.log(filterData)
        





    

      

      
    }

    
    runPie(){

        let i;
        const filterData = this.state.mydata.filter(index => (index.id !== "Total"))
        this.state.mydata = filterData;
        for (i = 0; i < this.state.mydata.length; i++) {
            this.state.mydata[i].value = this.state.mydata[i].total
            this.state.mydata[i].id = this.state.mydata[i].subpopulation
            this.state.mydata[i].label = this.state.mydata[i].subpopulation
            delete this.state.mydata[i].total;
            delete this.state.mydata[i].subpopulation;

        }
        



       
        return (
            <ResponsivePie
                    data={this.state.mydata}
                    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                    padAngle={0.7}
                    cornerRadius={3}
                    colors={{ scheme: 'nivo' }}
                    borderWidth={1}
                    borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
                    radialLabelsSkipAngle={10}
                    radialLabelsTextXOffset={6}
                    radialLabelsTextColor="#333333"
                    radialLabelsLinkOffset={0}
                    radialLabelsLinkDiagonalLength={16}
                    radialLabelsLinkHorizontalLength={24}
                    radialLabelsLinkStrokeWidth={1}
                    radialLabelsLinkColor={{ from: 'color' }}
                    slicesLabelsSkipAngle={10}
                    slicesLabelsTextColor="#333333"
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                    defs={[
                        {
                            id: 'dots',
                            type: 'patternDots',
                            background: 'inherit',
                            color: 'rgba(255, 255, 255, 0.3)',
                            size: 4,
                            padding: 1,
                            stagger: true
                        },
                        {
                            id: 'lines',
                            type: 'patternLines',
                            background: 'inherit',
                            color: 'rgba(255, 255, 255, 0.3)',
                            rotation: -45,
                            lineWidth: 6,
                            spacing: 10
                        }
                    ]}
                    fill={[
                        {
                            match: {
                                id: 'ruby'
                            },
                            id: 'dots'
                        },
                        {
                            match: {
                                id: 'c'
                            },
                            id: 'dots'
                        },
                        {
                            match: {
                                id: 'go'
                            },
                            id: 'dots'
                        },
                        {
                            match: {
                                id: 'python'
                            },
                            id: 'dots'
                        },
                        {
                            match: {
                                id: 'scala'
                            },
                            id: 'lines'
                        },
                        {
                            match: {
                                id: 'lisp'
                            },
                            id: 'lines'
                        },
                        {
                            match: {
                                id: 'elixir'
                            },
                            id: 'lines'
                        },
                        {
                            match: {
                                id: 'javascript'
                            },
                            id: 'lines'
                        }
                    ]}
                    legends={[
                        {
                            anchor: 'bottom',
                            direction: 'row',
                            translateY: 56,
                            itemWidth: 100,
                            itemHeight: 18,
                            itemTextColor: '#999',
                            symbolSize: 18,
                            symbolShape: 'circle',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemTextColor: '#000'
                                    }
                                }
                            ]
                        }
                    ]}
                />
            )
    }
    render() {
        return (
           <div style = {{height: 400}}>
         Gender
            {this.state.mydata ? this.runPie(): null}
        </div>
        
        )
    }
}
