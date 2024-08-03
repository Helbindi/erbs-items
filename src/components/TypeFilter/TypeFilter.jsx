import React from "react";
import { WEAPON_GROUP, TYPES_ICON } from "../../files/items";
import "./TypeFilter.css";

const TYPES = ["Weapon", "Head", "Chest", "Arm/Accessory", "Leg"];

function TypeFilter({ filterOptions, setFilterOptions }) {
  function handleType(type) {
    if (filterOptions.type === type) {
      setFilterOptions({ ...filterOptions, type: "" });
      return;
    }
    setFilterOptions({ ...filterOptions, type: type });
  }

  function handleSubType(weapon) {
    if (filterOptions.subtype === weapon.name) {
      setFilterOptions({ ...filterOptions, subtype: "" });
      return;
    }
    setFilterOptions({ ...filterOptions, subtype: weapon.name });
  }
  return (
    <div className="secondary-filter">
      <div className="weapon-group">
        {WEAPON_GROUP.map((weapon) => {
          return (
            <div
              key={weapon.name}
              title={weapon.name}
              className={`${
                filterOptions.subtype === weapon.name ? "selected" : ""
              }`}
              onClick={() => handleSubType(weapon)}
            >
              <img src={weapon.image} alt={weapon.name} />
            </div>
          );
        })}
      </div>
      <hr />
      <div className="type-filter">
        {TYPES.map((type) => (
          <div
            key={type}
            className={`items-type ${
              filterOptions.type === type ? "selected" : ""
            }`}
            onClick={() => handleType(type)}
          >
            <img
              src={TYPES_ICON[type.split("/").join("")]}
              alt={`${type} icon`}
              title={type}
            />
            <p>{type}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TypeFilter;
