import React from "react";
import { useOutletContext } from "react-router-dom";

const HostVanPricing = () => {
  const { currentVan } = useOutletContext();

  return (
    <div>
      <h1>{currentVan.price}$ / day</h1>
    </div>
  );
};

export default HostVanPricing;
