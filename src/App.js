import { useEffect, useState } from "react";
import "./App.css";
import data from "./data/entityData.json";
import InputFieldFactory from "./InputFieldFactory/InputFieldFactory";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";

export default function App() {
  const schema = yup
    .object()
    .shape({
      lastName: yup.string("Only string is allowed").required(),
      firstName: yup.string("Only string is allowed").required(),
      displayName: yup.string("Only string is allowed").required(),
      taxId: yup
        .number()
        .positive()
        .integer()
        .required()
        .max(999999999, "Maximum 9 digits"),
      generationSuffixCd: yup.string("Only string is allowed").required()
    })
    .required();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema) // implement validations here
  });
  const [originalFormValues, setOriginal] = useState(null);
  const [displayData, setDisplayData] = useState({});

  /*
   * Store intial values of form
   */
  useEffect(() => {
    setOriginal(getValues());
  }, [getValues]);

  /*
   * Submit the form
   */
  const onSubmit = (formData) => {
    const data = { $original: originalFormValues, ...formData };
    console.log("Submitting saved address formData >>>", data);
    setDisplayData(data);
  };

  return (
    <div className="App">
      <section id="form" className="form-section" >
        <form onSubmit={handleSubmit(onSubmit)} data-testid="form">
          {Object.keys(data).map((key, index) => {
            return (
              <div className="input-container" key={index}>
                {InputFieldFactory(key, data[key], register, errors)}
              </div>
            );
          })}
          <button type="submit">SAVE</button>
        </form>
        <br />
      </section>
      <section id="jsonView" className="json-view-section">
        <p>OUTPUT JSON</p>
        <JSONPretty data={displayData} />
      </section>
    </div>
  );
}
