import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({ values, errors, touched, status }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    status && setData(data => [...data, status]);
  }, [status]);

  return (
    <>
      <div className="user-form">
        <h2>Sign Up</h2>
        <Form>
          <label>
            User-Name
            <Field type="text" name="username" className="input" />
          </label>
          {touched.username && errors.username && (
            <p className="errors">{errors.username}</p>
          )}
          <label>
            Email
            <Field type="email" name="email" className="input" />
          </label>
          {touched.email && errors.email && (
            <p className="errors">{errors.email}</p>
          )}
          <label>
            Password
            <Field type="password" name="password" className="input" />
          </label>
          {touched.password && errors.password && (
            <p className="errors">{errors.password}</p>
          )}
          <label>
            Terms of Service
            <Field
              type="checkbox"
              name="terms"
              checked={values.terms}
              className="input"
            />
          </label>
          {touched.terms && errors.terms && (
            <p className="errors">You need to accept our Terms of Service!</p>
          )}
          <button type="submit">Sign Up</button>
        </Form>
      </div>
      {data.map(a => (
        <div className="user-data" key={a.id}>
          <h2>{a.username}</h2>
          <p>Email: {a.email}</p>
          <p>Password: {a.password}</p>
          <p>Terms of Service: accepted </p>
        </div>
      ))}
    </>
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
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string()
      .min(8)
      .required(),
    terms: Yup.boolean()
      .oneOf([true])
      .required()
  }),
  handleSubmit(values, { setStatus, resetForm }) {
    axios
      .post("https://reqres.in/api/users", values)
      .then(res => {
        setStatus(res.data);
        console.log(res);
        resetForm({});
      })
      .catch(err => console.log(err.res))
      .finally();
  }
})(UserForm);

export default SignUpForm;

// name email pass terms check submit
