import React from "react";
import "./styles/QuizButton.css";

function QuizButton(props) {
  const [buttonClass, setButtonClass] = React.useState("");

  React.useEffect(() => {
    if (props.correct && !props.enabled) setButtonClass("correct");
    else if (props.enabled) setButtonClass("");
  }, [props.enabled]);

  function handleClick() {
    if (props.enabled) {
      setButtonClass(props.correct ? "correct" : "incorrect");
      props.onAnswer(props.correct);
    }
  }

  return (
    <button onClick={handleClick} className={`quiz-button ${buttonClass}`}>
      {props.text}
      <div className="circle"></div>
    </button>
  );
}

export default QuizButton;
