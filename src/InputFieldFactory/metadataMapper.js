import metaData from "../data/entityMeta.json";

const fields = metaData.field;
const getMetaDataForKey = (key) => {
  return fields.find((obj) => obj.name === key);
};

export default getMetaDataForKey;
