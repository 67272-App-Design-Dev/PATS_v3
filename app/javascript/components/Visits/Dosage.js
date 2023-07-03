import React from "react";
import PropTypes from "prop-types";

function Dosage({ dosage, onDelete }) {
  return (
    <>
      <p>
        <a onClick={() => onDelete(dosage)}>x</a> {dosage.medicine_name}:{" "}
        {dosage.units_given} units
      </p>
    </>
  );
}

Dosage.propTypes = {
  dosage: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Dosage;
