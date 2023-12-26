import React from "react";
import { Await, Link, defer, useLoaderData } from "react-router-dom";
import { getHostVans } from "../../api/api";
import { requireAuth } from "../../utilities/utils";

export async function loader({ request }) {
  await requireAuth(request);
  return defer({ hostVans: getHostVans() });
}

const HostVans = () => {
  const vansPromise = useLoaderData();

  const renderVansElement = (vans) => {
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
      <div className="host-vans-list">
        <section>{vansElement}</section>
      </div>
    );
  };

  return (
    <section>
      <h1 className="host-vans-title">Your listed vans</h1>
      <React.Suspense
        fallback={<h1 className="host-vans-title">Loading host vans...</h1>}
      >
        <Await resolve={vansPromise.hostVans}>{renderVansElement}</Await>
      </React.Suspense>
    </section>
  );
};

export default HostVans;
