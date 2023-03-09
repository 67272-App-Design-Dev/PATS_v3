import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const StringInput = ({ value, setValue }) => {
  const onChange = (event) => {
    setValue(event.target.value);
  };
  return <input type="text" value={value} onChange={onChange} />;
};

const NumberInput = ({ value, setValue }) => {
  // TODO: what kind of validation should we have here?
  const onChange = (event) => {
    setValue(event.target.value);
  };
  return <input type="number" value={value} onChange={onChange} />;
};

const Select = ({ value, setValue, options }) => {
  return (
    <select>
      {options.map(({ label, value }) => {
        return (
          <option
            key={label}
            value={value}
            onSelect={() => {
              setValue(value);
            }}
          >
            {label}
          </option>
        );
      })}
    </select>
  );
};

const BooleanInput = ({ nameKey, value, setValue }) => {
  return (
    <fieldset>
      <div>
        <input
          type="radio"
          id={`${nameKey}-true`}
          value="true"
          name={`${nameKey}-booleanSelect`}
          checked={value}
          onChange={() => {
            setValue(true);
          }}
        />
        <label htmlFor={`${nameKey}-true`}>True</label>
      </div>
      <div>
        <input
          type="radio"
          id={`${nameKey}-false`}
          name={`${nameKey}-booleanSelect`}
          value="false"
          checked={!value}
          onChange={() => {
            setValue(false);
          }}
        />
        <label htmlFor={`${nameKey}-false`}>False</label>
      </div>
    </fieldset>
  );
};

const ATTRIBUTE_TO_LABEL = {
  name: {
    label: "Name",
    Component: StringInput,
  },
  description: {
    label: "Description",
    Component: StringInput,
  },
  stock_amount: {
    label: "Stock Amount",
    Component: NumberInput,
  },
  admin_method: {
    label: "Administration Method",
    Component: Select,
    props: {
      options: [
        {
          label: "Oral",
          value: 1,
        },
        {
          label: "Injection",
          value: 2,
        },
        {
          label: "Intravenous",
          value: 3,
        },
        {
          label: "Topical",
          value: 4,
        },
      ],
    },
  },
  unit: {
    label: "Unit",
    Component: StringInput,
  },
  vaccine: {
    label: "Is Vaccine",
    Component: BooleanInput,
    props: {
      nameKey: "vaccine",
    },
  },
  active: {
    label: "Is Active",
    Component: BooleanInput,
    props: {
      nameKey: "active",
    },
  },
};

const MedicineEditor = ({ medicine }) => {
  const [editedMedicine, setEditedMedicine] = useState(medicine);

  const onSubmit = () => {
    console.log(editedMedicine);
    alert("submitted!");
    // id isn't a valid param
    const { id, ...params } = editedMedicine;
    const url = `/medicines/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ medicine: params }),
    }).then((response) => {
      console.log(response.json());
    });
  };

  return (
    <div>
      {Object.keys(ATTRIBUTE_TO_LABEL).map((key) => {
        const { label, Component, props } = ATTRIBUTE_TO_LABEL[key];
        const value = editedMedicine[key];
        return (
          <div key={key}>
            <label>{label}</label>
            <Component
              value={value}
              setValue={(newValue) => {
                setEditedMedicine({
                  ...editedMedicine,
                  [key]: newValue,
                });
              }}
              // provide any other additional props to the component
              {...props}
            />
          </div>
        );
      })}
      <button type="button" onClick={onSubmit}>
        Update Medicine
      </button>
    </div>
  );
};

MedicineEditor.propTypes = {
  greeting: PropTypes.string,
};
export default MedicineEditor;
