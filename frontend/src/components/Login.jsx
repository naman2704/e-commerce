import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Redux/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ role }) => {
  const user = useSelector((state) => state?.user?.userInfo);
  const navigate = useNavigate();

  const userRole = typeof role === "string" ? role : user?.role || "user";
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address!")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const handleSubmit = (values, { setSubmitting }) => {
    try {
      console.log("Login Form values:", values);
      dispatch(loginUser(values))
        .unwrap()
        .then((res) => {
          console.log(res);
          if (res?.status === 1) {
            navigate("/");
          }
        });
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Formik
      initialValues={{
        email: userRole === "admin" ? import.meta.env.VITE_ADMIN_EMAIL : "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <div className="flex items-center justify-center min-h-screen">
          <Form className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md w-[400px]">
            <div className={`mb4${userRole === "admin" ? " hidden" : ""}`}>
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
            <div className="mt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Submitting..." : "Login"}
              </button>
            </div>
            {userRole === "admin" || (
              <>
                <div className="mb-2 mt-2 text-center">
                  <span>or</span>
                </div>
                <div className="mt-2">
                  <button
                    type="button"
                    className="w-full py-2 px-4 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <Link to="/register">Sign Up</Link>
                  </button>
                </div>
              </>
            )}
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default Login;
