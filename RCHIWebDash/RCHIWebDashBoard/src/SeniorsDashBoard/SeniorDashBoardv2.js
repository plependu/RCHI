import React, { useState, useEffect, useReducer } from "react";

import {
  aggregateFetch,
  filter,
  changeValue,
} from "components/Utilities/ListManipulation";
import { pie } from "components/Utilities/ChartDataManipulation";
import { router } from "components/Utilities/constants/routing";
import { FILTER_COLUMNS } from "constants/SeniorsDashboard";

const SeniorsDashboardGrid = () => {
  const [urls] = useState(
    `${router.host}/${router.root}/${router.activeYear}/SeniorsSubpopulations/`
  );
  const [render, setRender] = useState(false);
  const [Tables, setTables] = useState([]);

  useEffect(() => {
    // * IIFE Annotation
    (async () => {
      const Tables = await aggregateFetch.aggregateFetch(urls);
      setTables(Tables);
      setRender(true);
    })();
  }, [urls]);

  if (render) {
    console.log("URL: ", urls);
    console.log("Router host: ", router.host);
    console.log("Table Render Complete: ", Tables);
    return "Not REndering";
  } else {
    console.log("Rending not complete: {Table}", Tables);
    return "Testing";
  }
};

export default SeniorsDashboardGrid;

// http://rchi.cs.ucr.edu/api/2020/SeniorsSubpopulations/
