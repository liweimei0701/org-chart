export const restructureData = (forObj) => {
    let arr = []
    Object.keys(forObj).forEach((key) => {
        arr.push(forObj[key]);
    })
  
    let originArr = []
    let originChildArr = []
    arr.forEach(item => {
        if (item.isParent || !item.parentId) {
            originArr?.push(item);
        } else {
            originChildArr?.push(item);
        }
    })
    originChildArr?.forEach(item => {
        originArr?.forEach(v => {
            if (item.parentId === v.id) {
                v.reports.push(item)
            }
        })
    })
  
    let eleOriginArr = [...originArr];
  
    originArr?.forEach((item, i) => {
        eleOriginArr?.forEach((v) => {
            if (item.id === v.id) return
  
            if (item.parentId === v.id) {
                v.reports?.push(item);
                eleOriginArr.splice(i, 1)
            }
  
        })
    });
    return eleOriginArr
  }
  