import React, { useEffect, useState } from "react";
import { get, post } from "../../api";
import NumberInput from "../shared/form/NumberInput";
import PropTypes from "prop-types";
import Select from "../shared/form/Select";
import { isEmpty } from "lodash";

function DosageEditor({ visit, onCreateDosage }) {
  const [medicineOptions, setMedicineOptions] = useState([]);
  const [loading, setLoading] = useState();
  const [medicine, setMedicine] = useState();
  const [unitsGiven, setUnitsGiven] = useState("");
  const [discount, setDiscount] = useState("");
  const [animating, setAnimating] = useState(false);

  // useEffect will trigger any time the dependency array (second argument) changes.
  // in this case, the dependency array is empty, so it will only fire on load
  useEffect(() => {
    setLoading(true);
    get(`/v1/visits/${visit.id}/medicines`).then((data) => {
      setLoading(false);
      setMedicineOptions(
        data.medicines.map((med) => {
          return {
            label: med.name,
            value: med.id,
          };
        })
      );
    });
  }, []);

  function createDosage() {
    setAnimating(true);
    post(`/v1/visits/${visit.id}/create_dosage`, {
      dosage: {
        medicine_id: medicine,
        units_given: unitsGiven,
        discount: isEmpty(discount) ? 0 : discount,
      },
    }).then((data) => {
      if (data.errors) {
        console.log(data.errors);
      } else {
        onCreateDosage(data);
      }
      setAnimating(false);
    });
  }

  if (loading || medicineOptions?.length === 0) {
    return <div>loading...</div>;
  }

  return (
    <>
      <label htmlFor="meds">Medicine</label>
      <Select
        name="meds"
        inputId="meds"
        setValue={setMedicine}
        options={medicineOptions}
      />
      <label htmlFor="units">Units Given</label>
      <NumberInput
        name="units"
        id="units"
        value={unitsGiven}
        setValue={setUnitsGiven}
      />
      <label htmlFor="discount">Discount</label>
      <NumberInput
        name="discount"
        id="discount"
        value={discount}
        setValue={setDiscount}
      />
      <button onClick={createDosage} disabled={animating}>
        Create
      </button>&nbsp;&nbsp;
    </>
  );
}

DosageEditor.propTypes = {
  visit: PropTypes.object.isRequired,
  onCreateDosage: PropTypes.func.isRequired,
};

export default DosageEditor;
