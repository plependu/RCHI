import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import PropTypes from 'prop-types';

const LineGraph = (props) => {
  let {
    slice,
    stacked,
    header,
    subHeader,
    divHeight,
    margin,
    tickValues,
    gridYValues,
    maxValue,
    data,
    legend,
    colors,
    boldHeader
  } = props;
  return (
    <div style={{ height: divHeight, width: '100%' }}>
      <div>
         <div className={`header ${boldHeader ? "trends" : ""}`} >{header}</div>
         <div className={`subheader ${boldHeader ? "trends" : ""}`}>{subHeader}</div>
      </div>
      <ResponsiveLine
        data={data}
        margin={margin ? margin : { top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 0,
          max: maxValue ? maxValue : 'auto',
          stacked: stacked ? stacked : false,
          reverse: false
        }}
        enableSlices='x'
        sliceTooltip={({ slice }) => {
          return (
            <div
              style={{
                background: 'white',
                padding: '9px 12px',
                border: '1px solid #ccc'
              }}>
              <div>
                <strong>Year:</strong> {slice.points[0].data.x}
              </div>
              {slice.points.map((point) => (
                <div
                  key={point.id}
                  style={{
                    color: point.serieColor,
                    padding: '3px 0'
                  }}>
                  <strong>{point.serieId}</strong> [{point.data.yFormatted}]
                </div>
              ))}
            </div>
          );
        }}
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
        axisLeft={
          slice
            ? null
            : {
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendPosition: 'middle',
                tickValues: tickValues ? tickValues : 0
              }
        }
        gridYValues={gridYValues}
        colors={colors}
        lineWidth={4}
        pointSize={10}
        enablePointLabel={true}
        pointColor={{ from: 'color', modifiers: [] }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel='y'
        pointLabelYOffset={-12}
        useMesh={true}
        legends={
          legend
            ? [
                {
                  anchor: 'bottom',
                  direction: 'row',
                  justify: false,
                  translateX: 0,
                  translateY: 41,
                  itemsSpacing: 0,
                  itemDirection: 'left-to-right',
                  itemWidth: 80,
                  itemHeight: 10,
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
              ]
            : []
        }
      />
    </div>
  );
};

LineGraph.propTypes = {
  data: PropTypes.array.isRequired,
  divHeight: PropTypes.string.isRequired,
  margin: PropTypes.object,
  stacked: PropTypes.bool,
  header: PropTypes.string,
  subHeader: PropTypes.string,
  tickValues: PropTypes.number,
  gridYValues: PropTypes.number,
  maxValue: PropTypes.number,
  legend: PropTypes.bool,
  colors: PropTypes.array,
  boldHeader: PropTypes.bool
};

export default LineGraph;
