import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";

const HostVanDetail = () => {
  const params = useParams();
  const id = params.id;

  const [currentVan, setCurrentVan] = useState(null);

  useEffect(() => {
    fetch(`/api/vans/${id}`)
      .then((response) => response.json())
      .then((data) => setCurrentVan(data.vans));
  }, [id]);

  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

  return (
    <div>
      <h1>
        {currentVan ? (
          <section>
            <Link to=".." style={{ textDecoration: "underline" }}>
              &larr; go back to vans
            </Link>

            <div className="host-van-detail-layout-container">
              <div className="host-van-detail">
                <img
                  src={currentVan.imageUrl}
                  alt={currentVan.id}
                  width={150}
                />
                <div className="host-van-detail-info-text">
                  <p>{currentVan.type}</p>
                  <p>{currentVan.name}</p>
                  <p>{currentVan.price}</p>
                  <p>{currentVan.descriptiom}</p>
                </div>
              </div>
              <nav className="host-nav">
                <NavLink
                  to="."
                  end
                  style={({ isActive }) => (isActive ? activeStyle : null)}
                >
                  Detail
                </NavLink>
                <NavLink
                  to="photos"
                  style={({ isActive }) => (isActive ? activeStyle : null)}
                >
                  Photos
                </NavLink>
                <NavLink
                  to="pricing"
                  style={({ isActive }) => (isActive ? activeStyle : null)}
                >
                  Pricing
                </NavLink>
              </nav>
            </div>

            <Outlet />
          </section>
        ) : (
          <>
            <h3>Loading...</h3>
          </>
        )}
      </h1>
    </div>
  );
};

export default HostVanDetail;
