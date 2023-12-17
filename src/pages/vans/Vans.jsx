import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Vans = () => {
  const [vans, setVans] = useState([]);

  useEffect(() => {
    axios
      .get("/api/vans")
      .then((res) => res.data)
      .then((data) => setVans(data.vans));
  }, []);

  const vansJSX = vans.map((van) => {
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

      {vans.length === 0 ? (
        <h1>Loading...</h1>
      ) : (
        <div className="van-list">{vansJSX}</div>
      )}
    </div>
  );
};

export default Vans;
