import React from "react";
import { useOutletContext } from "react-router-dom";

const HostVanInfo = () => {
  const { currentVan } = useOutletContext();
  return (
    <div>
      <h1>{currentVan.name}</h1>
    </div>
  );
};

export default HostVanInfo;
