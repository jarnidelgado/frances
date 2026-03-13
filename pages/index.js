// pages/index.js
import Link from "next/link";
import lessons from "../data/lessons.json";
import ProgressBar from "../components/ProgressBar";
import { useEffect, useState } from "react";

export default function Dashboard(){
  const [progressMap,setProgressMap] = useState({});
  useEffect(()=> {
    try{
      const raw = localStorage.getItem('frances_progress') || '{}';
      setProgressMap(JSON.parse(raw));
    }catch(e){}
  },[]);

  // calculate overall score
  const totalScore = Object.values(progressMap).reduce((s, v) => s + (v.score||0), 0);

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
        <div>
          <h2 style={{margin:0}}>Tus lecciones</h2>
          <div style={{color:"var(--muted)"}}>Sigue practicando — tu progreso se guarda localmente.</div>
        </div>
        <div style={{textAlign:"right"}}>
          <div style={{fontSize:12,color:"var(--muted)"}}>Score total</div>
          <div style={{fontWeight:800,fontSize:18}}>{totalScore}</div>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        {Object.keys(lessons).map(k => {
          const L = lessons[k];
          const prog = progressMap[L.id] || { percent:0, score:0 };
          return (
            <div className="card" key={L.id} style={{padding:14}}>
              <h3 style={{marginTop:0}}>{L.title}</h3>
              <p style={{color:"var(--muted)"}}>{L.vocab.length} vocab • {L.examples.length} ejemplos</p>
              <ProgressBar percent={prog.percent||0} />
              <div style={{display:"flex",justifyContent:"space-between",marginTop:12,alignItems:"center"}}>
                <Link href={`/lesson/${L.id}`}><a className="btn">Abrir lección</a></Link>
                <div style={{color:"var(--muted)",fontWeight:700}}>{prog.score||0} pts</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
