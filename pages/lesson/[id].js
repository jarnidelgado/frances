// pages/lesson/[id].js
import { useRouter } from "next/router";
import lessons from "../../data/lessons.json";
import FillList from "../../components/FillList";
import DragGame from "../../components/DragGame";
import ProgressBar from "../../components/ProgressBar";
import ConfettiBurst from "../../components/ConfettiBurst";
import { useEffect, useState } from "react";

export default function LessonPage(){
  const router = useRouter();
  const { id } = router.query;
  const lesson = id ? Object.values(lessons).find(l => l.id === id) : null;
  const [fire, setFire] = useState(false);
  const [progress, setProgress] = useState({ percent:0, score:0 });

  useEffect(()=> {
    if(!id) return;
    try{
      const raw = localStorage.getItem('frances_progress') || '{}';
      const map = JSON.parse(raw);
      if(map[id]) setProgress(map[id]);
    }catch(e){}
  },[id]);

  function saveProgress(newProgress){
    setProgress(newProgress);
    try{
      const raw = localStorage.getItem('frances_progress') || '{}';
      const map = JSON.parse(raw);
      map[id] = newProgress;
      localStorage.setItem('frances_progress', JSON.stringify(map));
      // also save global score
      const total = Object.values(map).reduce((s,v)=> s + (v.score||0), 0);
      localStorage.setItem('frances_score', String(total));
    }catch(e){}
  }

  function handleFillCheck({ id:fid, answer }){
    const ex = lesson.exercises.fill.find(f=> f.id === fid);
    const normalize = (s) => (s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().toLowerCase();
    const ok = ex.answers.map(a => normalize(a)).includes(normalize(answer));
    if(ok){
      setFire(true);
      const next = { percent: Math.min(100,(progress.percent||0)+15), score: (progress.score||0)+10 };
      saveProgress(next);
    } else {
      // visual negative feedback — pulse red
      const next = { ...progress };
      saveProgress(next);
      // we don't penalize
    }
  }

  return (
    <>
      <ConfettiBurst fire={fire} />
      <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:12}}>
        <div style={{flex:1}}>
          <h2 style={{margin:0}}>{lesson?.title || 'Cargando...'}</h2>
          <div style={{color:"var(--muted)"}}>{lesson?.vocab.length || 0} vocab • {lesson?.examples.length || 0} ejemplos</div>
        </div>
        <div style={{width:220}}>
          <div style={{fontSize:12,color:"var(--muted)"}}>Progreso</div>
          <ProgressBar percent={progress.percent||0} />
          <div style={{marginTop:8,fontWeight:700}}>{progress.score||0} pts</div>
        </div>
      </div>

      {lesson && (
        <div className="card" style={{padding:14}}>
          <h3>Vocabulario</h3>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {lesson.vocab.map(v=> <div key={v.word} style={{minWidth:140}}><div style={{fontSize:28}}>{v.emoji}</div><div style={{fontWeight:700}}>{v.word}</div><div style={{color:"var(--muted)"}}>{v.phon}</div></div>)}
          </div>

          <hr style={{margin:"12px 0"}} />

          <FillList fills={lesson.exercises.fill} onCheck={handleFillCheck} />

          <hr style={{margin:"12px 0"}} />

          <DragGame exercises={lesson.exercises.drag} />
        </div>
      )}
    </>
  );
}
