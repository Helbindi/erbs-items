import React, { useRef } from "react";
import "./ItemIcon.css";
import ItemPopUp from "../ItemPopUp/ItemPopUp";

const OFFSET = "80px";

function ItemIcon({ item, selected, setSelected }) {
  const popUpRef = useRef(null);
  function handleClick() {
    if (selected) {
      if (item.name === selected.name) {
        setSelected(null);
      } else {
        setSelected(item);
      }
    } else {
      setSelected(item);
    }
  }
  function handleHover(e) {
    if (e.clientX >= window.innerWidth / 2) {
      popUpRef.current.style.left = "initial";
      popUpRef.current.style.right = OFFSET;
    } else {
      popUpRef.current.style.right = "initial";
      popUpRef.current.style.left = OFFSET;
    }
  }
  return (
    <article
      className="item-icon"
      onClick={() => handleClick()}
      onMouseEnter={(e) => handleHover(e)}
    >
      <img className={`${item.rarity}`} src={item.imageUrl} alt={item.name} />
      {item.name.includes("- Crimson") ? <span className="Crimson" /> : <></>}
      {item.name.includes("- Dawn") ? <span className="Dawn" /> : <></>}
      <ItemPopUp item={item} popUpRef={popUpRef} />
    </article>
  );
}

export default ItemIcon;
