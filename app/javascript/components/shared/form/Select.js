import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";

// TODO: document
const CustomSelect = ({ value, setValue, options }) => {
  return (
    <Select options={options} onChange={(option) => setValue(option.value)} />
  );
};

CustomSelect.propTypes = {
  value: PropTypes.any,
  setValue: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
    })
  ).isRequired,
};

export default CustomSelect;
