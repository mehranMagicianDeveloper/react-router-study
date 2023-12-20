import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";

const Vans = () => {
  const [vans, setVans] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get("type");

  const filterdVans = typeFilter
    ? vans.filter((van) => van.type === typeFilter)
    : vans;

  useEffect(() => {
    axios
      .get("/api/vans")
      .then((res) => res.data)
      .then((data) => setVans(data.vans));
  }, []);

  const vansJSX = filterdVans.map((van) => {
    return (
      <Link to={`/vans/${van.id}`}>
        <div className="van-tile" key={van.id}>
          <img src={van.imageUrl} alt="van" />
          <div className="van-info">
            <h3>{van.name}</h3>
            <p>
              {van.price}
              <span>/day</span>
            </p>
          </div>
          <i className={`van-type ${van.type} selected`}>{van.type}</i>
        </div>
      </Link>
    );
  });

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <div className="van-list-filter-buttons">
        <button
          className={`van-type simple ${
            typeFilter === "simple" ? "selected" : ""
          }`}
          onClick={() => setSearchParams({ type: "simple" })}
        >
          Simple
        </button>
        <button
          className={`van-type luxury ${
            typeFilter === "luxury" ? "selected" : ""
          }`}
          onClick={() => setSearchParams({ type: "luxury" })}
        >
          Luxury
        </button>
        <button
          className={`van-type rugged ${
            typeFilter === "rugged" ? "selected" : ""
          }`}
          onClick={() => setSearchParams({ type: "rugged" })}
        >
          Rugged
        </button>
        {typeFilter ? (
          <button
            className="van-type clear-filters"
            onClick={() => setSearchParams("")}
          >
            Clear Filters
          </button>
        ) : null}

        {/* <Link to="?type=simple" className="van-type simple">
          Simple
        </Link>
        <Link to="?type=luxury" className="van-type luxury">
          Luxury
        </Link>
        <Link to="?type=rugged" className="van-type rugged">
          Rugged
        </Link>
        <Link to="." className="van-type clear-filters">
          Clear Filters
        </Link> */}
      </div>
      {vans.length === 0 ? (
        <h1>Loading...</h1>
      ) : (
        <div className="van-list">{vansJSX}</div>
      )}
    </div>
  );
};

export default Vans;
