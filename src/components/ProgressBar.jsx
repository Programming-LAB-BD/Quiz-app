import { useRef, useState } from "react";
import Classes from "../styles/ProgressBar.module.css";
import Button from "./Button";

export default function ProgressBar({ next, prev, progress, submit }) {
  const [tooltip, setTooltip] = useState(false)

  const tooltipRef = useRef()

  function toggleTooltip(){
    if(tooltip){
      setTooltip(false)
      tooltipRef.current.style.display = "none"
    }else{
      setTooltip(true)
      tooltipRef.current.style.left = `calc(${progress}% - 65px)`
      tooltipRef.current.style.display = "block"
    }
  }

  return (
    <div className={Classes.progressBar}>
      <div className={Classes.backButton} onClick={prev}>
        <span className="material-icons-outlined"> arrow_back </span>
      </div>
      <div className={Classes.rangeArea}>
        <div className={Classes.tooltip} ref={tooltipRef}>{progress}% Complete!</div>
        <div className={Classes.rangeBody}>
          <div
            className={Classes.progress}
            style={{ width: `${progress}%` }}
            onMouseOver={toggleTooltip}
            onMouseOut={toggleTooltip}
          ></div>
        </div>
      </div>
      <Button
        className={Classes.next}
        onClick={progress === 100 ? submit : next}
      >
        <span>{progress === 100 ? "Submit Quiz" : "Next Question"}</span>
        <span className="material-icons-outlined"> arrow_forward </span>
      </Button>
    </div>
  );
}
