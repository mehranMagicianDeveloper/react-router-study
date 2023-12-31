import React from "react";
import { Link, NavLink, Outlet, useLoaderData } from "react-router-dom";
import { getHostVans } from "../../api/api";
import { requireAuth } from "../../utilities/utils";

export async function loader({ request, params }) {
  await requireAuth(request);
  return getHostVans(params.id);
}

const HostVanDetail = () => {
  const currentVan = useLoaderData();

  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

  return (
    <div>
      <h1>
        <section>
          <Link to=".." className="back-button">
            &larr; go back to vans
          </Link>

          <div className="host-van-detail-layout-container">
            <div className="host-van-detail">
              <img src={currentVan.imageUrl} alt={currentVan.id} />
              <div className="host-van-detail-info-text">
                <i className={`van-type van-type-${currentVan.type}`}>
                  {currentVan.type}
                </i>
                <h3>{currentVan.name}</h3>
                <h4>${currentVan.price}/day</h4>
              </div>
            </div>

            <nav className="host-van-detail-nav">
              <NavLink
                to="."
                end
                style={({ isActive }) => (isActive ? activeStyle : null)}
              >
                Details
              </NavLink>
              <NavLink
                to="pricing"
                style={({ isActive }) => (isActive ? activeStyle : null)}
              >
                Pricing
              </NavLink>
              <NavLink
                to="photos"
                style={({ isActive }) => (isActive ? activeStyle : null)}
              >
                Photos
              </NavLink>
            </nav>
            <Outlet context={{ currentVan }} />
          </div>
        </section>
      </h1>
    </div>
  );
};

export default HostVanDetail;
