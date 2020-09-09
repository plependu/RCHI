import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import PropTypes from 'prop-types';
import { colors } from '../components/Utilities/styling/colors';
import './styles.css';

const StackedLineGraph = (props) => {
  let { data, gridYValues, max, margin, header, subHeader, boldHeader } = props;
  return (
    <div style={{ height: '100%', width: '100%', position: 'absolute' }}>
      <div>
        <div className={`header ${boldHeader ? 'trends' : ''}`}>{header}</div>
        <div className={`subheader ${boldHeader ? 'trends' : ''}`}>{subHeader}</div>
      </div>
      <ResponsiveLine
        data={data}
        margin={margin ? margin :{ top: 0, right: 30, bottom: 70, left: 40 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', stacked: true, min: 0, max: max }}
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
        gridYValues={gridYValues}
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
          legendOffset: 36,
          legendPosition: 'middle'
        }}
        axisLeft={null}
        colors={colors[7]}
        lineWidth={2}
        pointSize={5}
        enablePointLabel={true}
        pointColor={{ from: 'color', modifiers: [] }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        enableArea={true}
        areaOpacity={0.65}
        useMesh={true}
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 50,
            itemsSpacing: 15,
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
    </div>
  );
};

StackedLineGraph.propTypes = {
  data: PropTypes.array.isRequired,
  divHeight: PropTypes.string.isRequired,
  boldHeader: PropTypes.bool,
  margin: PropTypes.object,
  header: PropTypes.string,
  subHeader: PropTypes.string,
  gridYValues: PropTypes.number,
  max: PropTypes.number,
  colors: PropTypes.array
  
};

export default StackedLineGraph;
