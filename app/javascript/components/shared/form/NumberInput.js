import React from "react";
import PropTypes from "prop-types";

const NumberInput = ({ value, setValue }) => {
  // TODO: what kind of validation should we have here?
  const onChange = (event) => {
    setValue(event.target.value);
  };
  return <input type="number" value={value} onChange={onChange} />;
};

NumberInput.propTypes = {
  value: PropTypes.any,
  setValue: PropTypes.func.isRequired,
};

export default NumberInput;
