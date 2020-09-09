import React from "react";
import StackedLineGraph from "../charts/StackedLineGraph";

export default {
  title: "Stacked Line Graph",
  component: StackedLineGraph,
  decorators: [(Story) => <div style={{height:'300px'}}><Story /></div>],
  argTypes: {
    data: { description: `Array<{
      id:    string | number,
      value: number
        }>` },
    gridYValues: { description:"Number of grid lines behind the line graph",control: { type: "number", min: 0 } },
    max: { description:"Maximum Y value to be shown on the line graph",control: "number", min: 0 },
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
    }
  },
};

const Template = (args) => <StackedLineGraph {...args} />;

export const StackedLineGraph2020 = Template.bind({});

StackedLineGraph2020.args = {
  data: [
    {
      'id': "Volunteers",
      'data': [
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
        },
        {
          'x': "2020",
          'y': "842"
        },
      ]
    },
    {
      'id': "Sheltered",
      'data': [
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
        },
        {
          'x': "2020",
          'y': "729"
        },
      ]
    },
    {
      'id': "Unsheltered",
      'data': [
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
        },
        {
          'x': "2020",
          'y': "2155"
        },

      ]
    }
  ],
  gridYValues: 4,
  max: 4000,
  header: "Homeless Population Trend",
  margin: {top: 20, right: 30, bottom: 70, left: 40 }
};
