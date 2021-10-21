import React, { useState, useEffect } from "react";
import "./ChartContainer.css";
import ChartNode from "./ChartNode";
import { dragAndDrop } from "../utils/dragAndDrop";

const ChartContainer = ({ datasource, draggable }) => {
  const [ds, setDS] = useState(datasource);
  useEffect(() => {
    setDS(datasource);
  }, [datasource]);

  const getNodeData = (data) => {
    if (data.reports && data.reports.length > 0) {
      data.reports.forEach((item) => {
        getNodeData(item);
      });
    }
    return data;
  };

  const restructureHierarchy = async ( targetid, dragitem) => {
    const id =  Number(targetid.substr(1, 1))
    const newDs = dragAndDrop(ds, id, dragitem)
    setDS({ ...newDs });
  };

  return (
    <div className="orgchart">
      <ul>
        <ChartNode
          datasource={getNodeData(ds)}
          draggable={draggable}
          restructureHierarchy={restructureHierarchy}
        />
      </ul>
    </div>
  );
};

export default ChartContainer;
