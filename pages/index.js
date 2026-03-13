// pages/index.js
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

const LESSON = {
  id: "lesson-a",
  title: "L'INDUCTION — Lección A",
  vocab: [
    { word: "Bonjour", trans: "Buenos días / Hola", phon: "bon-zhur", emoji: "👋" },
    { word: "Salut", trans: "Hola (informal)", phon: "sa-lu", emoji: "🙋" },
    { word: "Au revoir", trans: "Adiós", phon: "o rre-vuar", emoji: "👋🏻" },
    { word: "Je m'appelle Kyoko", trans: "Me llamo Kyoko", phon: "shə ma-pel kyoko", emoji: "🙋‍♀️" }
  ],
  examples: [
    { id: "ex1", text: "Je m'appelle Kyoko.", notes: "Presentarte", emoji: "🧑‍🎓" },
    { id: "ex2", text: "J'ai vingt ans.", notes: "Decir edad", emoji: "🎂" }
  ],
  listening: [
    { id: "lst1", text: "Bonjour! Je m'appelle Kyoko." },
    { id: "lst2", text: "Je suis japonaise. J'habite à Yokohama." }
  ],
  exercises: {
    fill: [
      { id: "f1", prompt: "Comment vous appelez-vous? Je m'appelle ____.", answers: ["kyoko"] },
      { id: "f2", prompt: "Quel âge avez-vous? J'ai ____ ans.", answers: ["20", "vingt"] }
    ],
    drag: [
      { id: "d1", sentence: "Je m'appelle Kyoko.", words: ["Je", "m'appelle", "Kyoko."] },
      { id: "d2", sentence: "J'ai vingt ans.", words: ["J'ai", "vingt", "ans."] }
    ]
  }
};

function speak(text, rate = 1) {
  if (!("speechSynthesis" in window)) return alert("TTS no soportado");
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "fr-FR";
  u.rate = rate;
  window.speechSynthesis.speak(u);
}

