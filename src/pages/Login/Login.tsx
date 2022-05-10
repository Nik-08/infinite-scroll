import { Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import * as yup from "yup";

import { login } from "../../store/action/login";
import { selectors } from "../../store/selectors";
import css from "./styles.module.scss";

const validationSchema = yup.object().shape({
  login: yup.string().required(),
  password: yup.string().min(5).max(25).required(),
});

interface FormState {
  login: string;
  password: string;
}

const initialValues: FormState = {
  login: "",
  password: "",
};

export const Login: React.FC = () => {
  const dispatch = useDispatch();
  const isAutorised = useSelector(selectors.isAutorised);
  const errorMessage = useSelector(selectors.errorMessage);

  if (isAutorised) {
    return <Navigate to={"/"} />;
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        dispatch(login(values));
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <div className={css.registration__container}>
          <div className={css.registration__title}>Sign In</div>
          <form
            onSubmit={handleSubmit}
            action=""
            className={css.registration__form}
          >
            <input
              className={css.form__input}
              placeholder="Email"
              required
              type="text"
              name="login"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.login}
            ></input>
            <p className={css.registration__error}>
              {errors.login && touched.login && errors.login}
            </p>
            <input
              className={css.form__input}
              placeholder="Password"
              required
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            ></input>
            <p className={css.registration__error}>
              {errors.password && touched.password && errors.password}
            </p>
            <button
              type="submit"
              disabled={Boolean(Object.values(errors).length)}
              className={css.form__btn}
            >
              Log In
            </button>
          </form>
          {errorMessage ? (
            <p className={css.registration__error}>{errorMessage}</p>
          ) : null}
        </div>
      )}
    </Formik>
  );
};
