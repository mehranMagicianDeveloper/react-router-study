import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { getHostVans } from "../../api/api";
import { requireAuth } from "../../utilities/utils";

export async function loader() {
  await requireAuth();
  return getHostVans();
}

const HostVans = () => {
  const vans = useLoaderData();

  const vansElement = vans.map((van) => {
    return (
      <Link to={van.id} key={van.id} className="host-van-link-wrapper">
        <div className="host-van-single" key={van.id}>
          <img src={van.imageUrl} alt={`${van.name}`} />
          <div className="host-van-info">
            <h3>{van.name}</h3>
            <p>${van.price}/day</p>
          </div>
        </div>
      </Link>
    );
  });

  return (
    <section>
      <h1 className="host-vans-title">Your listed vans</h1>
      <div className="host-vans-list">
        <section>{vansElement}</section>
      </div>
    </section>
  );
};

export default HostVans;
