import React from "react";
import Loadercomp from "../../../components/Loadercomp";
import { Field, Form, Formik } from "formik";
import { Categoryvalidationedit } from "../Validation/Categoryvalidationedit";
import {
  useGetSingleUserQuery,
  usePatchUserMutation,
} from "../../../store/api/userapi";
import { useNavigate } from "react-router-dom";

const Edituserform = ({ id }) => {
  const nvg = useNavigate();
  const { data, isLoading } = useGetSingleUserQuery(id);
  const [patchuser] = usePatchUserMutation();

  // Reusable Field Component
  const FormField = ({ label, name, type = "text", placeholder }) => (
    <div className="col-md-6 px-2 pt-3">
      <div className="row">
        <div className="col-lg-4">
          <label htmlFor={name} className="form-label">
            {label} <span style={{ color: "red" }}>*</span>
          </label>
        </div>
        <div className="col-lg-8">
          <Field
            name={name}
            type={type}
            className="form-control"
            placeholder={placeholder}
          />
        </div>
        <div className="offset-lg-4 col-lg-8">
          <FieldError name={name} />
        </div>
      </div>
    </div>
  );

  // Error Display Component
  const FieldError = ({ name }) => (
    <Field name={name}>
      {({ meta: { touched, error } }) =>
        touched && error ? <p style={{ color: "red" }}>{error}</p> : null
      }
    </Field>
  );

  const handleSubmit = async (values) => {
    const formdata = new FormData();
    Object.keys(values).forEach((key) => formdata.append(key, values[key]));

    try {
      const response = await patchuser({ data: formdata, id });
      if (!response.error) {
        nvg("/userlist/2");
      } else {
        console.error("Failed to update user:", response.error.error);
      }
    } catch (error) {
      console.error("Unexpected error during submission:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="container-fluid bg-white">
        <div
          className="col-12 d-flex justify-content-center"
          style={{ gap: "4px", position: "absolute", width: "100%" }}
        >
          <Loadercomp size={100} />
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid pb-4 pt-3 px-2 bg-white">
      <Formik
        initialValues={{
          first_name: data?.data?.first_name || "",
          last_name: data?.data?.last_name || "",
          email: data?.data?.email || "",
          mobile: data?.data?.mobile || "",
          address: data?.data?.address || "",
          country: data?.data?.country || "",
          state: data?.data?.state || "",
          city: data?.data?.city || "",
          pincode: data?.data?.pincode || "",
          status: data?.data?.status || "",
          type: data?.data?.isAdmin || "",
        }}
        validationSchema={Categoryvalidationedit}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form autoComplete="off">
            <div
              className="row bg-white pb-4 round"
              style={{
                border: "1px solid #E0E0E0",
                margin: "10px 0px",
                borderRadius: "3px",
                position: "relative",
              }}
            >
              <FormField
                label="First Name"
                name="first_name"
                placeholder="First Name"
              />
              <FormField
                label="Last Name"
                name="last_name"
                placeholder="Last Name"
              />
              <FormField
                label="Email ID"
                name="email"
                placeholder="Email ID"
                type="email"
              />
              <FormField
                label="Mobile No."
                name="mobile"
                placeholder="Mobile No."
              />
              <FormField label="Address" name="address" placeholder="Address" />
              <FormField label="Country" name="country" placeholder="Country" />
              <FormField label="State" name="state" placeholder="State" />
              <FormField label="City" name="city" placeholder="City" />
              <FormField label="Pincode" name="pincode" placeholder="Pincode" />

              <div className="col-md-6 px-2 pt-3">
                <div className="row">
                  <div className="col-lg-4">
                    <label htmlFor="status" className="form-label">
                      User Status <span style={{ color: "red" }}>*</span>
                    </label>
                  </div>
                  <div className="col-lg-8">
                    <Field as="select" name="status" className="form-select">
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </Field>
                  </div>
                  <div className="offset-lg-4 col-lg-8">
                    <FieldError name="status" />
                  </div>
                </div>
              </div>

              <div className="col-md-6 px-2 pt-3">
                <div className="row">
                  <div className="col-lg-4">
                    <label htmlFor="type" className="form-label">
                      Type <span style={{ color: "red" }}>*</span>
                    </label>
                  </div>
                  <div className="col-lg-8">
                    <Field as="select" name="type" className="form-select">
                      <option value="Admin">Admin</option>
                      <option value="User">User</option>
                    </Field>
                  </div>
                  <div className="offset-lg-4 col-lg-8">
                    <FieldError name="type" />
                  </div>
                </div>
              </div>

              <div
                className="col-12 py-5 px-4 d-flex justify-content-end"
                style={{ gap: "4px" }}
              >
                <button type="button" className="btn4" onClick={() => nvg(-1)}>
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn5"
                  style={{ background: "#0e5da9" }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Edituserform;
