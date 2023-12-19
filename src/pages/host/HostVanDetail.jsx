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
