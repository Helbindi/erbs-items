import React, { useState, useEffect } from "react";
import "./ItemSelected.css";
import { findItemName } from "../../files/helper";

function ItemSelected({ selected, setSelected, items }) {
  return (
    <section className="selected-item" aria-hidden={!selected}>
      {selected && (
        <div className="selected-close" onClick={() => setSelected(null)}>
          X
        </div>
      )}

      <div className="tree-container">
        {selected && (
          <ul className="tree">
            <ItemComponent items={items} name={selected?.name} />
          </ul>
        )}
      </div>

      <article className="selected-desc">
        <h2>{selected?.name}</h2>
        <div className="item-tags">
          <p>{selected?.rarity}</p>
          <p>{selected?.type}</p>
          {selected?.subtype === undefined ? <></> : <p>{selected?.subtype}</p>}
        </div>
        {selected?.stats.map((stat) => (
          <div key={`${stat.name}${stat.value}`}>
            <p>
              <strong style={{ color: "limegreen" }}>
                {stat.value}
                {stat.ratio === "percent" ? "% " : " "}
              </strong>
              {stat.name}
              {stat.unique === true ? (
                <strong style={{ color: "yellow" }}>{` [Unique]`}</strong>
              ) : (
                ""
              )}
            </p>
          </div>
        ))}

        <div className="item-passive">
          <h3>{selected?.passive?.name}</h3>
          <p>{selected?.passive?.desc}</p>
        </div>
      </article>
    </section>
  );
}

export default ItemSelected;

function ItemComponent({ items, name }) {
  const item = findItemName(items, name);
  return (
    <li>
      <div>
        <img
          className={item.rarity}
          src={item?.imageUrl}
          alt={item?.name}
          title={item?.name}
        />
      </div>
      {item?.components.length > 0 && (
        <ul>
          {item?.components.map((itemName) => (
            <ItemComponent key={itemName} items={items} name={itemName} />
          ))}
        </ul>
      )}
    </li>
  );
}
