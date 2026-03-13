// components/Navbar.js
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";

export default function Navbar(){
  const [score,setScore] = useState(0);
  useEffect(()=> {
    try{
      const s = localStorage.getItem('frances_score');
      if(s) setScore(Number(s));
    }catch(e){}
  },[]);
  return (
    <nav style={{background:"linear-gradient(90deg,#fff,#fff)",padding:"12px 16px",boxShadow:"0 6px 18px rgba(16,24,40,0.04)"}}>
      <div style={{maxWidth:1100,margin:"0 auto",display:"flex",alignItems:"center",gap:12}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:44,height:44,borderRadius:10,background:"linear-gradient(135deg,#ff6b6b,#6b9bff)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800}}>FR</div>
          <div>
            <div style={{fontWeight:800}}>Frances Trainer</div>
            <div style={{fontSize:12,color:"var(--muted)"}}>Kid-friendly · voz fr-FR</div>
          </div>
        </div>

        <div style={{marginLeft:"auto",display:"flex",gap:8,alignItems:"center"}}>
          <Link href="/"><a className={styles.navLink}>Dashboard</a></Link>
          <Link href="/lesson/lesson-a"><a className={styles.navLink}>Lesson A</a></Link>
          <div style={{width:1,height:28,background:"#f1f5f9",margin:"0 8px"}}/>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <div style={{fontSize:12,color:"#475569"}}>Score</div>
            <div className="scoreBadge" style={{padding:"6px 10px",background:"linear-gradient(90deg,#fff,#fff)",border:"2px solid rgba(0,0,0,0.04)",fontWeight:700}}>{score}</div>
          </div>
        </div>
      </div>
    </nav>
  );
}
