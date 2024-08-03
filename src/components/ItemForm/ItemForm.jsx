import { useState, useRef } from "react";
import InputStat from "./InputStat.jsx";
import {
  ITEM_PASSIVE_NAMES,
  ITEM_RARITY,
  ITEM_SUBTYPES,
  ITEM_PLACEHOLDER,
  ITEM_TYPES,
} from "../../files/items.js";
import "./ItemForm.css";

const API_URL = "http://localhost:8080/api/items/";

function ItemForm() {
  const [item, setItem] = useState(ITEM_PLACEHOLDER);

  const nameRef = useRef(null),
    typeRef = useRef(null),
    subtypeRef = useRef(null),
    rarityRef = useRef(null),
    imageRef = useRef(null),
    passiveNRef = useRef(null),
    passiveDRef = useRef(null),
    comp1Ref = useRef(null),
    comp2Ref = useRef(null);

  console.log(item);

  // Functions that handle UI for Item form
  function addNewStat() {
    setItem((prev) => {
      const newStat = {
        name: "",
        value: null,
        ratio: "flat",
        unique: false,
      };
      return { ...prev, stats: [...prev.stats, newStat] };
    });
  }

  function handleUrl(e) {
    const url = e.target.value.split("&token");
    setItem({ ...item, imageUrl: url[0] });
  }

  function handleComponents(e, id) {
    setItem((prev) => {
      prev.components[id] = e.target.value;
      return prev;
    });
  }

  function resetInputs() {
    nameRef.current.value = "";
    typeRef.current.value = "Weapon";
    subtypeRef.current.value = "Two-Handed Sword";
    rarityRef.current.value = "Epic";
    imageRef.current.value = "";
    passiveNRef.current.value = "None";
    passiveDRef.current.value = "";
    comp1Ref.current.value = "";
    comp2Ref.current.value = "";
  }

  function handleReset(e) {
    e.preventDefault();
    resetInputs();
    setItem(ITEM_PLACEHOLDER);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(item);
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    console.log(res);
    resetInputs();
    setItem(ITEM_PLACEHOLDER);
  }

  return (
    <section className="item-form">
      <label>
        Name:{" "}
        <input
          ref={nameRef}
          type="text"
          name="name"
          id="name"
          onChange={(e) => setItem({ ...item, name: e.target.value })}
        />
      </label>
      <label>
        Type:
        <select
          ref={typeRef}
          name="type"
          id="type"
          defaultValue={"Weapon"}
          onChange={(e) => setItem({ ...item, type: e.target.value })}
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
          ref={subtypeRef}
          name="subtype"
          id="subtype"
          defaultValue={"Two-Handed Sword"}
          onChange={(e) => setItem({ ...item, subtype: e.target.value })}
        >
          {ITEM_SUBTYPES.map((subtype) => (
            <option value={subtype} key={subtype}>
              {subtype}
            </option>
          ))}
        </select>
      </label>
      <label>
        Rarity:
        <select
          ref={rarityRef}
          name="rarity"
          id="rarity"
          defaultValue={"Epic"}
          onChange={(e) => setItem({ ...item, rarity: e.target.value })}
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
          ref={imageRef}
          type="text"
          name="imageUrl"
          id="imageUrl"
          onChange={(e) => handleUrl(e)}
        />
      </label>

      <div className="item-stats">
        <h2>Item Stats</h2>
        <button className="add-stat" onClick={() => addNewStat()}>
          + Add New Stat
        </button>
        {item.stats.map((stat, id) => (
          <InputStat stat={stat} key={id} id={id} setItem={setItem} />
        ))}
      </div>

      <div className="item-components">
        <h2>Components</h2>
        <label>
          {" "}
          1:{" "}
          <input
            ref={comp1Ref}
            type="text"
            name="component1"
            id="component1"
            onChange={(e) => handleComponents(e, 0)}
          />
        </label>
        <label>
          {" "}
          2:{" "}
          <input
            ref={comp2Ref}
            type="text"
            name="component2"
            id="component2"
            onChange={(e) => handleComponents(e, 1)}
          />
        </label>
      </div>

      <div className="passive-input">
        <h2>Passive</h2>
        <label>Name:</label>
        <select
          ref={passiveNRef}
          name="passive-name"
          id="passive-name"
          defaultValue={"None"}
          onChange={(e) =>
            setItem({
              ...item,
              passive: { ...item.passive, name: e.target.value },
            })
          }
        >
          {ITEM_PASSIVE_NAMES.map((name) => (
            <option value={name} key={name}>
              {name}
            </option>
          ))}
          <option value="None"></option>
        </select>

        <label>Description:</label>
        <textarea
          ref={passiveDRef}
          name="passive-desc"
          id="passive-desc"
          rows="10"
          cols="45"
          onChange={(e) =>
            setItem({
              ...item,
              passive: { ...item.passive, desc: e.target.value },
            })
          }
        ></textarea>
      </div>

      <div className="btn-grp">
        <button className="form-btn" onClick={(e) => handleReset(e)}>
          Reset
        </button>
        <button className="form-btn" onClick={(e) => handleSubmit(e)}>
          Submit
        </button>
      </div>
    </section>
  );
}

export default ItemForm;
