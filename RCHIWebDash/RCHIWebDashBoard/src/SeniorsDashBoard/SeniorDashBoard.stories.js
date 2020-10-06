import React from "react";
import SeniorsDashboardGrid from "./SeniorDashBoardv2";

export default {
  title: "Testing/SeniorDashboard",
  component: SeniorsDashboardGrid,
  argsTypes: {},
};

const Template = (args) => <SeniorsDashboardGrid {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
