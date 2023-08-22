import React, { useState } from 'react';
import { Checkbox, FormControlLabel, Button } from '@mui/material';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField } from '@mui/material';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  age: Yup.number().required('Age is required'),
  phoneNumber: Yup.string().when('age', {
    is: (age) => age >= 18,
    then: Yup.string().matches(/^\d{10}$/, 'Invalid phone number').required('Phone number is required'),
  }),
});

const FamilyMemberForm = ({ index, onSubmit }) => {
  return (
    <Formik
      initialValues={{
        name: '',
        age: '',
        phoneNumber: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => onSubmit(index, values)}
    >
      <div>
        <Field
          as={TextField}
          name={`familyMembers.${index}.name`}
          label="Name"
          fullWidth
        />
        <ErrorMessage name={`familyMembers.${index}.name`} />
      </div>
      <div>
        <Field
          as={TextField}
          name={`familyMembers.${index}.age`}
          type="number"
          label="Age"
          fullWidth
        />
        <ErrorMessage name={`familyMembers.${index}.age`} />
      </div>
      <div>
        <Field
          as={TextField}
          name={`familyMembers.${index}.phoneNumber`}
          label="Phone Number"
          fullWidth
        />
        <ErrorMessage name={`familyMembers.${index}.phoneNumber`} />
      </div>
      <Button type="submit" variant="outlined" color="primary">
        Save
      </Button>
    </Formik>
  );
};

const FamilyMembers = ({ onAddFamilyMember }) => {
  const [addFamilyMembers, setAddFamilyMembers] = useState(false);
  const [familyMembers, setFamilyMembers] = useState([]);

  const handleCheckboxChange = (event) => {
    setAddFamilyMembers(event.target.checked);
  };

  const handleFamilyMemberSubmit = (index, values) => {
    setFamilyMembers((prevFamilyMembers) => {
      const updatedFamilyMembers = [...prevFamilyMembers];
      updatedFamilyMembers[index] = values;
      return updatedFamilyMembers;
    });
  };

  const handleAddFamilyMember = () => {
    if (familyMembers.length < 5) {
      setFamilyMembers([...familyMembers, {}]);
    }
  };

  const handleRemoveFamilyMember = (index) => {
    setFamilyMembers((prevFamilyMembers) => {
      const updatedFamilyMembers = [...prevFamilyMembers];
      updatedFamilyMembers.splice(index, 1);
      return updatedFamilyMembers;
    });
  };

  return (
    <div>
      <FormControlLabel
        control={<Checkbox checked={addFamilyMembers} onChange={handleCheckboxChange} />}
        label="Add Family Members"
      />
      {addFamilyMembers &&
        familyMembers.map((_, index) => (
          <div key={index}>
            <FamilyMemberForm index={index} onSubmit={handleFamilyMemberSubmit} />
            {index > 0 && (
              <Button onClick={() => handleRemoveFamilyMember(index)} variant="outlined">
                Remove Family Member
              </Button>
            )}
          </div>
        ))}
      {familyMembers.length < 5 && addFamilyMembers && (
        <Button onClick={handleAddFamilyMember} variant="outlined" color="secondary">
          Add Another Family Member
        </Button>
      )}
    </div>
  );
};

export default FamilyMembers;
