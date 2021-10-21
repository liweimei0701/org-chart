import React, { useState, useEffect } from "react";
import axios from "axios";
import ChartContainer from "../component/ChartContainer";

const apiUrl =
  "https://fetest-organigram.s3.ap-southeast-2.amazonaws.com/data.json";

const OrgChart = () => {
  const [dataSource, setDataSource] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(apiUrl);
        const employees = result.data.employees;
        employees.forEach((item) => {
          setDataSource(item);
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return <ChartContainer datasource={dataSource} draggable={true} />;
};

export default OrgChart;
