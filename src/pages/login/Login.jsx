import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { loginUser } from "../../api/api";

export function loader({ request }) {
  return new URL(request.url).searchParams.get("message");
}

export default function Login() {
  const message = useLoaderData();

  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    setStatus("submiting");
    setError(null);
    console.log(loginFormData);
    loginUser(loginFormData)
      .then((data) => console.log(data))
      .catch((error) => setError(error.message))
      .finally(() => setStatus("idle"));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="login-container">
      <h1>Sign in to your account</h1>
      {message && <h3 className="login-error">{message}</h3>}
      {error && <h3 className="login-error">{error}</h3>}
      <form onSubmit={handleSubmit} className="login-form">
        <input
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="Email address"
          value={loginFormData.email}
        />
        <input
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="Password"
          value={loginFormData.password}
        />
        <button disabled={status === "submiting"}>
          {status === "submiting" ? "Logging in ..." : "Log in"}
        </button>
      </form>
    </div>
  );
}
