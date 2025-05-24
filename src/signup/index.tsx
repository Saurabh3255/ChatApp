import React from "react";
import Input from "../assets/commonComponent/Input";
import PasswordInput from "../assets/commonComponent/PasswordInput";
import { useFormik } from "formik";
import * as Yup from "yup";

function Signup() {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      lastName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Must be at least 6 characters")
        .required("Required"),
    }),
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
    },
  });

  return (
    <div
      className="w-full h-screen flex justify-center items-center bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,0,0,0.4), rgba(255,0,0,0.4)), url('/src/assets/Image/quick-chat-app-background.jpg')",
      }}
    >
      <form
        onSubmit={formik.handleSubmit}
        className="relative z-10 bg-white w-full max-w-md p-8 rounded-xl shadow-lg space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
          Sign Up
        </h2>

        <Input
          label="First Name"
          name="firstName"
          type="text"
          placeholder="Enter your first name"
          value={formik.values.firstName}
          onChange={formik.handleChange}
        />
        <Input
          label="Last Name"
          name="lastName"
          type="text"
          placeholder="Enter your last name"
          value={formik.values.lastName}
          onChange={formik.handleChange}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <PasswordInput
          autoComplete="new-password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          placeholder="Enter your password"
        />

        <button
          type="submit"
          className="w-full py-2 text-white bg-red-500 hover:bg-red-600 rounded-md transition"
        >
          Sign Up
        </button>

        <p className="text-center text-sm text-gray-600 mt-2">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login here
          </a>
        </p>
      </form>
    </div>
  );
}

export default Signup;
