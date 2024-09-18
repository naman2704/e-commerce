import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { registerUser } from "../Redux/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    name: Yup.string().min(2).max(50).required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("Confirm passowrd is required"),
  });
  // Formik submission handler
  const handleSubmit = (values, { setSubmitting }) => {
    try {
      console.log("Register Form values:", values);
      dispatch(registerUser(values))
        .unwrap()
        .then((res) => {
          console.log("User register in res: ", res);
          if (res?.status === 1) {
            navigate("/login");
          }
        });
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setSubmitting(false); // Set isSubmitting back to false
    }
  };
  return (
    <Formik
      initialValues={{ name: "", email: "", password: "", confirmPassword: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <div className="flex items-center justify-center min-h-screen">
          <Form className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md w-[400px]">
            <div className="mb4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <Field
                type="text"
                name="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <ErrorMessage
                className="text-red-500 text-sm mt-1"
                name="name"
                component="div"
                style={{ color: "red" }}
              />
            </div>

            <div className="mb4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <Field
                type="email"
                name="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <ErrorMessage
                className="text-red-500 text-sm mt-1"
                name="email"
                component="div"
                style={{ color: "red" }}
              />
            </div>

            <div className="mb4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <Field
                type="password"
                name="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <ErrorMessage
                className="text-red-500 text-sm mt-1"
                name="password"
                component="div"
                style={{ color: "red" }}
              />
            </div>

            <div className="mb4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <Field
                type="password"
                name="confirmPassword"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <ErrorMessage
                className="text-red-500 text-sm mt-1"
                name="confirmPassword"
                component="div"
                style={{ color: "red" }}
              />
            </div>
            <div className="mt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Submitting..." : "Register"}
              </button>
            </div>
            <div className="mb-2 mt-2 text-center">
              <span>or</span>
            </div>
            <div className="mt-2">
              <button
                type="button"
                className="w-full py-2 px-4 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Link to="/login">Sign In</Link>
              </button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default Register;
