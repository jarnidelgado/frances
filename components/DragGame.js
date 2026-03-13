// components/DragGame.js
import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";

export default function DragGame({ exercises = [], current = 0, rate = 1 }) {
  const [index, setIndex] = useState(current);
  const [drop, setDrop] = useState([]);

  useEffect(() => { setDrop([]); }, [index, exercises]);

  function onDragStart(e, w) { e.dataTransfer.setData("text/plain", w); }
  function onDropHandler(e) {
    e.preventDefault();
    const w = e.dataTransfer.getData("text/plain");
    setDrop((p) => [...p, w]);
  }
  function addToDrop(w) {
    setDrop((p) => [...p, w]);
  }
  function check() {
    const ex = exercises[index];
    if (!ex) return;
    const ok = drop.length === ex.words.length && drop.every((w, i) => w === ex.words[i]);
    return ok;
  }

  const ex = exercises[index] || { words: [] };
  const pool = ex.words.slice().sort(() => Math.random() - 0.5);

  return (
    <div>
      <h4>🧩 Drag — Ordena la frase</h4>

      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 8 }}>
        <button className={styles.bigBtn} onClick={() => setIndex((i) => Math.max(0, i - 1))}>◀</button>
        <div style={{ fontWeight: 700 }}>{index + 1} / {exercises.length}</div>
        <button className={styles.bigBtn} onClick={() => setIndex((i) => Math.min(exercises.length - 1, i + 1))}>▶</button>
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {pool.map((w, i) => (
              <div
                key={i}
                className={styles.wordPill}
                draggable
                onDragStart={(e) => onDragStart(e, w)}
                onClick={() => addToDrop(w)}
              >
                {w}
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <div
            className={styles.dropArea}
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDropHandler}
          >
            {drop.map((w, i) => (
              <div key={i} className={styles.wordPill} onClick={() => setDrop((d) => d.filter((_, idx) => idx !== i))}>
                {w}
              </div>
            ))}
          </div>

          <div style={{ marginTop: 8 }}>
            <button
              className={styles.bigBtn}
              onClick={() => {
                const ok = check();
                if (ok) { alert("✅ ¡Correcto!"); }
                else { alert("❌ No es correcto"); }
              }}
            >
              Comprobar
            </button>
            <button className={styles.bigBtn} onClick={() => setDrop([])} style={{ marginLeft: 8 }}>Reset</button>
          </div>
        </div>
      </div>
    </div>
  );
}
