export interface DataSourceType {
  value: object | number | string;
  onInit?: () => void;
}

// layer data pool
const realDataMap: { [T in symbol]: { value: number | string | object } } = {};
const getRealData = (layerid: symbol) => {
  return realDataMap[layerid];
};
const setRealData = (
  layerid: symbol,
  value: { value: number | string | object }
) => {
  realDataMap[layerid] = value;
  console.log('realdata has been set: ', value);
};
const removeRealData = (layerid: symbol) => {
  delete realDataMap[layerid];
};

// 闭包实现VirtualData单例Map
const registVirtualData = (() => {
  const virtualDataMap: { [T in symbol]: { value: number | string | object } } =
    {};
  return (layerid: symbol, originData: { value: number | string | object }) => {
    if (!virtualDataMap[layerid]) {
      virtualDataMap[layerid] = originData;
      setTimeout(() => {
        setRealData(layerid, virtualDataMap[layerid]);
        delete virtualDataMap[layerid];
      }, 30);
    }
    return virtualDataMap[layerid];
  };
})();

const createDataSourceProxy = (
  layerid: symbol,
  dataSource?: DataSourceType
) => {
  if (dataSource?.value !== undefined) {
    setRealData(layerid, { value: dataSource.value });
    const proxy = new Proxy(getRealData(layerid), {
      set: (obj, prop, value) => {
        if (prop === "value") {
          const virtualData = registVirtualData(layerid, getRealData(layerid));
          virtualData.value = value;
        }
        return true;
      },
    });
    return proxy;
  }
};

export { createDataSourceProxy };
