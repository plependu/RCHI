import React from "react";
import PieChart from "../charts/PieChart";

export default {
  title: "Pie Chart",
  component: PieChart,
  decorators: [(Story)=> <div style={{height: '300px'}}><Story/></div>],
  argTypes: {
    data: {
      required: true,
      description: `Array<{
      id:    string | number,
      value: number
        }>`,
    },
    margin: {
      required: false,
      description:
        "Margins around the Pie Chart only, does not add margins to the header/subHeader",
      defaultValue: { summary: 0 },
    },
    sortByValue: {
      required: false,
      defaultValue: { summary: false },
      description: "Places the largest values first in a clockwise direction",
    },
    header: {
      required: false,
      description: "Title of Pie Chart",
    },
    subHeader: {
      required: false,
      description: "Subtitle of Pie Chart",
    },
    divHeight: { required: true, description: "Height of the Pie Chart" },
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
    }
  },
};

const Template = (args) => <PieChart {...args} />;
export const ChronicallyHomeless = Template.bind({});
export const Example = Template.bind({});

ChronicallyHomeless.args = {
  header: "Chronically Homeless",
  subHeader: "interview only",
  boldHeader: true,
  legends: false,
  divHeight: "20em",
  data: [
    {
      id: "Chronically Homeless",
      label: "Chronically Homeless",
      value: 80
    },
    {
      id: "Not Chronically Homeless",
      label: "Not Chronically Homeless",
      value: 146
    },
  ],
  margin: {top: 0, bottom: 60, left: 0, right: 0},
  sortByValue: true,
}

Example.args = {
  data: [
    {
      id: "java",
      label: "java",
      value: 504,
    },
    {
      id: "javascript",
      label: "javascript",
      value: 541,
    },
    {
      id: "css",
      label: "css",
      value: 552,
    },
    {
      id: "scala",
      label: "scala",
      value: 60,
    },
    {
      id: "go",
      label: "go",
      value: 487,
    },
  ],
  margin: {top: 0, bottom: 60, left: 0, right: 0},
  sortByValue: true,
  divHeight: "14em",
  header: "Example Pie Chart",
  subHeader: "From Nivo Pie",
  legends: true
};
