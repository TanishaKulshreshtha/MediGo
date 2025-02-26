import React, { useState } from "react";

const Login = () => {
  const [state, setState] = useState("Signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white shadow-lg rounded-2xl p-8 w-96"
      >
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">
            {state === "Signup" ? "Create Account" : "Login"}
          </h2>
          <p className="text-gray-500 mt-1">
            Please {state === "Signup" ? "Signup" : "Login"} to book an
            appointment!
          </p>
        </div>

        {state === "Signup" && (
          <div className="mt-4">
            <label className="block text-gray-700 font-medium">Full Name</label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="w-full p-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
        )}

        <div className="mt-4">
          <label className="block text-gray-700 font-medium">Email</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full p-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-700 font-medium">Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="w-full p-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all duration-300"
        >
          {state === "Signup" ? "Create Account" : "Login"}
        </button>

        <p className="text-gray-600 text-center mt-4">
          {state === "Signup" ? (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setState("Login")}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Login here
              </span>
            </>
          ) : (
            <>
              Create a new account?{" "}
              <span
                onClick={() => setState("Signup")}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Click here
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;
