import { useState, useEffect } from "react";
import "./App.css";
import { filterByRarity, dynamicFilter } from "./files/helper.js";
import ItemIcon from "./components/ItemIcon/ItemIcon.jsx";
import MainFilter from "./components/MainFilter/MainFilter.jsx";
import TypeFilter from "./components/TypeFilter/TypeFilter.jsx";
import ItemSelected from "./components/ItemSelected/ItemSelected.jsx";
import Loading from "./assets/loading.svg";
import ItemEdit from "./components/ItemEdit/ItemEdit.jsx";
import ItemForm from "./components/ItemForm/ItemForm.jsx";

const FILTER_DEFAULT = {
  type: "",
  subtype: "",
  stats: [],
};

const API_URL = "https://erbs-items-backend.onrender.com";

function App() {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [filterOptions, setFilterOptions] = useState(FILTER_DEFAULT);
  const [loading, setLoading] = useState(true);

  let displayItems = dynamicFilter(items, filterOptions);
  let filterRarity = filterByRarity(displayItems);

  useEffect(() => {
    fetch(`${API_URL}/api/items`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  }, []);
  return (
    <div className="page-container">
      <MainFilter
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
      />

      <main className="main-content">
        <h1>Eternal Return Items - Season 4</h1>
        <TypeFilter
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
        />

        {loading ? (
          <div className="loading-screen">
            Fetching data from server... This may take 50 or more seconds.
            <img
              className="loading-wheel"
              src={Loading}
              alt="loading wheel"
              width="50"
            />
          </div>
        ) : (
          <>
            {filterRarity.map((rarities, idx) => {
              return (
                <div className="rarity-section" key={idx}>
                  <h2>{filterRarity[idx][0]?.rarity}</h2>
                  <section className="items-group" key={idx}>
                    {rarities.map((item) => (
                      <ItemIcon
                        item={item}
                        key={item.name}
                        selected={selected}
                        setSelected={setSelected}
                      />
                    ))}
                  </section>
                </div>
              );
            })}
          </>
        )}
      </main>

      <ItemSelected selected={selected} />
    </div>
  );
}

export default App;
