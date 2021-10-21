export const flatData = (data) => {
    let arr = [];
    const flatData1 = (data, status, parent, level = 0) => {
      data.length > 0 &&
        data.forEach((item) => {
          let obj = { ...item };
          if (status === 1) {
            obj.parentId = parent.id;
          }
          if ((item.reports && item.reports.length === 0) || !item.reports) {
            arr.push(obj);
          } else {
            obj.reports = [];
            obj.isParent = true;
            obj.level = level + 1;
            arr.push(obj);
            flatData1(item.reports, 1, item, obj.level);
          }
        });
    };
    flatData1(data);
    return arr;
  };
  