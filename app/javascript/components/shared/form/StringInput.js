import React from "react";
import PropTypes from "prop-types";

function StringInput({ value, setValue }) {
  function onChange(event) {
    setValue(event.target.value);
  }
  return <input type="text" value={value} onChange={onChange} />;
}

StringInput.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func.isRequired,
};

export default StringInput;
