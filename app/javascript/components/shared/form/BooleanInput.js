import React from "react";
import PropTypes from "prop-types";

function BooleanInput({ keyPrefix, value, setValue }) {
  return (
    <fieldset>
      <div>
        <input
          type="radio"
          id={`${keyPrefix}-true`}
          value="true"
          name={`${keyPrefix}-booleanSelect`}
          checked={value}
          onChange={() => {
            setValue(true);
          }}
        />
        <label htmlFor={`${keyPrefix}-true`}>True</label>
      </div>
      <div>
        <input
          type="radio"
          id={`${keyPrefix}-false`}
          name={`${keyPrefix}-booleanSelect`}
          value="false"
          checked={!value}
          onChange={() => {
            setValue(false);
          }}
        />
        <label htmlFor={`${keyPrefix}-false`}>False</label>
      </div>
    </fieldset>
  );
}

BooleanInput.propTypes = {
  keyPrefix: PropTypes.string.isRequired,
  value: PropTypes.string,
  setValue: PropTypes.func.isRequired,
};

export default BooleanInput;
