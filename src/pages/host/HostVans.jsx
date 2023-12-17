import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HostVans = () => {
  const [vans, setVans] = useState([]);

  useEffect(() => {
    axios
      .get("/api/vans")
      .then((res) => res.data)
      .then((data) => setVans(data.vans));
  }, []);

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
        <section>{vans.length > 0 ? vansElement : <h1>Loading...</h1>}</section>
      </div>
    </section>
  );
};

export default HostVans;
