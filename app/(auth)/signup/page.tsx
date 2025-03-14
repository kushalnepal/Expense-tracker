"use client";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const router = useRouter();

  const handleSubmit = async (values: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) => {
    try {
      // const response = await axios.post('https://lms-backend.sachetsubedi001.com.np/api/auth/register', values);
      const response = await axios.post(
        "https://ecommerce-backend.kushalnepal.com.np/api/auth/signup",
        values
      );
      console.log("response data >>", response.data);

      if (response.data.email === values.email) {
        alert("User already exists");
        return;
      }

      localStorage.setItem("userData", JSON.stringify(response.data));
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 py-12 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">Sign Up</h1>
        <Formik
          initialValues={{ name: "", email: "", password: "", role: "USER" }}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <Field
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="name"
                  name="name"
                />
                <ErrorMessage
                  className="text-red-500 text-xs italic mt-1"
                  name="name"
                  component="div"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <Field
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="email"
                  name="email"
                />
                <ErrorMessage
                  className="text-red-500 text-xs italic mt-1"
                  name="email"
                  component="div"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <Field
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="password"
                  name="password"
                />
                <ErrorMessage
                  className="text-red-500 text-xs italic mt-1"
                  name="password"
                  component="div"
                />
              </div>
              <button
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                type="submit"
                disabled={isSubmitting}
              >
                Sign Up
              </button>
            </Form>
          )}
        </Formik>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => router.push("/login")}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
