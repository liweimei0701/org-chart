import React, { useRef, useEffect, useState } from "react";
import "./ChartNode.css";
import PersonCard from "./PersonCard";
import { dragNodeService } from "../utils/dragNodeService";

const ChartNode = ({ datasource, draggable, restructureHierarchy }) => {
  const node = useRef();
  const [allowedDrop, setAllowedDrop] = useState(false);

  const nodeClass = ["chart-node", allowedDrop ? "allowedDrop" : ""]
    .filter((item) => item)
    .join(" ");
  const personClass = ["box", allowedDrop ? "allowedDrop" : ""]
    .filter((item) => item)
    .join(" ");

  useEffect(() => {
    const subs1 = dragNodeService.getDragInfo().subscribe((draggedInfo) => {
      if (draggedInfo) {
        setAllowedDrop(
          !document
            .querySelector("#" + draggedInfo.draggedNodeId)
            .closest("li")
            .querySelector("#" + node.current.id)
            ? true
            : false
        );
      } else {
        setAllowedDrop(false);
      }
    });

    return () => {
      subs1.unsubscribe();
    };
  }, [datasource]);

  const filterAllowedDropNodes = (id) => {
    dragNodeService.sendDragInfo(id);
  };

  const dragstartHandler = (event) => {
    const copyDS = { ...datasource };
    event.dataTransfer.setData("text/plain", JSON.stringify(copyDS));
    // highlight all potential drop targets
    filterAllowedDropNodes(node.current.id);
  };

  const dragoverHandler = (event) => {
    // prevent default to allow drop
    event.preventDefault();
  };

  const dragendHandler = () => {
    // reset background of all potential drop targets
    dragNodeService.clearDragInfo();
  };

  const dropHandler = (event) => {
    if (!event.currentTarget.classList.contains("allowedDrop")) {
      return;
    }
    dragNodeService.clearDragInfo();
    restructureHierarchy(
      event.currentTarget.id,
      JSON.parse(event.dataTransfer.getData("text/plain")),
    );
  };

  return (
    <li className="chart-hierarchy">
      <div
        ref={node}
        id={`l${datasource.id}`}
        className={nodeClass}
        draggable={draggable ? "true" : undefined}
        onDragStart={dragstartHandler}
        onDragOver={dragoverHandler}
        onDragEnd={dragendHandler}
        onDrop={dropHandler}
      >
        <PersonCard
          personName={datasource.name}
          position={datasource.position}
          image={datasource.image}
          className={personClass}
        />
      </div>
      {datasource.reports && datasource.reports.length > 0 && (
        <ul>
          {datasource.reports.map((child) => (
            <ChartNode
              datasource={child}
              id={`l${child.id}`}
              key={child.id}
              draggable={draggable}
              restructureHierarchy={restructureHierarchy}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default ChartNode;
