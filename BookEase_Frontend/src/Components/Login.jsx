import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { setIsLogin } from "../Redux/UserSlice";
import useAuth from "../Hooks/useAuth";

const Login = () => {
  // ✅ Define Validation Schema using Yup
  const {Login_Axios} = useAuth()
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // ✅ Handle Form Submission
  const handleSubmit = (values,{setSubmitting}) => {
    console.log("Form Data:", values);
    Login_Axios(values,setSubmitting)
  };

  const dispatch = useDispatch()

  return (
    <div className="bg-transparent p-10  rounded-xl font-sans m-4 md:m-0  w-[400px] ">
      <h1 className="text-4xl font-bold text-orange-400 text-center mb-6">
        Welcome
      </h1>
      <h4 className="text-xl font-semibold text-orange-400 text-center mb-4 ">
        sign in to your account
      </h4>

      {/* Formik Wrapper */}
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block font-medium">Email</label>
              <Field
                type="email"
                name="email"
                className="w-full px-3 py-2 border border-orange-400 bg-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none"
              />

              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block font-medium">Password</label>
              <Field
                type="password"
                name="password"
                className="w-full px-3 py-2 border border-orange-400 bg-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer bg-orange-400 text-white py-2 rounded-lg hover:bg-orange-500"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>

            <span className="text-md">
              Don't have an account?{" "}
              <span onClick={()=>dispatch(setIsLogin(false))} className="cursor-pointer font-bold text-orange-400 hover:text-orange-500">
                Sign up
              </span>
            </span>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
