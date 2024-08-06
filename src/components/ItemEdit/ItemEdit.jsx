import { useState, useEffect } from "react";
import InputStat from "../ItemForm/InputStat";
import ItemIcon from "../ItemIcon/ItemIcon.jsx";
import { filterByRarity, dynamicFilter } from "../../files/helper.js";
import { ITEM_TYPES, ITEM_RARITY, ITEM_SUBTYPES } from "../../files/items.js";
import Loading from "../../assets/loading.svg";
import "../ItemForm/ItemForm.css";

const API_URL = "http://localhost:8080/api/items/";

function ItemEdit() {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  let displayItems = dynamicFilter(items, {
    type: "",
    subtype: "",
    stats: [],
  });
  let filterRarity = filterByRarity(displayItems);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  }, []);

  return (
    <main className="main-content">
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
      {selected && (
        <EditForm
          selected={selected}
          setSelected={setSelected}
          setItems={setItems}
          setLoading={setLoading}
        />
      )}
    </main>
  );
}

export default ItemEdit;

function EditForm({ selected, setSelected, setItems, setLoading }) {
  const [edited, setEdited] = useState(selected);

  function addNewStat() {
    setEdited((prev) => {
      const newStat = {
        name: null,
        value: null,
        ratio: "flat",
        unique: false,
      };
      return { ...prev, stats: [...prev.stats, newStat] };
    });
  }

  function handleUrl(e) {
    const url = e.target.value.split("&token");
    setEdited({ ...edited, imageUrl: url[0] });
  }

  function handleComponents(e, idx) {
    setEdited((prev) => {
      let newComp;
      if (idx === 0) {
        newComp = [e.target.value, prev.components[1]];
      } else {
        newComp = [prev.components[0], e.target.value];
      }

      return { ...prev, components: newComp };
    });
  }

  async function handleEdit(e) {
    e.preventDefault();
    console.log(edited);
    const res = await fetch(`${API_URL}${edited["_id"]}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(edited),
    });
    console.log(res);
    setSelected(null);

    setLoading(true);
    await fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  }

  async function handleDelete(e) {
    e.preventDefault();
    console.log("Delete this item");
    const res = await fetch(`${API_URL}${edited["_id"]}`, {
      method: "DELETE",
    });
    console.log(res);
    setSelected(null);

    setLoading(true);
    await fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  }

  function handleClose() {
    setSelected(null);
  }

  return (
    <section className="item-form">
      <label>
        Name:{" "}
        <input
          type="text"
          name="name"
          id="name"
          defaultValue={edited.name}
          onChange={(e) => setEdited({ ...edited, name: e.target.value })}
        />
      </label>

      <label>
        Type:
        <select
          name="type"
          id="type"
          defaultValue={edited.type}
          onChange={(e) => setEdited({ ...edited, type: e.target.value })}
        >
          {ITEM_TYPES.map((type) => (
            <option value={type} key={type}>
              {type}
            </option>
          ))}
        </select>
      </label>
      <label>
        Subtype:{" "}
        <select
          name="subtype"
          id="subtype"
          defaultValue={edited.subtype}
          onChange={(e) => setEdited({ ...edited, subtype: e.target.value })}
        >
          {ITEM_SUBTYPES.map((subtype) => (
            <option value={subtype} key={subtype}>
              {subtype}
            </option>
          ))}
          <option value="">None</option>
        </select>
      </label>
      <label>
        Rarity:
        <select
          name="rarity"
          id="rarity"
          defaultValue={edited.rarity}
          onChange={(e) => setEdited({ ...edited, rarity: e.target.value })}
        >
          {ITEM_RARITY.map((rarity) => (
            <option value={rarity} key={rarity}>
              {rarity}
            </option>
          ))}
        </select>
      </label>

      <label>
        ImageUrl:{" "}
        <input
          type="text"
          name="imageUrl"
          id="imageUrl"
          defaultValue={edited?.imageUrl}
          onChange={(e) => handleUrl(e)}
        />
      </label>

      <div className="item-stats">
        <h2>Item Stats</h2>
        <button className="add-stat" onClick={() => addNewStat()}>
          + Add New Stat
        </button>
        {edited.stats.map((stat, id) => (
          <InputStat
            stat={stat}
            key={`${stat.name}-${id}`}
            id={id}
            setItem={setEdited}
          />
        ))}
      </div>

      <div className="item-components">
        <h2>Components</h2>
        <label>
          {" "}
          1:{" "}
          <input
            type="text"
            name="component1"
            id="component1"
            defaultValue={edited.components[0]}
            onChange={(e) => handleComponents(e, 0)}
          />
        </label>
        <label>
          {" "}
          2:{" "}
          <input
            type="text"
            name="component2"
            id="component2"
            defaultValue={edited.components[1]}
            onChange={(e) => handleComponents(e, 1)}
          />
        </label>
      </div>

      <div className="passive-input">
        <h2>Passive</h2>
        <label>Name:</label>
        <input
          name="passive-name"
          id="passive-name"
          type="text"
          defaultValue={edited?.passive.name}
          onChange={(e) =>
            setEdited({
              ...edited,
              passive: { ...edited.passive, name: e.target.value },
            })
          }
        />

        <label>Description:</label>
        <textarea
          name="passive-desc"
          id="passive-desc"
          rows="10"
          cols="45"
          defaultValue={edited?.passive.desc}
          onChange={(e) =>
            setEdited({
              ...edited,
              passive: { ...edited.passive, desc: e.target.value },
            })
          }
        ></textarea>
      </div>

      <div className="btn-grp">
        <button className="form-btn delete" onClick={(e) => handleDelete(e)}>
          Delete
        </button>
        <button className="form-btn" onClick={(e) => handleEdit(e)}>
          Edit
        </button>
        <button className="form-btn close" onClick={() => handleClose()}>
          Close
        </button>
      </div>
    </section>
  );
}
