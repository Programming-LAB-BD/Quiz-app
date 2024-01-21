import { useMemo } from "react";
import successImage from "../assets/images/success.png";
import useFetchAPI from "../hooks/useFetchAPI";
import Classes from "../styles/Summary.module.css";

export default function Summary({ score, noq }) {
  const keyword = useMemo(() => {
    if((score / (noq * 5)) * 100 < 50){
      return "failed"
    }else if((score / (noq * 5)) * 100 < 75){
      return "good"
    }else if((score / (noq * 5)) * 100 < 100){
      return "very good"
    }else {
      return "fantastic"
    }
  }, [score, noq])

  const {loading, error, result} = useFetchAPI(
    `https://api.pexels.com/v1/search?query=${keyword}&per_page=1`,
    "GET",{
      Authorization: import.meta.env.REACT_APP_PEXELS_API_KEY
    }
  )
  
  const image = result?.photos[0].src.medium !== undefined ? result?.photos[0].src.medium : successImage

  return (
    <div className={Classes.summary}>
      <div className={Classes.point}>
        <p className={Classes.score}>
          Your score is <br />
          {score} out of {noq * 5}
        </p>
      </div>

      {loading && <div className={Classes.badge}>Your badge is loading...</div>}
      {error && <div className={Classes.badge}>An Error occured.</div>}
      {!loading && !error && (
      <div className={Classes.badge}>
        <img src={image} alt="Success" />
      </div>
      )}
    </div>
  );
}
