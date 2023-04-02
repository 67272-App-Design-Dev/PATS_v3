import React, { useState } from "react";
import { destroy } from "../../api";
import Treatment from "./Treatment";
import TreatmentEditor from "./TreatmentEditor";
import PropTypes from "prop-types";

const VisitsSection = ({ visit, initialTreatments }) => {
  // initializes `treatments` to `initialTreatments` so we can edit that list
  const [treatments, setTreatments] = useState(
    initialTreatments.map((treatmentData) => {
      return treatmentData.data.attributes;
    })
  );
  const [isEditing, setIsEditing] = useState(false);

  const removeTreatmentFromDisplay = (treatment) => {
    setTreatments(
      treatments.filter((otherTreatment) => otherTreatment.id !== treatment.id)
    );
  };

  const addTreatmentToDisplay = (treatment) => {
    setTreatments(treatments.concat(treatment));
  };

  const deleteTreatment = (treatment) => {
    if (treatment.id) {
      const url = `/v1/visits/${visit.id}/treatments/${treatment.id}`;
      destroy(url).then((data) => {
        // in the real world, you'd have a .catch block
        // to handle errors, but here we will simply check
        // the response json for an `errors` key
        if (data.errors) {
          alert(`Failed: ${data.errors}`);
        } else {
          // filter out the deleted treatment from the displayed list
          removeTreatmentFromDisplay(treatment);
        }
      });
    } else {
      removeTreatmentFromDisplay(treatment);
    }
  };

  return (
    <>
      <h4>Treatments Given</h4>
      {treatments.map((treatment, i) => {
        return (
          <Treatment
            key={`treatment-${i}-${treatment.id}`}
            treatment={treatment}
            onDelete={deleteTreatment}
          />
        );
      })}
      <button onClick={() => setIsEditing(true)}>Create New Treatment</button>
      {isEditing && (
        <TreatmentEditor
          visit={visit}
          onCreateTreatment={(treatment) => {
            addTreatmentToDisplay(treatment);
            setIsEditing(false);
          }}
        />
      )}
    </>
  );
};

VisitsSection.propTypes = {
  visit: PropTypes.object.isRequired,
  initialTreatments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default VisitsSection;
