import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { setIsLogin } from "../Redux/UserSlice";
import useAuth from "../Hooks/useAuth";
const Registration = () => {

  const {Register_Axios}= useAuth()

  const validationSchema = Yup.object().shape({
    username: Yup.string()
    .matches(/^(?!\s+$)[A-Za-z][A-Za-z0-9_ ]{2,}$/, "Invalid username format")
    .required("Username is required"),    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string()
    .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/, 
      "Password must be at least 8 characters, include an uppercase letter, a number, and a special character")
    .required("Password is required"),    
    con_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = (values,{ setSubmitting }) => {
    console.log("Signup Data:", values);
    Register_Axios(values,setSubmitting)
  };
  
  const dispatch = useDispatch()

  return (
    <div className="bg-transparent p-10 rounded-xl font-sans m-4 md:m-0 w-[400px]">
      <h1 className="text-4xl font-bold text-orange-400 text-center mb-6">
        Create Account
      </h1>
      <h4 className="text-xl font-semibold text-orange-400 text-center mb-4">
        Sign up to get started
      </h4>

      {/* Formik Wrapper */}
      <Formik
        initialValues={{ username: "", email: "", password: "", con_password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            {/* Username Field */}
            <div>
              <label className="block font-medium">Username</label>
              <Field
                type="text"
                name="username"
                className="w-full px-3 py-2 border border-orange-400 bg-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none"
              />
              <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Email Field */}
            <div>
              <label className="block font-medium">Email</label>
              <Field
                type="email"
                name="email"
                className="w-full px-3 py-2 border border-orange-400 bg-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Password Field */}
            <div>
              <label className="block font-medium">Password</label>
              <Field
                type="password"
                name="password"
                className="w-full px-3 py-2 border border-orange-400 bg-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block font-medium">Confirm Password</label>
              <Field
                type="password"
                name="con_password"
                className="w-full px-3 py-2 border border-orange-400 bg-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none"
              />
              <ErrorMessage name="con_password" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full cursor-pointer bg-orange-400 text-white py-2 rounded-lg hover:bg-orange-500"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing up..." : "Sign Up"}
            </button>

            <span className="text-md">
              Already have an account?{" "}
              <span onClick={()=> dispatch(setIsLogin(true))}  className="cursor-pointer font-bold text-orange-400 hover:text-orange-500">
                Sign in
              </span>
            </span>
          </Form>
        )}
      </Formik>
    </div>
  );

}

export default Registration