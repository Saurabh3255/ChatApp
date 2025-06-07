import Input from "../../assets/commonComponent/Input";
import PasswordInput from "../../assets/commonComponent/PasswordInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginPost } from "./LoginSaga";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email Is Required"),
      password: Yup.string()
        // .min(6, "Must be at least 6 characters")
        .required("Password Is Required"),
    }),
    onSubmit: (values) => {
      dispatch(loginPost({ values, navigate }));
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
          Login
        </h2>

        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formik.values.email}
          onBlur={formik.handleBlur}
          error={formik.errors.email}
          touched={formik.touched.email}
          onChange={formik.handleChange}
        />
        <PasswordInput
          autoComplete="new-password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.password}
          touched={formik.touched.password}
          placeholder="Enter your password"
        />

        <button
          type="submit"
          className="w-full py-2 text-white bg-red-500 hover:bg-red-600 rounded-md transition"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-600 mt-2">
          Dont have an account yet?{"  "}
          <Link to="/signUp" className=" text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
