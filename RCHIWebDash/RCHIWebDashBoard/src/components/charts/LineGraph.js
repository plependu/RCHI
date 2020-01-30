import React from 'react';
import { ResponsiveLine } from '@nivo/line'

export default class LineGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    }
  }
  
  componentDidMount = async event => {
    // TODO: replace static data with API call to backend..upload data in a table as an API reference
    var data = [
      {
        'id': "Volunteers",
        'data': [
          {
            'x': "2015",
            'y': "597"
          },
          {
            'x': "2016",
            'y': "503"
          },
          {
            'x': "2017",
            'y': "498"
          },
          {
            'x': "2018",
            'y': "486"
          },
          {
            'x': "2019",
            'y': "745"
          }
        ]
      },
      {
        'id': "Sheltered",
        'data': [
          {
            'x': "2015",
            'y': "880"
          },
          {
            'x': "2016",
            'y': "814"
          },
          {
            'x': "2017",
            'y': "768"
          },
          {
            'x': "2018",
            'y': "631"
          },
          {
            'x': "2019",
            'y': "766"
          }
        ]
      },
      {
        'id': "Unsheltered",
        'data': [
          {
            'x': "2015",
            'y': "1587"
          },
          {
            'x': "2016",
            'y': "1351"
          },
          {
            'x': "2017",
            'y': "1638"
          },
          {
            'x': "2018",
            'y': "1685"
          },
          {
            'x': "2019",
            'y': "2045"
          }
        ]
      }
    ];
    this.setState({data: data});
  }

  render() {
    return (
      // TODO: make div size responsive to the page dimensions
      // <div style={{maxHeight: "100%", minHeight: "100%"}}>
      <>
        <ResponsiveLine
          data={this.state.data}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: 'point' }}
          yScale={{ type: 'linear', stacked: false, min: 0, max: 'auto' }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
              orient: 'bottom',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: '',
              legendOffset: 36,
              legendPosition: 'middle'
          }}
          axisLeft={{
              orient: 'left',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: '',
              legendOffset: -40,
              legendPosition: 'middle'
          }}
          colors={{ scheme: "nivo" }}
          lineWidth={2}
          pointSize={10}
          pointColor={{ from: 'color', modifiers: [] }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabel="y"
          pointLabelYOffset={-12}
          enableArea={true}
          areaOpacity={0.65}
          useMesh={true}
          legends={[
              {
                  anchor: 'bottom-right',
                  direction: 'column',
                  justify: false,
                  translateX: 100,
                  translateY: 0,
                  itemsSpacing: 0,
                  itemDirection: 'left-to-right',
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: 'circle',
                  symbolBorderColor: 'rgba(0, 0, 0, .5)',
                  effects: [
                      {
                          on: 'hover',
                          style: {
                              itemBackground: 'rgba(0, 0, 0, .03)',
                              itemOpacity: 1
                          }
                      }
                  ]
              }
          ]}
        />
      </>
      // </div>
    );
  }
}