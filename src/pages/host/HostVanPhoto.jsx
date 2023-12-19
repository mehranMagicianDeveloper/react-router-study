import React from "react";
import { useOutletContext } from "react-router-dom";

const HostVanPhoto = () => {
  const { currentVan } = useOutletContext();
  return (
    <div>
      <h1>
        <img src={currentVan.imageUrl} alt="van" />
      </h1>
    </div>
  );
};

export default HostVanPhoto;
