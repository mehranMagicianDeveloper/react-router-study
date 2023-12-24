import React, { useState } from "react";
import { useLoaderData, Form } from "react-router-dom";
import { loginUser } from "../../api/api";

export function loader({ request }) {
  return new URL(request.url).searchParams.get("message");
}

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const data = await loginUser({ email, password });
  console.log(`data: ${data}`);
  return null;
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

  return (
    <div className="login-container">
      <h1>Sign in to your account</h1>
      {message && <h3 className="login-error">{message}</h3>}
      {error && <h3 className="login-error">{error}</h3>}
      <Form className="login-form" method="post">
        <input name="email" type="email" placeholder="Email address" />
        <input name="password" type="password" placeholder="Password" />
        <button disabled={status === "submiting"}>
          {status === "submiting" ? "Logging in ..." : "Log in"}
        </button>
      </Form>
    </div>
  );
}
