import React, { useState, useEffect } from "react";

import {
  fetch,
  filter,
  changeValue,
} from "components/Utilities/ListManipulation";

import { pie } from "components/Utilities/ChartDataManipulation";
import Table from "components/charts/TableComponent4";
import Total from "components/Numbers/Total";
import PercentageDistrict from "components/Numbers/PercentageDistrict";
import { BarChart, PieChart } from "components/reformatedCharts";
import DashboardGrid from "components/layouts/grids/NewlyHomeless";
import { router } from "components/Utilities/constants/routing";
import { FILTER_COLUMNS } from "constants/NewlyHomelessDashboard";
import { newlyHomelessStyling } from "components/Utilities/styling/chartTablesStyling";

const NewlyHomeless = () => {
  const urls = [
    `${router.host}/${router.root}/${router.activeYear}/NewlyHomelessByCity/`,
    `${router.host}/${router.root}/${router.activeYear}/CityTotalByYear/`,
  ];

  const [render, setRender] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    // * IIFE Annotation
    (async () => {
      const fetchData = await fetch.aggregateFetch(urls);

      const categories = [
        { type: "Total", filterType: "Individuals", chart: "Total" },
        { type: "Percentage", filterType: "Individuals", chart: "Percentage" },
        { type: "Living Situation", filterType: "Sort", chart: "Table" },
        { type: "Subpopulations", filterType: "Change Value", chart: "Table" },
        { type: "Gender", filterType: "Pie Total", chart: "Pie" },
        { type: "Ethnicity", filterType: "Pie Total", chart: "Pie" },
        { type: "Race", filterType: null, chart: "Bar" },
        { type: "Households", filterType: null, chart: "Table" },
        { type: "Age", filterType: "Sort", chart: "Table" },
      ];

      const prepData = categories.reduce((acc, curr) => {

        const { type, filterType, chart } = curr;
        const style = newlyHomelessStyling[type];
        let data = [];

        if (filterType === "Individuals"){
          data =
            fetchData[`${router.activeYear}/NewlyHomelessByCity`][
              "Individuals"
            ];
        }else{
          data = filter.filterList(
            fetchData[`${router.activeYear}/NewlyHomelessByCity`][type],
            "subpopulation",
            FILTER_COLUMNS
          );

          if (filterType === "Change Value") {
            data = changeValue.changeVals2020(data);
          } else if (filterType === "Pie Total") {
            data = pie.pieDataManiTotal(data);
          } else if (filterType === "Sort") {
            data = data.sort((a, b) => {
              return b.total - a.total;
            });
          }
        }

        const strippedType = type.replace(/\s+/g, "");


        if (!acc[strippedType]) {
          if (chart === "Table") {
            acc[strippedType] = <Table data={data} {...style} />;
          } else if (chart === "Pie") {
            acc[strippedType] = <PieChart data={data} {...style} />;
          } else if (chart === "Bar") {
            acc[strippedType] = <BarChart data={data} {...style} />;
          } else if (chart === "Total") {
            console.log("Total: ", chart)
            acc[strippedType] = <Total data={data} />;
          } else if (chart === "Percentage") {
            acc[strippedType] = (
              <PercentageDistrict
                totalCatData={data}
                totalPopData={
                  fetchData[`${router.activeYear}/CityTotalByYear`]["undefined"]
                }
                activeYear={router.activeYear}
                dashboard={"NewlyHomeless"}
              />
            );
          }
        }
        return acc;
      },{});

      setData(prepData);
      setRender(true);
    })();
  }, []);

  if (render) {
    return <DashboardGrid {...data} />;
  } else {
    return (
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
};

export default NewlyHomeless;
