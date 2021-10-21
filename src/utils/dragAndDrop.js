import { flatData } from "./flatData";
import { restructureData } from "./restructureData";

export const dragAndDrop = (data1, targetId, dragItem1 ) => {
  const data = [data1];
  const dragItem = [dragItem1];
  //removeNode
  const flatData1 = flatData(data);
  let ids = [];
  flatData(dragItem).map( i => {
    ids.push(i.id);
    return ids;
  })
  let forObj1 = {};
  flatData1.forEach(v => {
    if(ids.indexOf(v.id) === -1) {
      forObj1[v.id] = v
    } 
  })
  // add to targetId 
  if(forObj1[targetId].reports){
    forObj1[targetId].reports.push(dragItem[0])
  }else {
    forObj1[targetId].reports = [dragItem[0]]
  }
  
  const newdata = restructureData(forObj1)
  return newdata[0]
};
