import React from 'react';
import BarGraph from '../charts/BarGraph';

export default {
  title: 'Bar Graph',
  component: BarGraph,
  decorators: [
    (Story) => (<div style={{ height: '400px' }}><Story /></div>)],
  argTypes: {
    data: {
      description: `Array<{
        id:    string | number,
        value: number
          }>`
    },
    padding: {
      description: 'Space between each bar',
      control: { type: 'number', min: 0, max: 1 }
    },
    groupMode: { description: 'stacked | grouped' },
    labelSkipHeight: {
      description:
        'Skip label if bar height is lower than provided value, ignored if 0.'
    },
    header: { description: 'Title of Bar Chart' },
    subHeader: { description: 'Subtitle of Bar Chart' },
    indexBy: { description: 'Key to use to index the data.' },
    keys: { description: 'Keys to use to determine each serie.' },
    legend: { description: 'Bar Graph Legend' },
    margin: { description: 'Bar Graph Margin' },
    tickValues: { description: "Number of ticks on left axis."},
    gridYValues: { description: "Number of grid lines behind the graph"},
    maxValue: { description: "Max value of the Bar Graph"},
    divHeight: {description: "Height of the component"},
    boldHeader: { description: "Whether or not the graph is on the trends dashboard"}
  }
};

const Template = (args) => <BarGraph {...args} />;

export const Race = Template.bind({});
export const SubstanceAbuse = Template.bind({});
Race.args = {
  data: [
    {
      id: 'Asian',
      label: 'Asian',
      total: 31
    },
    {
      id: 'American Indian',
      label: 'American Indian',
      total: 72
    },
    {
      id: 'Black',
      label: 'Black',
      total: 527
    },
    {
      id: 'White',
      label: 'White',
      total: 1667
    },
    {
      id: 'Multiple Races',
      label: 'Multiple Races',
      total: 63
    },
    {
      id: "Native Hawaiian",
      label: "Native Hawaiian",
      total:24
    },
    {
      id: "Unknown Race",
      label: "Unknown Race",
      total: 490
    }
  ],
  divHeight: '5em',
  indexBy: 'label',
  keys: ['total'],
  margin: { top: 20, right: 30, bottom: 50, left: 50 },
  divHeight: '25em',
  header: 'Race',
  subHeader: 'Total Count',
  maxValue: 2000
};

SubstanceAbuse.args = {
  data: [
    {
      id: "2019",
      label: "2019",
      total: 498 
    },
    {
      id: "2020",
      label: "2020",
      total: 453 
    }
  ],
  divHeight: '20em',
  indexBy: 'label',
  keys: ['total'],
  margin: { top: 30, right: 30, bottom: 50, left: 50 },
  header: 'Substance Abuse',
  subHeader: 'Interview Only',
  maxValue: 600,
  tickValues: 7,
  gridYValues: 7,
  padding: 0.6,
  boldHeader: true
}