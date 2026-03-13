// components/Accordion.js
import React from "react";
import styles from "../styles/Home.module.css";

export default function Accordion({ title, open = false, onToggle, children }) {
  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        className={styles.accHead}
        onClick={onToggle}
        onKeyPress={(e) => { if (e.key === "Enter") onToggle(); }}
      >
        <h3 style={{ margin: 0 }}>{title}</h3>
        <div className={styles.chev}>{open ? "▲" : "▼"}</div>
      </div>
      {open && <div className={styles.accBody}>{children}</div>}
    </div>
  );
}
