import React from "react";
import "./ItemSelected.css";
import { findItemName } from "../../files/helper";

function ItemSelected({ selected }) {
  console.log(selected);
  return (
    <section className="selected-item">
      {selected ? (
        <>
          <div className="selected-header">
            <h2>{selected.name}</h2>
            <img src={selected?.imageUrl} alt={selected?.name} />
          </div>
          {selected.components.map((comp) => (
            <p>{comp}</p>
          ))}
        </>
      ) : (
        <></>
      )}
    </section>
  );
}

export default ItemSelected;
