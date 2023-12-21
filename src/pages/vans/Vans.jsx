import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getVans } from "../../api/api.js";

const Vans = () => {
  const [vans, setVans] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get("type");

  const filterdVans = typeFilter
    ? vans.filter((van) => van.type === typeFilter)
    : vans;

  useEffect(() => {
    async function loadVans() {
      setLoading(true);
      const data = await getVans();
      setVans(data);
      setLoading(false);
    }
    loadVans();
  }, []);

  const vansJSX = filterdVans.map((van) => {
    return (
      <Link
        to={`/vans/${van.id}`}
        state={{ search: `?${searchParams.toString()}` }}
      >
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
      {loading ? (
        <h1>loading...</h1>
      ) : (
        <>
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
          </div>

          {vans.length === 0 ? (
            <h1>Loading...</h1>
          ) : (
            <div className="van-list">{vansJSX}</div>
          )}
        </>
      )}
    </div>
  );
};

export default Vans;
