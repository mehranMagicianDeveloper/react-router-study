import React, { useEffect } from "react";
import {
  useLoaderData,
  useNavigation,
  Form,
  redirect,
  useActionData,
  useNavigate,
} from "react-router-dom";
import { loginUser } from "../../api/api";

export function loader({ request }) {
  return new URL(request.url).searchParams.get("message");
}

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  const pathname =
    new URL(request.url).searchParams.get("redirectTo") || "/host";
  console.log(`pathname: ${pathname}`);

  try {
    const data = await loginUser({ email, password });
    localStorage.setItem("loggedIn", true);
    return true;
  } catch (err) {
    console.log(err);
    return err.message;
  }
}

export default function Login() {
  const errorMessage = useActionData();
  const message = useLoaderData();
  const navigation = useNavigation();
  const navigate = useNavigate();

  useEffect(() => {
    if (errorMessage) {
      console.log("navigate");
      navigate("/host", { replace: true });
    }
  }, [errorMessage]);

  return (
    <div className="login-container">
      <h1>Sign in to your account</h1>
      {message && <h3 className="red">{message}</h3>}
      {navigation.state === "idle" && typeof errorMessage === "string" && (
        <h3 className="red">{errorMessage}</h3>
      )}

      <Form method="post" className="login-form" replace>
        <input name="email" type="email" placeholder="Email address" />
        <input name="password" type="password" placeholder="Password" />
        <button disabled={navigation.state === "submitting"}>
          {navigation.state === "submitting" ? "Logging in..." : "Log in"}
        </button>
      </Form>
    </div>
  );
}
