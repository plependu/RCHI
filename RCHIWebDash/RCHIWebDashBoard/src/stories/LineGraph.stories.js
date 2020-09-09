import React from 'react';
import LineGraph from '../charts/LineGraph';
import { colors } from '../components/Utilities/colors';

export default {
  title: 'Line Graph',
  component: LineGraph,
  argTypes: {
      data: { description: `Array<{
        id:    string | number,
        value: number
          }>` },
      tickValues: { description: "Specify values to use for number of tick marks on Y axis"},
      gridYValues: {description: "Specify values to use for horizontal grid lines."},
    header: {
      required: false,
      description: "Title of Stacked Line Graph Chart",
      defaultValue: "",
    },
    subHeader: {
      required: false,
      description: "Subtitle of Stacked Line Graph Chart",
      defaultValue: "" ,
    },
    divHeight: { required: true, description: "Height of the Stacked Line Graph" },
    legends: {
      required: false,
      description: "Specify whether to show a legend or not",
      table: {
        defaultValue: {
          summary: false
        },
      },
    },
    boldHeader: {
      description: "Specify whether the header and subheader should have special styling",
      table: {
        defaultValue: {
          summary: false
        }
      }
    },
    margin: {
      required: false,
      description:
        "Margins around the Stacked Line Graph Chart only, does not add margins to the header/subHeader",
      defaultValue: { summary: 0 },
    },
  legend: {
    description: "Specify whether to show the legend"
  },
  maxValue: { description:"Maximum Y value to be shown on the line graph",control: "number", min: 0},
  colors: { description: "Colors of the lines on the graph"},

  }
};

const Template = (args) => <LineGraph {...args} />;

export const Veterans = Template.bind({});
export const Youth = Template.bind({});
Youth.args = {
  divHeight: '500px',
  header: 'Youth (18-24)',
  subHeader: '',
  divHeight: '30em',
  margin: { top: 20, right: 20, bottom: 80, left: 30 },
  colors: colors[7],
  tickValues: 5,
  gridYValues: 5,
  maxValue: 300,
  legend: true,
  boldHeader: true,
  data: [
    {
      id: 'Observed',
      data: [
        { x: 2016, y: 24 },
        { x: 2017, y: 71 },
        { x: 2018, y: 24 },
        { x: 2019, y: 93 },
        { x: 2020, y: 162 }
      ]
    },
    {
      id: 'Interviewed',
      data: [
        { x: 2016, y: 82 },
        { x: 2017, y: 107 },
        { x: 2018, y: 132 },
        { x: 2019, y: 88 },
        { x: 2020, y: 162 }
      ]
    },
    {
      id: 'Total',
      data: [
        { x: 2016, y: 106 },
        { x: 2017, y: 178 },
        { x: 2018, y: 177 },
        { x: 2019, y: 181 },
        { x: 2020, y: 256 }
      ]
    }
  ]
};

Veterans.args = {
  divHeight: '300px',
  header: 'Veteran',
  subHeader: 'Interview Only',
  legend: false,
  tickValues: 4,
  gridYValues: 4,
  maxValue: 200,
  colors: colors[7],
  data: [
    {
      id: 'Veterans',
      color: 'hsl(332, 70%, 50%)',
      data: [
        { x: '2016', y: '100' },
        { x: '2017', y: '91' },
        { x: '2018', y: '99' },
        { x: '2019', y: '107' },
        { x: '2020', y: '112' }
      ]
    }
  ],
  margin: { top: 20, right: 20, bottom: 50, left: 50 }
};
