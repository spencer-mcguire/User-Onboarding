import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

const UserForm = ({ values, errors, touched, status }) => {
  return (
    <div className="user-form">
      <Form>
        <label>
          User-Name
          <Field type="text" name="username" />
        </label>
        <label>
          Email
          <Field type="email" name="email" />
        </label>
        <label>
          Password
          <Field type="password" name="password" />
        </label>
        <label>
          Terms of Service
          <Field type="checkbox" name="terms" checked={values.terms} />
        </label>
        <button type="submit">Sign Up</button>
      </Form>
    </div>
  );
};

const SignUpForm = withFormik({
  mapPropsToValues({ username, email, password, terms }) {
    return {
      username: username || "",
      email: email || "",
      password: password || "",
      terms: terms || false
    };
  },
  validationSchema: Yup.object().shape({
    username: Yup.string().required(),
    email: Yup.string().required(),
    password: Yup.string().required(),
    terms: Yup.boolean().required()
  })
})(UserForm);

export default SignUpForm;

// name email pass terms check submit
