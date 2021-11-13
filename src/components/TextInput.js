import React, { forwardRef } from "react";

const TextInput = forwardRef(function TextInput(
  {
    type = "text",
    name,
    id,
    label,
    placeholder = false,
    ariaLabel = false,
    errors = {},
    ...rest
  },
  ref
) {
  const generateLabel = () => {
    return label && type !== "hidden" ? (
      <label className="input-label" htmlFor={name} data-testid={`label-${id}`}>
        {label}
      </label>
    ) : null;
  };

  return (
    <>
      {generateLabel()}
      <input
        className="text-input"
        type={type}
        name={name}
        id={id}
        placeholder={placeholder ? placeholder : null}
        aria-invalid={errors[name]?.message ? "true" : "false"}
        aria-label={ariaLabel ? ariaLabel : null}
        ref={ref}
        data-testid={`input-${id}`}
        {...rest}
      />
      {errors && errors[name]?.message && (
        <p className="error-message">{errors && errors[name]?.message}</p>
      )}
    </>
  );
});

export default TextInput;
