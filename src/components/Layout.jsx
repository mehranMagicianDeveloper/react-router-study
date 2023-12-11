import React from "react";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="site-wrapper">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
