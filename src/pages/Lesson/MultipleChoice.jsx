import React from "react";
import QuizButton from "./QuizButton";
import Button from "../../components/Button";
import "./styles/MultipleChoice.css";

function MultipleChoice(props) {
  const [enabled, setEnabled] = React.useState(true);
  const [correct, setCorrect] = React.useState(false);

  // const buttons = shuffle(
  const buttons = props.answers.map((item, index) => {
    return (
      <QuizButton
        enabled={enabled}
        onAnswer={handleAnswer}
        key={index}
        index={index}
        text={item.answer}
        correct={item.correct}
      />
    );
  });
  // );

  // function shuffle(array) {
  //   for (let i = array.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     const temp = array[i];
  //     array[i] = array[j];
  //     array[j] = temp;
  //   }
  //   return array;
  // }

  function handleAnswer(correct) {
    setCorrect(correct);
    setEnabled(false);
  }

  // add click function that is passed thorugh props. add enabled property to buttons

  return (
    <div className="multiple-choice">
      <h2 className="white-text title">{props.question}</h2>
      <div className="answer-container">{buttons}</div>
      {!enabled && (
        <Button
          text="Next"
          type="accent"
          bold={true}
          onClick={() => {
            props.nextQuestion(correct);
            setEnabled(true);
          }}
          styles={{
            padding: "10px 24px",
            margin: "0 40px",
          }}
        />
      )}
    </div>
  );
}

export default MultipleChoice;
