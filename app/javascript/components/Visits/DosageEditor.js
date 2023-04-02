import React, { useEffect, useState } from "react";
import { get, post } from "../../api";
import NumberInput from "../shared/form/NumberInput";
import PropTypes from "prop-types";
import Select from "../shared/form/Select";

const DosageEditor = ({ visit, onCreateDosage }) => {
  const [medicineOptions, setMedicineOptions] = useState([]);
  const [loading, setLoading] = useState();
  const [medicine, setMedicine] = useState();
  const [unitsGiven, setUnitsGiven] = useState();
  const [discount, setDiscount] = useState();

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

  const createDosage = () => {
    post(`/v1/visits/${visit.id}/create_dosage`, {
      dosage: {
        medicine_id: medicine,
        units_given: unitsGiven,
        discount,
      },
    }).then((data) => {
      console.log(data);
      if (data.errors) {
        console.log(data.errors);
      } else {
        onCreateDosage(data);
      }
    });
  };

  if (loading || medicineOptions?.length === 0) {
    return <div>loading..</div>;
  }

  return (
    <>
      <label>Medicine</label>
      <Select setValue={setMedicine} options={medicineOptions} />
      <label>Units Given</label>
      <NumberInput value={unitsGiven} setValue={setUnitsGiven} />
      <label>Discount</label>
      <NumberInput value={discount} setValue={setDiscount} />
      <button onClick={createDosage}>Create</button>
    </>
  );
};

DosageEditor.propTypes = {
  visit: PropTypes.object.isRequired,
  onCreateDosage: PropTypes.func.isRequired,
};

export default DosageEditor;
