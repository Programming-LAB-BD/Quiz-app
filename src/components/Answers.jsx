import { Fragment } from "react";
import Classes from "../styles/Answers.module.css";
import CheckBox from "./CheckBox";

export default function Answers({ options = [], handleChange, input }) {
  return (
    <div className={Classes.answers}>
      {options.map((option, index) => (
        <Fragment key={index}>
          {input ? (
            <CheckBox
            className={Classes.answer}
            text={option.title}
            value={index}
            checked={option.checked}
            onChange={(e) => handleChange(e, index)}
            key={Math.random()}
          />
          ) : (
            <CheckBox
          className={`${Classes.answer} ${
            option.correct ? Classes.correct : option.checked ? Classes.wrong : null
          }`}
          text={option.title}
          defaultChecked={option.checked}
          disabled
          key={Math.random()}
        />
          )}
        </Fragment>
      ))}
    </div>
  );
}
