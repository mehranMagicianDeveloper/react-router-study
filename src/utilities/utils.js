import { redirect } from "react-router-dom";

export function requireAuth() {
  const isLogedIn = false;

  if (!isLogedIn) {
    throw redirect("/login");
  }
}
