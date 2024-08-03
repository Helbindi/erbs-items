import React from "react";
import "./MainFilter.css";
import Wallpaper from "../../assets/Wallpaper.png";
import { STATS_ICON } from "../../files/items";

const STAT_CATEGORY = [
  "Attack Power",
  "Attack Speed",
  "Critical Strike",
  "Life Steal",
  "Armor Penetration",
  "Skill Amplification",
  "Cooldown Reduction",
  "Max SP",
  "Max HP",
  "Defense",
  "Movement Speed",
  "Tenacity",
  "Healing Reduction",
];

function MainFilter({ filterOptions, setFilterOptions }) {
  function isSelected(stat) {
    return filterOptions.stats.includes(stat);
  }

  function handleFilter(e, stat) {
    if (filterOptions.stats.includes(stat)) {
      setFilterOptions((prev) => {
        let newStats = prev.stats.filter((x) => x !== stat);

        return { ...prev, stats: newStats };
      });
    } else {
      setFilterOptions((prev) => {
        let newStats = [...prev.stats, stat];

        return { ...prev, stats: newStats };
      });
    }
  }
  return (
    <aside role="main-filter">
      <div className="img-container">
        <img src={Wallpaper} alt="ER 1st Ani Wallpaper" />
      </div>

      {STAT_CATEGORY.map((stat) => (
        <div
          className="stat-filter"
          aria-selected={isSelected(stat)}
          key={stat}
          onClick={(e) => handleFilter(e, stat)}
        >
          <img
            src={STATS_ICON[String(stat).split(" ").join("")]}
            alt={stat}
            title={stat}
          />
          <p>{stat}</p>
        </div>
      ))}
    </aside>
  );
}

export default MainFilter;
