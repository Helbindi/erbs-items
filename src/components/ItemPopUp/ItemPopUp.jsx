import React from "react";
import "./ItemPopUp.css";

function ItemPopUp({ item, popUpRef }) {
  return (
    <div className="item-popup" ref={popUpRef}>
      <div className="item-header">
        <div>
          <h2>{item.name}</h2>
          <div className="item-tags">
            <p>{item.rarity}</p>
            <p>{item.type}</p>
            {item.subtype === undefined ? <></> : <p>{item.subtype}</p>}
          </div>
        </div>
        <img className={`${item.rarity}`} src={item.imageUrl} alt={item.name} />
      </div>

      {item.stats.map((stat) => (
        <div className="item-stat" key={`${stat.name}${stat.value}`}>
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
        <h3>{item.passive?.name}</h3>
        <p>{item.passive?.desc}</p>
      </div>
    </div>
  );
}

export default ItemPopUp;
