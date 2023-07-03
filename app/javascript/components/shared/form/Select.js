import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";

// this is wrapper around the react-select library. Not 100% needed but aligns with the rest of our custom inputs
function CustomSelect({ value, setValue, options, ...props }) {
  return (
    <Select
      options={options}
      onChange={(option) => setValue(option.value)}
      {...props}
    />
  );
}

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
