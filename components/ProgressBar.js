// components/ProgressBar.js
export default function ProgressBar({ percent = 0 }) {
  return (
    <div className="progressWrap" style={{width:"100%"}}>
      <div className="progressBar" style={{width:`${Math.min(100,Math.max(0,percent))}%`}} />
    </div>
  );
}
