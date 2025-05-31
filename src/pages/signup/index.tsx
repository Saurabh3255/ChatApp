import Input from "../../assets/commonComponent/Input";
import PasswordInput from "../../assets/commonComponent/PasswordInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { postsignup } from "./SignUpSaga";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
        .required("First Name Should Not Be Empty"),
      lastName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Last Name Should Not Be Empty"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email Is Required"),
      password: Yup.string()
        .min(6, "Must be at least 6 characters")
        .required("Password Is Required"),
    }),

    onSubmit: (values) => {
      dispatch(postsignup({ values, navigate }));
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
          onBlur={formik.handleBlur}
          touched={formik.touched.firstName}
          error={formik.errors.firstName}
        />

        <Input
          label="Last Name"
          name="lastName"
          type="text"
          placeholder="Enter your last name"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          touched={formik.touched.lastName}
          error={formik.errors.lastName}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          touched={formik.touched.email}
          error={formik.errors.email}
        />
        <PasswordInput
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.password}
          touched={formik.touched.password}
        />

        <button
          type="submit"
          className="w-full py-2 text-white bg-red-500 hover:bg-red-600 rounded-md transition"
        >
          Sign Up
        </button>

        <p className="text-center text-sm text-gray-600 mt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
