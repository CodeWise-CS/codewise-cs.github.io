import React from "react";
import Button from "../../components/Button";
import "./styles/FillQuestion.css";

function FillQuestion(props) {
  const [inputs, setInputs] = React.useState({});
  const [correct, setCorrect] = React.useState(null);
  let correctInputs = {};
  const [parsedContent, setParsedContent] = React.useState(
    parseString(props.text)
  );

  function parseString(str) {
    const parts = str.split(/(<@>.*?<@>)/g); // Split by the <@>...</@> pattern
    return parts.map((part, index) => {
      if (part.startsWith("<@>") && part.endsWith("<@>")) {
        const word = part.slice(3, -3); // Remove the <@> from start and end

        correctInputs[index] = word;

        return word.includes("\n") ? (
          <React.Fragment key={index}>
            <Input index={index} handleChange={handleChange} />
            {/* <input className="input-field" key={index} /> */}
            <br />
          </React.Fragment>
        ) : (
          <Input index={index} handleChange={handleChange} key={index} />
          // <input className="input-field" key={index} />
        );
      }
      return part.includes("\n") ? (
        <React.Fragment key={index}>
          <span className="code-text">{part.split("\n")[0]}</span>
          <br />
          <span className="code-text">{part.split("\n")[1]}</span>
        </React.Fragment>
      ) : (
        <span className="code-text" key={index}>
          {part}
        </span>
      );
    });
  }

  function handleChange(index, value) {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [index]: value,
    }));
  }

  function handleSubmit() {
    let tempCorrect = true;

    for (let key of Object.keys(correctInputs)) {
      if (correctInputs[key] !== inputs[key]) {
        tempCorrect = false;
      }
    }
    setCorrect(tempCorrect);
  }

  return (
    <div className="fill-question">
      <h3 className="white-text title">{props.question}</h3>
      <div
        className="input-container"
        style={{
          borderColor: correct ? "var(--success-color)" : "var(--white-color)",
        }}
      >
        {parsedContent}
      </div>
      {correct !== null && correct !== true && (
        <React.Fragment>
          <h4 className="answer-title">Correct answer:</h4>
          <p className="answer-text">{props.text.replaceAll("<@>", "")}</p>
        </React.Fragment>
      )}

      <Button
        text={correct === null ? "Submit" : "Next"}
        type="accent"
        bold={true}
        onClick={
          correct === null ? handleSubmit : () => props.nextQuestion(correct)
        }
        styles={{
          padding: "10px 24px",
          margin: "0 40px",
        }}
      />
    </div>
  );
}

function Input(props) {
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef(null);
  const spanRef = React.useRef(null);

  React.useEffect(() => {
    const span = spanRef.current;
    const input = inputRef.current;
    span.textContent = value;
    input.style.width = `${span.offsetWidth}px`;
  }, [value]);

  function handleChange(e) {
    setValue(e.target.value);
    props.handleChange(props.index, e.target.value);
  }

  return (
    <>
      <span ref={spanRef} className="hidden-span"></span>
      <input
        ref={inputRef}
        value={value}
        onChange={handleChange}
        className="dynamic-input"
      />
    </>
  );
}

export default FillQuestion;
