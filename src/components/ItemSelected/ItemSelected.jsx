import React, { useState, useEffect } from "react";
import "./ItemSelected.css";
import { findItemName } from "../../files/helper";
import ItemIcon from "../ItemIcon/ItemIcon";

function ItemSelected({ selected, items }) {
  return (
    <section className="selected-item">
      <article className="selected-desc">
        <h2>{selected?.name}</h2>
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

      {selected && (
        <div className="tree-container">
          {selected && (
            <ul className="tree">
              <ItemComponent items={items} name={selected?.name} />
            </ul>
          )}
        </div>
      )}
    </section>
  );
}

export default ItemSelected;

function ItemComponent({ items, name, selected, setSelected }) {
  const item = findItemName(items, name);
  return (
    <li>
      <div>
        <img className={item.rarity} src={item?.imageUrl} alt={item?.name} />
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
