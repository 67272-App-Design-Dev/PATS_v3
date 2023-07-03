import React from "react";
import PropTypes from "prop-types";

function NumberInput({ value, setValue, ...props }) {
  // TODO: we should probably have numeric validation here :)
  function onChange(event) {
    setValue(event.target.value);
  }
  return <input type="number" value={value} onChange={onChange} {...props} />;
}

NumberInput.propTypes = {
  value: PropTypes.any,
  setValue: PropTypes.func.isRequired,
};

export default NumberInput;
