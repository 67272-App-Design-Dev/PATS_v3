import React from "react";
import PropTypes from "prop-types";

function Treatment({ treatment, onDelete }) {
  return (
    <>
      <p>
        <a onClick={() => onDelete(treatment)}>x</a>{" "}
        <a
          onClick={() =>
            (window.location = `/procedures/${treatment.procedure.id}`)
          }
        >
          {treatment.procedure.name}
        </a>
      </p>
    </>
  );
}

Treatment.propTypes = {
  treatment: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Treatment;
