// components/Accordion.js
import React, { useRef, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

export default function Accordion({ title, open=false, onToggle, children }) {
  const ref = useRef();
  const [height, setHeight] = useState(0);
  useEffect(()=> {
    if(!ref.current) return;
    setHeight(open ? ref.current.scrollHeight : 0);
  },[open, children]);

  return (
    <div style={{marginBottom:12}}>
      <div className="accHead" onClick={onToggle} role="button" tabIndex={0}>
        <h3 style={{margin:0}}>{title}</h3>
        <div style={{transform: open ? "rotate(180deg)" : "rotate(0deg)", transition:"transform .18s"}}>▾</div>
      </div>
      <div
        className={`accBody ${open ? "open" : ""}`}
        style={{height: height ? `${height}px` : "0px", transition:"height 320ms cubic-bezier(.2,.9,.2,1)", overflow:"hidden"}}
        ref={ref}
      >
        <div style={{paddingTop: open ? 12 : 0}}>{children}</div>
      </div>
    </div>
  );
}
