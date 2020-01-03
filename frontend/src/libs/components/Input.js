// @flow
import * as React from "react";

type InputType = $ReadOnly<{|
  id: string,
  type?: string,
  placeholder?: string,
  required?: boolean,
  autoComplete?: string,
  setInputData: Function,
  validator?: Function
|}>;

export default function Input(props: InputType): React.Node {
  const {
    id,
    type,
    placeholder,
    required,
    autoComplete,
    setInputData,
    validator
  } = props;

  const [value, setValue] = React.useState({ id: id, value: "" });
  const [error, setError] = React.useState("");

  const setNewValue = (newValue: Object) => {
    setValue(Object.assign({}, value, newValue));
  };

  const handleChange = (event: { target: { id: string, value: string } }) => {
    setNewValue({ value: event.target.value, id: event.target.id });
  };

  const validateInput = () => {
    if (!Boolean(validator)) {
      setInputData(value, false);
    } else {
      const [errorText, hasError] = validator(value.value);
      setError(errorText);
      setInputData(value, hasError);
    }
  };

  return (
    <React.Fragment>
      <input
        id={id}
        type={type || "text"}
        placeholder={placeholder || "Input..."}
        required={required || false}
        autoComplete={autoComplete || "Off"}
        value={value.value}
        onChange={handleChange}
        onBlur={validateInput}
      />
      {error && <p>{error}</p>}
    </React.Fragment>
  );
}