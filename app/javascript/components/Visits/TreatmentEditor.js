import React, { useEffect, useState } from "react";
import { get, post } from "../../api";
import NumberInput from "../shared/form/NumberInput";
import BooleanInput from "../shared/form/BooleanInput";
import Select from "../shared/form/Select";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";

const TreatmentEditor = ({ visit, onCreateTreatment }) => {
  const [procedureOptions, setProcedureOptions] = useState([]);
  const [loading, setLoading] = useState();
  const [procedure, setProcedure] = useState();
  const [successful, setSuccessful] = useState();
  const [discount, setDiscount] = useState();

  // useEffect will trigger any time the dependency array (second argument) changes.
  // in this case, the dependency array is empty, so it will only fire on load
  useEffect(() => {
    setLoading(true);
    get(`/v1/visits/${visit.id}/procedures`).then((data) => {
      setLoading(false);
      setProcedureOptions(
        data.procedures.map((proc) => {
          return {
            label: proc.name,
            value: proc.id,
          };
        })
      );
    });
  }, []);

  function createTreatment() {
    post(`/v1/visits/${visit.id}/create_treatment`, {
      treatment: {
        procedure_id: procedure,
        // syntactic sugar for "successful: successful"
        successful,
        discount: isEmpty(discount) ? 0 : discount,
      },
    }).then((data) => {
      if (data.errors) {
        console.log(data.errors);
      } else {
        // { data: { attributes: <the treatment> }}
        onCreateTreatment(data.data.attributes);
      }
    });
  }

  if (loading || procedureOptions?.length === 0) {
    return <div>loading...</div>;
  }

  return (
    <>
      <label>Procedure</label>
      <Select setValue={setProcedure} options={procedureOptions} />
      <label>Successful</label>
      <BooleanInput
        value={successful}
        setValue={setSuccessful}
        keyPrefix={`treatment-${visit.id}`}
      />
      <label>Discount</label>
      <NumberInput value={discount} setValue={setDiscount} />
      <button onClick={createTreatment}>Create</button>
    </>
  );
};

TreatmentEditor.propTypes = {
  visit: PropTypes.object.isRequired,
  onCreateTreatment: PropTypes.func.isRequired,
};

export default TreatmentEditor;
