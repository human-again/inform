import TextInput from "../components/TextInput";
import getMetaDataForKey from "./metadataMapper";
import moment from "moment";

const defaultLen = 10;

const InputFieldFactory = (key, data, register, errors) => {
  //console.log("key :", key, "Meta >", getMetaDataForKey(key));
  const metaData = getMetaDataForKey(key);

  if (metaData) {
    if (metaData.system) {
      return getTextInputField("hidden", metaData, data, register, errors);
    }
    switch (metaData.dataType) {
      case "String":
        return getTextInputField("text", metaData, data, register, errors);
      case "Number":
      case "Integer":
      case "Decimal":
        return getTextInputField("number", metaData, data, register, errors);
      case "Date":
        return (
          <>
            <label className="input-label" htmlFor={metaData.name}>
              {metaData.label}
            </label>
            <input
              name={metaData.name}
              id={metaData.name}
              defaultValue={moment(data.trim()).format("YYYY-MM-DD")}
              type="date"
              {...register(metaData.name, { maxLength: metaData.length })}
            />
          </>
        );
      case "lookup":
        // requirements unknown
        return <></>;
      default:
        return (
          <TextInput
            name={key}
            id={key}
            label={key}
            {...register(metaData.key)}
            defaultValue={data.trim()}
          />
        );
    }
  } else {
    //console.log("No metadata found for key > ", key);
  }
};

const getTextInputField = (type, metaInfo, value, register, errors) => {
  return (
    <TextInput
      name={metaInfo.name}
      id={metaInfo.name}
      label={metaInfo.label}
      type={type}
      errors={errors}
      defaultValue={value.trim()}
      {...register(metaInfo.name, { maxLength: metaInfo.length || defaultLen })}
    />
  );
};

export default InputFieldFactory;
