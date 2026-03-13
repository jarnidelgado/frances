// pages/index.js
import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import Accordion from "../components/Accordion";
import FillList from "../components/FillList";
import DragGame from "../components/DragGame";
import lessons from "../data/lessons.json";

const LESSON = lessons.lessonA;

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

  function handleCheckFill({ id, answer }) {
    const ex = LESSON.exercises.fill.find((f) => f.id === id);
    const normalize = (s) => (s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();
    const ok = ex.answers.map(a => normalize(a)).includes(normalize(answer));
    alert(ok ? "✅ Correcto" : "❌ Intenta otra vez");
  }

  return (
    <>
      <Head><title>Frances Trainer — Lección A</title></Head>
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
          <input className={styles.range} type="range" min="0.6" max="1.4" step="0.05" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
        </section>

        <div className={styles.card}>
          <Accordion title="📚 Vocabulario" open={open.vocab} onToggle={() => setOpen(o => ({...o, vocab: !o.vocab}))}>
            {LESSON.vocab.map(v => (
              <div key={v.word} className={styles.vocabRow}>
                <div className={styles.emoji}>{v.emoji}</div>
                <div style={{flex:1}}>
                  <div className={styles.word}>{v.word}</div>
                  <div className={styles.phon}>{v.phon}</div>
                </div>
                <div style={{marginLeft:12}}>{v.trans}</div>
                <div><button className={styles.play} onClick={() => speak(v.word, rate)}>🔊</button></div>
              </div>
            ))}
          </Accordion>

          <Accordion title="✍️ Frases de ejemplo" open={open.examples} onToggle={() => setOpen(o => ({...o, examples: !o.examples}))}>
            {LESSON.examples.map(ex => (
              <div key={ex.id} className={styles.exampleRow}>
                <div style={{fontWeight:700}}>{ex.emoji} {ex.text}</div>
                <div className={styles.muted}>{ex.notes}</div>
                <div style={{marginTop:6}}><button className={styles.play} onClick={() => speak(ex.text, rate)}>🔊</button></div>
              </div>
            ))}
          </Accordion>

          <Accordion title="🎧 Listening" open={open.listening} onToggle={() => setOpen(o => ({...o, listening: !o.listening}))}>
            {LESSON.listening.map(l => (
              <div key={l.id} className={styles.listenRow}>
                <div>{l.text}</div>
                <button className={styles.play} onClick={() => speak(l.text, rate)}>🔊</button>
              </div>
            ))}
          </Accordion>

          <Accordion title="🎮 Juegos y ejercicios" open={open.exercises} onToggle={() => setOpen(o => ({...o, exercises: !o.exercises}))}>
            <FillList fills={LESSON.exercises.fill} onCheck={handleCheckFill} rate={rate} />
            <hr style={{margin:"12px 0"}} />
            <DragGame exercises={LESSON.exercises.drag} rate={rate} />
          </Accordion>
        </div>

        <footer className={styles.footer}>Hecho para ti, bestie 💙</footer>
      </main>
    </>
  );
}