export default function Home() {
  const [rate, setRate] = useState(1);
  const [open, setOpen] = useState({ vocab: true, examples: false, listening: false, exercises: false });
  const [fillIndex, setFillIndex] = useState(0);
  const [fillAnswer, setFillAnswer] = useState("");
  const [dragIdx, setDragIdx] = useState(0);
  const [dropWords, setDropWords] = useState([]);

  useEffect(() => {
    setRate(1);
  }, []);

  function onDragStart(e, w) { e.dataTransfer.setData("text/plain", w); }
  function onDrop(e) {
    e.preventDefault();
    const w = e.dataTransfer.getData("text/plain");
    setDropWords((prev) => [...prev, w]);
  }
  function checkDrag() {
    const ex = LESSON.exercises.drag[dragIdx];
    const ok = dropWords.length === ex.words.length && dropWords.every((w, i) => w === ex.words[i]);
    if (ok) {
      alert("¡Correcto! 🎉");
    } else {
      alert("No es correcto, intenta de nuevo.");
    }
  }
  const normalize = (s) => (s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();
  function checkFill() {
    const ex = LESSON.exercises.fill[fillIndex];
    const ok = ex.answers.map((a) => normalize(a)).includes(normalize(fillAnswer));
    if (ok) {
      alert("✅ Correcto");
    } else {
      alert("❌ Intenta otra vez");
    }
  }

  return (
    <>
      <Head>
        <title>Frances Trainer — Lección A</title>
      </Head>
      <main className={styles.container}>
        <header className={styles.header}>
          <div className={styles.logo}>FR</div>
          <div>
            <h1>{LESSON.title}</h1>
            <p className={styles.muted}>Kid-friendly · voz fr-FR · velocidad ajustable</p>
          </div>
        </header>

        <section className={styles.controls}>
          <label className={styles.small}>Velocidad (fr-FR): {rate.toFixed(2)}x</label>
          <input
            className={styles.range}
            type="range"
            min="0.6"
            max="1.4"
            step="0.05"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
          />
        </section>

        <div className={styles.card}>
          <div className={`${styles.accHead} ${open.vocab ? styles.open : ""}`} onClick={() => setOpen((o) => ({ ...o, vocab: !o.vocab }))}>
            <h3>📚 Vocabulario</h3><div className={styles.chev}>{open.vocab ? "▲" : "▼"}</div>
          </div>
          {open.vocab && (
            <div className={styles.accBody}>
              {LESSON.vocab.map((v) => (
                <div key={v.word} className={styles.vocabRow}>
                  <div className={styles.emoji}>{v.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div className={styles.word}>{v.word}</div>
                    <div className={styles.phon}>{v.phon}</div>
                  </div>
                  <div style={{ marginLeft: 12 }}>{v.trans}</div>
                  <div>
                    <button className={styles.play} onClick={() => speak(v.word, rate)}>🔊</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className={`${styles.accHead} ${open.examples ? styles.open : ""}`} onClick={() => setOpen((o) => ({ ...o, examples: !o.examples }))}>
            <h3>✍️ Frases de ejemplo</h3><div className={styles.chev}>{open.examples ? "▲" : "▼"}</div>
          </div>
          {open.examples && (
            <div className={styles.accBody}>
              {LESSON.examples.map((ex) => (
                <div key={ex.id} className={styles.exampleRow}>
                  <div style={{ fontWeight: 700 }}>{ex.emoji} {ex.text}</div>
                  <div className={styles.muted}>{ex.notes}</div>
                  <div style={{ marginTop: 6 }}>
                    <button className={styles.play} onClick={() => speak(ex.text, rate)}>🔊</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className={`${styles.accHead} ${open.listening ? styles.open : ""}`} onClick={() => setOpen((o) => ({ ...o, listening: !o.listening }))}>
            <h3>🎧 Listening</h3><div className={styles.chev}>{open.listening ? "▲" : "▼"}</div>
          </div>
          {open.listening && (
            <div className={styles.accBody}>
              {LESSON.listening.map((l) => (
                <div key={l.id} className={styles.listenRow}>
                  <div>{l.text}</div>
                  <button className={styles.play} onClick={() => speak(l.text, rate)}>🔊</button>
                </div>
              ))}
            </div>
          )}

          <div className={`${styles.accHead} ${open.exercises ? styles.open : ""}`} onClick={() => setOpen((o) => ({ ...o, exercises: !o.exercises }))}>
            <h3>🎮 Juegos y ejercicios</h3><div className={styles.chev}>{open.exercises ? "▲" : "▼"}</div>
          </div>
          {open.exercises && (
            <div className={styles.accBody}>
              <h4>✏ Fill the blank</h4>
              <div>
                <div style={{ fontWeight: 700 }}>{LESSON.exercises.fill[fillIndex].prompt}</div>
                <input value={fillAnswer} onChange={(e) => setFillAnswer(e.target.value)} placeholder="Escribe la respuesta..." style={{ padding: 8, marginTop: 6, borderRadius: 8 }} />
                <div style={{ marginTop: 8 }}>
                  <button className={styles.bigBtn} onClick={checkFill}>Comprobar</button>
                  <button className={styles.bigBtn} onClick={() => { setFillIndex((i) => Math.max(0, i - 1)); setFillAnswer(""); }} style={{ marginLeft: 8 }}>◀</button>
                  <button className={styles.bigBtn} onClick={() => { setFillIndex((i) => Math.min(LESSON.exercises.fill.length - 1, i + 1)); setFillAnswer(""); }} style={{ marginLeft: 8 }}>▶</button>
                </div>
              </div>

              <hr style={{ margin: "12px 0" }} />

              <h4>🧩 Drag — Ordena la frase</h4>
              <div style={{ marginBottom: 8 }}>
                <button className={styles.bigBtn} onClick={() => setDragIdx((d) => Math.max(0, d - 1))}>◀</button>
                <span style={{ margin: "0 12px" }}>{dragIdx + 1} / {LESSON.exercises.drag.length}</span>
                <button className={styles.bigBtn} onClick={() => setDragIdx((d) => Math.min(LESSON.exercises.drag.length - 1, d + 1))}>▶</button>
              </div>

              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {LESSON.exercises.drag[dragIdx].words.slice().sort(() => Math.random() - 0.5).map((w, i) => (
                      <div key={i} draggable onDragStart={(e) => onDragStart(e, w)} className={styles.wordPill}>{w}</div>
                    ))}
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <div onDragOver={(e) => e.preventDefault()} onDrop={onDrop} className={styles.dropArea}>
                    {dropWords.map((w, i) => <div key={i} className={styles.wordPill} onClick={() => setDropWords((s) => s.filter((_, idx) => idx !== i))}>{w}</div>)}
                  </div>
                  <div style={{ marginTop: 8 }}>
                    <button className={styles.bigBtn} onClick={checkDrag}>Comprobar</button>
                    <button className={styles.bigBtn} onClick={() => setDropWords([])} style={{ marginLeft: 8 }}>Reset</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <footer className={styles.footer}>Hecho para ti, bestie 💙</footer>
      </main>
    </>
  );
}
