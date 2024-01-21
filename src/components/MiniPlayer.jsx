import { useRef, useState } from "react";
import ReactPlayer from "react-player";
import Classes from "../styles/MiniPlayer.module.css";

export default function MiniPlayer({id, title}) {
  const buttonRef = useRef()
  const [status, setStatus] = useState(false)
  const videoUrl = `https://www.youtube.com/watch?v=${id}`

  function toggleMiniplayer(){
    if(!status){
      buttonRef.current.classList.remove(Classes.floatingBtn)
      setStatus(true)
    }else{
      buttonRef.current.classList.add(Classes.floatingBtn)
      setStatus(false)
    }
  }

  return (
    <div className={`${Classes.miniPlayer} ${Classes.floatingBtn}`} ref={buttonRef} onClick={toggleMiniplayer}>
      <span className={`material-icons-outlined ${Classes.open}`}>
        {" "}
        play_circle_filled{" "}
      </span>
      <span className={`material-icons-outlined ${Classes.close}`} onClick={toggleMiniplayer}>
        {" "}
        close{" "}
      </span>
      <ReactPlayer url={videoUrl} width="300px" height="168px" playing={status} controls />
      <p>{title}</p>
    </div>
  );
}
