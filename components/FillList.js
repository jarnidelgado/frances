// components/FillList.js
import React, { useState } from "react";
import styles from "../styles/Home.module.css";

export default function FillList({ fills = [], onCheck, rate }) {
  const [answers, setAnswers] = useState(Array(fills.length).fill(""));

  function handleChange(i, v) {
    const copy = answers.slice();
    copy[i] = v;
    setAnswers(copy);
  }

  return (
    <div>
      <h4>✏ Fill the blank</h4>
      {fills.map((f, i) => (
        <div key={f.id} style={{ marginBottom: 12 }}>
          <div style={{ fontWeight: 700 }}>{f.prompt}</div>
          <input
            value={answers[i] || ""}
            onChange={(e) => handleChange(i, e.target.value)}
            placeholder="Escribe la respuesta..."
            style={{ padding: 8, marginTop: 6, borderRadius: 8, width: "100%" }}
          />
          <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
            <button
              className={styles.bigBtn}
              onClick={() => onCheck && onCheck({ id: f.id, answer: answers[i] || "" })}
            >
              Comprobar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
