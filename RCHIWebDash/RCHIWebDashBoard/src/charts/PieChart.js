import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import PropTypes from 'prop-types';
import './styles.css';
import { colors } from '../components/Utilities/styling/colors';

const PieChart = (props) => {
  let {
    data,
    margin,
    sortByValue,
    legends,
    divHeight,
    header,
    subHeader,
    boldHeader
  } = props;

  return (
    <div style={{ height: divHeight, width: '100%' }}>
      <div>
        <div className={`header ${boldHeader ? "trends" : ""}`} >{header}</div>
        <div className={`subheader ${boldHeader ? "trends" : ""}`}>{subHeader}</div>
      </div>
      <ResponsivePie
        data={data}
        margin={margin ? margin : 0}
        sortByValue={sortByValue ? sortByValue : false}
        innerRadius={0}
        padAngle={0}
        cornerRadius={0}
        colors={colors[8]}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        radialLabelsSkipAngle={12}
        radialLabelsTextXOffset={6}
        radialLabelsTextColor='#333333'
        radialLabelsLinkOffset={0}
        radialLabelsLinkDiagonalLength={1}
        radialLabelsLinkHorizontalLength={1}
        radialLabelsLinkStrokeWidth={1}
        radialLabelsLinkColor={{ from: 'color' }}
        slicesLabelsSkipAngle={10}
        slicesLabelsTextColor='#333333'
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        legends={
          legends
            ? [
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
              ]
            : []
        }
      />
    </div>
  );
};

PieChart.propTypes = {
  data: PropTypes.array.isRequired,
  divHeight: PropTypes.string.isRequired,
  boldHeader: PropTypes.bool,
  margin: PropTypes.object,
  sortByValue: PropTypes.bool,
  header: PropTypes.string,
  subHeader: PropTypes.string
};

export default PieChart;
