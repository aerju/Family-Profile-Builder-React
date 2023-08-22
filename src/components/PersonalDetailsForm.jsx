import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import "./PersonalDetailsForm.css";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string().required("Phone Number is required"),
  dob: Yup.string().required("Date of Birth is required"),
  members: Yup.array().of(
    Yup.object().shape({
      membername: Yup.string().required("Member Name is required"),
      memberage: Yup.number()
        .required("Member Age is required")
        .test("is-positive", "Age must be a positive number", (value) => {
          return value === undefined || (value !== null && value >= 0);
        }),
    })
  ),
  // showAddFamilyForm: Yup.boolean(),
});

const PersonalDetailsFrom = () => {

  const initialValues = {
    name: "",
    email: "",
    phoneNumber: "",
    dob: "",
    members: [{ membername: "", memberage: "" }],
  };

  const handleSubmit = (values) => {
    // Handle form submission here
    console.log(values);
  };



  const [showAddFamilyForm, setShowAddFamilyForm] = useState(false);
  const handleToggleAddFamilyForm = () => {
    setShowAddFamilyForm(!showAddFamilyForm);
  };

 

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "20px" }}>
        <div>
          <Typography variant="h6" gutterBottom>
            Personal Information
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, values }) => (
              <Form>
                <div>
                  <Field
                    as={TextField}
                    name="name"
                    label="Name"
                    error={errors.name && touched.name}
                    helperText={<ErrorMessage name="name" />}
                    fullWidth
                  />
                </div>
                <div>
                  <Field
                    as={TextField}
                    name="email"
                    label="Email"
                    error={errors.email && touched.email}
                    helperText={<ErrorMessage name="email" />}
                    fullWidth
                  />
                </div>
                <div>
                  <Field
                    as={TextField}
                    name="phoneNumber"
                    label="Phone Number"
                    error={errors.phoneNumber && touched.phoneNumber}
                    helperText={<ErrorMessage name="phoneNumber" />}
                    fullWidth
                  />
                </div>
                <div>
                  <Field
                    as={TextField}
                    name="dob"
                    // label="Date of Birth"
                    type="date"
                    error={errors.dob && touched.dob}
                    helperText={<ErrorMessage name="dob" />}
                    fullWidth
                  />
                </div>

                <div>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={showAddFamilyForm}
                        onChange={handleToggleAddFamilyForm}
                      />
                    }
                    label="Add Family Members"
                  />
                </div>

                {showAddFamilyForm && (
                  <FieldArray name="members">
                    {({ push, remove }) => (
                      <div>
                        {values.members.map((_, index) => (
                          <div key={index}>
                            <Field
                              name={`members[${index}].membername`}
                              label="Name"
                              component={TextField}
                            />
                            <Field
                              name={`members[${index}].memberage`}
                              label="Age"
                              component={TextField}
                            />
                            <Button type="button" onClick={() => remove(index)}>
                              Remove
                            </Button>
                          </div>
                        ))}
                        {values.members.length < 5 && (
                          <Button
                            type="button"
                            onClick={() =>
                              push({ membername: "", memberage: "" })
                            }
                          >
                            Add Member
                          </Button>
                        )}
                      </div>
                    )}
                  </FieldArray>
                )}
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </Paper>
    </Container>
  );
};

export default PersonalDetailsFrom;
