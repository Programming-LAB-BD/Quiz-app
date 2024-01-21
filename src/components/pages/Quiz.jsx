import { getDatabase, ref, set } from "firebase/database";
import _ from "lodash";
import { useEffect, useReducer, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import useQuestions from "../../hooks/useQuestions";
import Answers from "../Answers";
import MiniPlayer from "../MiniPlayer";
import ProgressBar from "../ProgressBar";

let questionsClone = "";
const initialState = null;
const reducer = (state, action) => {
  switch (action.type) {
    case "questions":
      action.value.forEach((question) => {
        question.options.forEach((option) => {
          option.checked = false;
        });
      });
      return action.value;
    case "answer":
      questionsClone = _.cloneDeep(state);
      questionsClone[action.questionID].options[action.optionIndex].checked =
        action.value;
      return questionsClone;
    default:
      state;
  }
};

export default function Quiz() {
  const { id } = useParams();
  const { loading, error, questions } = useQuestions(id);
  const [currentQueston, setCurrentQuestion] = useState(0);

  const [qna, dispatch] = useReducer(reducer, initialState);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation()

  const { videoTitle } = location.state || {};



  useEffect(() => {
    dispatch({
      type: "questions",
      value: questions,
    });
  }, [questions]);

  useEffect(() => {}, []);

  const handleChange = (e, index) => {
    dispatch({
      type: "answer",
      questionID: currentQueston,
      optionIndex: index,
      value: e.target.checked,
    });
  };

  const nextQuestion = () => {
    if (currentQueston + 1 < questions.length) {
      setCurrentQuestion((prevCurrentQuestion) => prevCurrentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQueston >= 1 && currentQueston <= questions.length) {
      setCurrentQuestion((prevCurrentQuestion) => prevCurrentQuestion - 1);
    }
  };

  const submit = async () => {
    const { uid } = currentUser;

    const db = getDatabase();
    const resultRef = ref(db, `result/${uid}`);

    await set(resultRef, {
      [id]: qna,
    });

    navigate(`/result/${id}`, {
      state: {
        qna,
      },
    });
  };

  const parcentage =
    questions.length > 0 ? ((currentQueston + 1) / questions.length) * 100 : 0;

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>There was an error!</div>}
      {!loading && !error && qna && qna.length > 0 && (
        <>
          <h1>{qna[currentQueston].title}</h1>
          <h4>Question can have multiple answers</h4>
          <Answers
            options={qna[currentQueston].options}
            handleChange={handleChange}
            input
          />
          <ProgressBar
            next={nextQuestion}
            prev={prevQuestion}
            progress={parcentage}
            submit={submit}
          />
          <MiniPlayer id={id} title={videoTitle} />
        </>
      )}
    </>
  );
}
