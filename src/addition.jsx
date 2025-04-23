import React, { useState } from "react";

function add(a, b) {
  return parseFloat(a) + parseFloat(b);
}

export default function Calculator() {
  const [firstNumber, setFirstNumber] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const [operator, setOperator] = useState(null);
  const [display, setDisplay] = useState("0");

  const handleButtonClick = (value) => {
    // Handle number input
    if (!operator) {
      setFirstNumber((prev) => prev + value);
      setDisplay((prev) => (prev === "0" ? value : prev + value));
    } else {
      setSecondNumber((prev) => prev + value);
      setDisplay((prev) => prev + value);
    }
  };

  const handleOperatorClick = (op) => {
    setOperator(op);
    setDisplay((prev) => prev + op);
  };

  const handleEqualsClick = () => {
    if (firstNumber && secondNumber && operator === "+") {
      const result = add(firstNumber, secondNumber);
      setDisplay(result.toString());
      setFirstNumber(result.toString());
      setSecondNumber("");
      setOperator(null);
    }
  };

  return (
    <div>
      <div>{display}</div>
      <div>
        <button onClick={() => handleButtonClick("1")}>1</button>
        <button onClick={() => handleButtonClick("2")}>2</button>
        {/* More buttons... */}
        <button onClick={() => handleOperatorClick("+")}>+</button>
        <button onClick={handleEqualsClick}>=</button>
      </div>
    </div>
  );
}
