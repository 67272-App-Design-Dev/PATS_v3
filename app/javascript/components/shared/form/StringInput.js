import React from "react";
import PropTypes from "prop-types";

const StringInput = ({ value, setValue }) => {
  const onChange = (event) => {
    setValue(event.target.value);
  };
  return <input type="text" value={value} onChange={onChange} />;
};

StringInput.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func.isRequired,
};

export default StringInput;
