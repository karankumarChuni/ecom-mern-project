import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { NotificationManager } from "react-notifications"; // Import NotificationManager
import { tokenstore } from "../../Localstorage/Store";
import { Registerform } from "./Validation/Registerform";
import { usePostCreateUserMutation } from "../../store/api/userapi";
import "react-notifications/lib/notifications.css"; // Import the CSS for notifications

const Registersection = () => {
  const nvg = useNavigate();

  const [createuser] = usePostCreateUserMutation();
  // registerform register form start here
  const registerform = async (value, setFieldError) => {
    try {
      const response = await createuser(value);
      if (response.data.status === "sucessful") {
        tokenstore(response.data.token);
        // Show success notification with "Register Successful"
        NotificationManager.success("Register Successful");
        // Navigate to login page after a slight delay
        setTimeout(() => {
          nvg("/login");
          window.location.reload();
        }, 2000);
      } else {
        if (response.data.errors.keyValue?.email) {
          setFieldError(
            "email",
            "Email is already registered. Please use a different email."
          );
        }
        if (response.data.errors.keyValue?.mobile) {
          setFieldError(
            "mobile",
            "Mobile.No is already registered. Please use a different Number."
          );
        }
      }
    } catch (error) {
      console.error("Error during registration:", error);
      NotificationManager.error(
        "An error occurred during registration. Please try again."
      );
    }
  };
  // registerform register form end here

  return (
    <div className="album py-1">
      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          email: "",
          mobile: "",
          password: "",
          dob: null,
        }}
        validationSchema={Registerform}
        onSubmit={(values, { setFieldError }) => {
          registerform(values, setFieldError);
        }}
      >
        {({ values, errors, handleSubmit, touched }) => (
          <Form
            autoComplete="off"
            className="form-login"
            onSubmit={handleSubmit}
          >
            <label htmlFor="text" style={{ margin: "0px 0px 0px 0px" }}>
              First Name
            </label>
            <div className="log-sendotp">
              <Field
                type="text"
                name="first_name"
                className="login-input mb-0"
                placeholder="Enter your First Name"
                value={values.first_name}
              />
            </div>
            <span style={{ display: "block", marginBottom: "20px" }}>
              {errors.first_name && touched.first_name ? (
                <p style={{ color: "red" }}>{errors.first_name}</p>
              ) : null}
            </span>
            <label htmlFor="text" style={{ margin: "0px 0px 0px 0px" }}>
              Last Name
            </label>
            <div className="log-sendotp">
              <Field
                type="text"
                name="last_name"
                className="login-input mb-0"
                placeholder="Enter your Last Name"
                value={values.last_name}
              />
            </div>
            <span style={{ display: "block", marginBottom: "20px" }}>
              {errors.last_name && touched.last_name ? (
                <p style={{ color: "red" }}>{errors.last_name}</p>
              ) : null}
            </span>
            <label htmlFor="text" style={{ margin: "12px 0px 0px 0px" }}>
              Mobile No.
            </label>
            <div className="log-sendotp">
              <Field
                type="number"
                name="mobile"
                className="login-input mb-0"
                placeholder="Enter your Mobile No"
                value={values.mobile}
              />
            </div>
            <span style={{ display: "block", marginBottom: "20px" }}>
              {errors.mobile && touched.mobile ? (
                <p style={{ color: "red" }}>{errors.mobile}</p>
              ) : null}
            </span>
            <label htmlFor="text" style={{ margin: "12px 0px 0px 0px" }}>
              Email
            </label>
            <div className="log-sendotp">
              <Field
                type="email"
                name="email"
                className="login-input mb-0"
                placeholder="Enter your Email No"
                value={values.email}
              />
            </div>
            <span style={{ display: "block", marginBottom: "20px" }}>
              {errors.email && touched.email ? (
                <p style={{ color: "red" }}>{errors.email}</p>
              ) : null}
            </span>
            <label htmlFor="text" style={{ margin: "12px 0px 0px 0px" }}>
              Date of Birth
            </label>
            <div className="log-sendotp">
              <Field
                type="date"
                name="dob"
                className="login-input mb-0"
                placeholder="Enter your DOB"
                value={values.dob}
              />
            </div>
            <span style={{ display: "block", marginBottom: "20px" }}>
              {errors.dob && touched.dob ? (
                <p style={{ color: "red" }}>{errors.dob}</p>
              ) : null}
            </span>
            <label htmlFor="text" style={{ margin: "12px 0px 0px 0px" }}>
              Password
            </label>
            <Field
              type="password"
              name="password"
              className="login-input mb-0"
              placeholder="Enter your password"
              value={values.password}
            />
            <span style={{ display: "block", marginBottom: "20px" }}>
              {errors.password && touched.password ? (
                <p style={{ color: "red" }}>{errors.password}</p>
              ) : null}
            </span>
            <button type="submit" className="btn" id="myForm">
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Registersection;
