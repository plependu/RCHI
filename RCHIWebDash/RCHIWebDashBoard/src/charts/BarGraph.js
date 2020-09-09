import React from 'react';
import { colors } from '../components/Utilities/styling/colors';
import { ResponsiveBar } from '@nivo/bar';
import PropTypes from 'prop-types';
import './styles.css';

const BarGraph = (props) => {
  let {
    labelSkipHeight,
    header,
    subHeader,
    data,
    indexBy,
    keys,
    legend,
    margin,
    tickValues,
    gridYValues,
    maxValue,
    groupMode,
    divHeight,
    padding,
    boldHeader,
    color
  } = props;

  return (
    <div style={{ height: divHeight, width: '100%' }} className="graph">
      <div>
        <div className={`header ${boldHeader ? "trends" : ""}`} >{header}</div>
        <div className={`subheader ${boldHeader ? "trends" : ""}`}>{subHeader}</div>
      </div>
      <ResponsiveBar
        data={data}
        keys={keys}
        indexBy={indexBy}
        margin={margin}
        maxValue={maxValue ? maxValue : 'auto'}
        padding={padding ? padding : 0.15}
        groupMode={groupMode}
        colors={color? color : colors[7]}
        colorBy='id'
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: '#38bcb2',
            size: 4,
            padding: 1,
            stagger: true
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: '#eed312',
            rotation: -45,
            lineWidth: 6,
            spacing: 10
          }
        ]}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -12,
          legend: data[0].category ? data[0].category : null,
          legendPosition: 'middle',
          legendOffset: 32
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          tickValues: tickValues,
          maxValue: maxValue
        }}
        gridYValues={gridYValues}
        labelSkipWidth={0}
        labelSkipHeight={labelSkipHeight ? labelSkipHeight : 4}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        legends={
          legend
            ? [
                {
                  dataFrom: 'keys',
                  anchor: 'bottom-right',
                  direction: 'column',
                  justify: false,
                  translateX: 120,
                  translateY: 0,
                  itemsSpacing: 2,
                  itemWidth: 100,
                  itemHeight: 20,
                  itemDirection: 'left-to-right',
                  itemOpacity: 0.85,
                  symbolSize: 20,
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemOpacity: 1
                      }
                    }
                  ]
                }
              ]
            : []
        }
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </div>
  );
};

BarGraph.propTypes = {
  data: PropTypes.object.isRequired,
  divHeight: PropTypes.string.isRequired,
  keys: PropTypes.object.isRequired,
  indexBy: PropTypes.string.isRequired,
  labelSkipHeight: PropTypes.number,
  header: PropTypes.string,
  subHeader: PropTypes.string,
  legend: PropTypes.bool,
  margin: PropTypes.object,
  tickValues: PropTypes.number,
  gridYValues: PropTypes.number,
  maxValue: PropTypes.number,
  groupMode: PropTypes.oneOf(['stacked', 'grouped']),
  padding: PropTypes.number,
  boldHeader: PropTypes.bool
};

export default BarGraph;
