import React, { useState } from "react";
import { destroy } from "../../api";
import Dosage from "./Dosage";
import DosageEditor from "./DosageEditor";
import PropTypes from "prop-types";

const DosagesSection = ({ visit, initialDosages }) => {
  // initializes `dosages` to `initialDosages` so we can edit that list
  const [dosages, setDosages] = useState(initialDosages);
  const [isEditing, setIsEditing] = useState(false);

  const removeDosageFromDisplay = (dosage) => {
    setDosages(dosages.filter((otherDosage) => otherDosage.id !== dosage.id));
  };

  const addDosageToDisplay = (dosage) => {
    setDosages(dosages.concat(dosage));
  };

  const deleteDosage = (dosage) => {
    if (dosage.id) {
      const url = `/v1/visits/${visit.id}/dosages/${dosage.id}`;
      destroy(url).then((data) => {
        // in the real world, you'd have a .catch block
        // to handle errors, but here we will simply check
        // the response json for an `errors` key
        if (data.errors) {
          alert(`Failed: ${data.errors}`);
        } else {
          // filter out the deletedDosage from the displayed list
          removeDosageFromDisplay(dosage);
        }
      });
    } else {
      removeDosageFromDisplay(dosage);
    }
  };

  return (
    <>
      <h4>Dosages</h4>
      {dosages.map((dosage, i) => {
        return (
          <Dosage
            key={`dosage-${i}-${dosage.id}`}
            dosage={dosage}
            onDelete={deleteDosage}
          />
        );
      })}
      <button onClick={() => setIsEditing(true)}>Create New Dosage</button>
      {isEditing && (
        <DosageEditor
          visit={visit}
          onCreateDosage={(dosage) => {
            addDosageToDisplay(dosage);
            setIsEditing(false);
          }}
        />
      )}
    </>
  );
};

DosagesSection.propTypes = {
  visit: PropTypes.object.isRequired,
  initialDosages: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DosagesSection;
