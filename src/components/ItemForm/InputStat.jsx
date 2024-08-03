import React, { useEffect } from "react";
import { ITEM_STATS } from "../../files/items";

function InputStat({ stat, id, setItem }) {
  function handleChange(e) {
    setItem((prev) => {
      if (e.target.name === "value") {
        prev.stats[id][e.target.name] = Number(e.target.value);
      } else {
        prev.stats[id][e.target.name] = e.target.value;
      }
      return prev;
    });
  }

  function isUnique(e) {
    setItem((prev) => {
      prev.stats[id].unique = e.target.checked;
      return prev;
    });
  }

  function handleDelete() {
    setItem((prev) => {
      const newStats = prev.stats.filter((stat, idx) => idx !== id);
      return { ...prev, stats: newStats };
    });
  }
  return (
    <div className="stat-input">
      <label>
        Name:{" "}
        <select
          name="name"
          id="stat-select"
          defaultValue={stat.name}
          onChange={(e) => handleChange(e)}
        >
          {ITEM_STATS.map((stat) => (
            <option value={stat} key={stat}>
              {stat}
            </option>
          ))}
          <option value="">None</option>
        </select>
      </label>
      <label>
        {" "}
        Value:{" "}
        <input
          type="number"
          name="value"
          id="stat-value"
          defaultValue={stat.value}
          onChange={(e) => handleChange(e)}
        />
      </label>
      <label>
        Ratio:{" "}
        <select
          name="ratio"
          id="stat-ratio"
          defaultValue={stat.ratio}
          onChange={(e) => handleChange(e)}
        >
          <option value="flat">Flat</option>
          <option value="percent">Percent</option>
        </select>
      </label>
      <label>
        Unique:{" "}
        <input
          type="checkbox"
          name="unique"
          id="stat-unique"
          defaultChecked={stat.unique}
          onClick={(e) => isUnique(e)}
        />
      </label>

      <button onClick={() => handleDelete()}>x</button>
    </div>
  );
}

export default InputStat;
