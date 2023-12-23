import React from "react";
import { Link, useLoaderData, useLocation } from "react-router-dom";
import { getVans } from "../../api/api";

export function loader({ params }) {
  return getVans(params.id);
}

const VanDetail = () => {
  const location = useLocation();
  const search = location.state?.search || "";

  const van = useLoaderData();

  return (
    <div className="van-detail-container">
      <Link to={`..${search}`} relative="path" className="back-button">
        &larr; <span>Back to all vans</span>
      </Link>

      <div className="van-detail">
        <img src={van.imageUrl} alt="van" />
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
        <h2>{van.name}</h2>
        <p className="van-price">
          <span>{van.price}</span>
          /day
        </p>
        <p>{van.description}</p>
        <button className="link-button">Rent this van</button>
      </div>
    </div>
  );
};

export default VanDetail;
