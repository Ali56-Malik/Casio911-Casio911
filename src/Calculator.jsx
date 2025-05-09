import React, { useState, useEffect } from "react";
import "./Calculator.css";
import leftarrow from "./img/left-removebg-preview.png";
import rightarrow from "./img/right-removebg-preview.png";
import down from "./img/down-removebg-preview.png";
import up from "./img/up-removebg-preview.png";
import ModeMenu from "./ModeMenu";
import HypeMenu from "./HypMenu";
import ShiftMenu from "./shift";
import ConstMenu from "./const";
import Graph from "./graph";
import ConvBtnMenu from "./conv";
import MatrixShift from "./matrix";
import BaseShift from "./base_n";
import CmplxShift from "./cmplx";
import StatsShift from "./stats";
import VectorShift from "./vector";
import { useRef } from "react";
import History from "./history";

function Calculator() {
  const[showsin,setsin]=useState(false)
  const [showHistory, setShowHistory] = useState(false);

  const [input, setInput] = useState("");
  const [answer, setanswer] = useState("");
  // const [cursorPosition, setCursorPosition] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedMode, setSelectedMode] = useState("MATH");
  const [showHypeMenu, setshowHypeMenu] = useState(false);
  const [shift, setshift] = useState(0);
  const [alpha, setalpha] = useState(0);
  const [shiftMenu, setshiftMenu] = useState(false);
  const [consmenu, setconsmenu] = useState(false);
  const [type, settype] = useState("degree");
  const [graph, setgraph] = useState(false);
  const [convmenu, setconvmenu] = useState(false);
  const [matrix, setmatrix] = useState(false);
  const [vector, setvctor] = useState(false);
  const [base, setbase] = useState(false);
  const [cmplx, setcmplx] = useState(false);
  const [stat, setstat] = useState(false);
  const [his, sethis] = useState(false);
  // const textAreaRef = useRef(null);
  const [selectedmatData, setSelectedmatData] = useState("");
  const [selectedvectData, setSelectedvectData] = useState("");
  const [historyData, setHistoryData] = useState([]);
  const [showHistoryMenu, setShowHistoryMenu] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const textAreaRef = useRef(null);

  let modebtntext = "Math";
  switch (selectedMode) {
    case "MATRIX":
      modebtntext = "Mat";
      break;
    case "CMPLX":
      modebtntext = "Cmlx";
      break;

    case "BASEN":
      modebtntext = "Base_n";
      break;
    case "STATISTICS":
      modebtntext = "Stat";
      break;
    case "EQUATION":
      modebtntext = "Equ";
      break;
    case "TABLE":
      modebtntext = "Table";
      break;
    case "VECTOR":
      modebtntext = "vect";
      break;
  }

  function hell() {
    alert("hell");
  }

  useEffect(() => {
    // Load existing history on mount
    const savedHistory = localStorage.getItem("calcHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const [history, setHistory] = useState([]);

  const addToHistory = (expression, result) => {
    const newEntry = {
      expression,
      result,
      timestamp: new Date().toISOString(),
    };
    const updatedHistory = [newEntry, ...history.slice(0, 49)]; // limit to 50 items

    setHistory(updatedHistory);
    localStorage.setItem("calcHistory", JSON.stringify(updatedHistory));
  };
  function insertAtCursor(value) {
    const textArea = textAreaRef.current;
    if (!textArea) return;

    let pos = textArea.selectionStart;

    const newInput = input.slice(0, pos) + value + input.slice(pos);

    setInput(newInput);
    const newPos = pos + value.length;
    setCursorPosition(newPos);

    setTimeout(() => {
      textArea.focus();
      textArea.setSelectionRange(newPos, newPos);
    }, 0);
  }

  function evaluateExpression(expression) {
    try {
      // Evaluates the arithmetic expression
      const result = eval(expression);
      return result;
    } catch (error) {
      // In case of an invalid expression, show error
      return "Error";
    }
  }

  const handleCalculation = () => {
    const result = evaluateExpression(input);
    setanswer(result); // Set the result in the answer area
    addToHistory(input, result); // Save history
  };

  function handleClick(value) {
    setInput((prevInput) => prevInput + value);
  }

  function handleCalculate() {
    handleCalculation();
  }
  
  

  const cursor = (direction) => {
    const textArea = textAreaRef.current;
    if (!textArea) return;

    textArea.focus();

    let pos = textArea.selectionStart;

    const textBeforeCursor = input.slice(0, pos);
    const lines = textBeforeCursor.split("\n");
    const currentLineIndex = lines.length - 1;
    const currentLinePosition = lines[currentLineIndex].length;

    if (direction === "left" && pos > 0) {
      pos -= 1;
    } else if (direction === "right" && pos < input.length) {
      pos += 1;
    } else if (direction === "up") {
      const prevLineLength = lines[currentLineIndex - 1]?.length || 0;
      pos = pos - currentLinePosition - 1 - prevLineLength;
      pos = Math.max(0, pos);
    } else if (direction === "down") {
      const afterCursor = input.slice(pos);
      const nextLine = afterCursor.split("\n")[1];
      const nextLineLength = nextLine?.length || 0;
      pos =
        pos +
        afterCursor.indexOf("\n") +
        1 +
        Math.min(currentLinePosition, nextLineLength);
      pos = Math.min(pos, input.length);
    }

    // ✅ update cursor visually
    textArea.setSelectionRange(pos, pos);

    // ✅ update internal state too
    setCursorPosition(pos);
  };

  const handleChange = (e) => {
    setInput(e.target.value);
    setCursorPosition(e.target.selectionStart);
  };

  useEffect(() => {
    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.focus();
      textArea.setSelectionRange(cursorPosition, cursorPosition);
    }
  }, [cursorPosition]);

  useEffect(() => {
    console.log("History state:", history);
  }, [history]);

  const MatrixDataSelect = (item) => {
    setInput((inp) => inp + item);
    setSelectedmatData(item);
  };

  const vectorDataSelect = (item) => {
    setInput((inp) => inp + item);
    setSelectedvectData(item);
  };

  function types() {
    switch (type) {
      case "degree":
        settype("radian");
        break;
      case "radian":
        settype("gradian");
        break;

      case "gradian":
        settype("degree");
        break;
    }
  }
  let text;

  switch (type) {
    case "degree":
      text = "DEG";
      break;
    case "radian":
      text = "RAD";
      break;
    case "gradian":
      text = "GRAD";
      break;
  }
  function integration() { 
    if (shift == 1) {
      setInput((inp) => inp + "∂"); // Only the integration symbol
    } else {
      setInput((inp) => inp + "∫("); // You already have this
    }
  }
  
  
  
  
  
  

  function sin() {
    if (shift === 1) {
      setInput((inp) => inp + "sin⁻¹(");
    } else {
      setInput((inp) => inp + "sin(");
    }
  }

  
  function cos() {
    if (shift === 1) {
      setInput((inp) => inp + "cos⁻¹(");
    } else {
      setInput((inp) => inp + "cos(");
    }
  }

  
  function tan() {
    if (shift === 1) {
      setInput((inp) => inp + "tan⁻¹(");
    } else {
      setInput((inp) => inp + "tan(");
    }
  }
  
  
 

  function seven() {
    if (shift == 1) {
      setconsmenu(true);
    } else {
      setInput((inp) => inp + "7");
    }
  }

  function eight() {
    if (shift == 1) {
      setconvmenu(true);
    } else {
      setInput((inp) => inp + "8");
    }
  }

  function four() {
    if (shift == 1 && selectedMode === "MATRIX") {
      setmatrix(true);
    } else {
      setInput((inp) => inp + "4");
    }
  }

  function five() {
    if (shift == 1 && selectedMode === "VECTOR") {
      setvctor(true);
    } else {
      setInput((inp) => inp + "5");
    }
  }

  function two() {
    if (shift == 1 && selectedMode === "CMPLX") {
      setcmplx(true);
    } else {
      setInput((inp) => inp + "2");
    }
  }

  function one() {
    if (shift == 1 && selectedMode === "STATISTICS") {
      setstat(true);
    } else {
      setInput((inp) => inp + "1");
    }
  }

  function three() {
    if (shift == 1 && selectedMode === "BASEN") {
      setbase(true);
    } else {
      setInput((inp) => inp + "3");
    }
  }
  function zero() {
    setInput((inp) => inp + "0");
  }
  function nine() {
    setInput((inp) => inp + "9");
  }

  function six() {
    setInput((inp) => inp + "6");
  }

  function divide() {
    setInput((inp) => inp + "/");
  }

  function mins() {
    setInput((inp) => inp + "-");
  }

  function plus() {
    setInput((inp) => inp + "+");
  }

  function mul() {
    setInput((inp) => inp + "*");
  }
  function cut() {
    if (cursorPosition <= 0) {
      // Just remove from end if cursor is at start
      setInput((inp) => inp.slice(0, -1));
      return;
    }

    setInput((prev) => {
      const before = prev.slice(0, cursorPosition - 1);
      const after = prev.slice(cursorPosition);
      const updated = before + after;

      const newCursorPos = cursorPosition - 1;
      setCursorPosition(newCursorPos);

      setTimeout(() => {
        const textArea = textAreaRef.current;
        if (textArea) {
          textArea.setSelectionRange(newCursorPos, newCursorPos);
        }
      }, 0);

      return updated;
    });
  }

  function clr() {
    setInput(" ");
    setanswer(" ");
  }

  function toggleShift() {
    setshift((prevShift) => {
      if (prevShift === 0) {
        setalpha(0);
        return 1;
      }
      return 0;
    });
  }
  function resetshift() {
    setshift(0);
  }

  function toggleAlpha() {
    setalpha((prevAlpha) => {
      if (prevAlpha === 0) {
        setshift(0);
        return 1;
      }
      return 0;
    });
  }

  function resetalpha() {
    setalpha(0);
  }

  let text_sa;
  if (shift === 1) {
    text_sa = "S";
  } else if (alpha === 1) {
    text_sa = "A";
  }

  function selectmode() {
    if (shift === 1) {
      setShowMenu(false);
      setshiftMenu(true);
    } else {
      setShowMenu(true);
      setshiftMenu(false);
    }
  }
  const handleCursorUpdate = () => {
    const textArea = textAreaRef.current;
    if (textArea) {
      setCursorPosition(textArea.selectionStart);
    }
  };

  return (
    <div className="calculatorContainer">
      <div className="mainView">
        <div className="textInputContainer">
          <textarea
            className="textInput"
            ref={textAreaRef}
            value={input}
            onChange={handleChange}
            onClick={handleCursorUpdate}
            onKeyUp={handleCursorUpdate}
          />

          <textarea className="answerTextArea" value={answer} readOnly />
        </div>

        <div className="modeContainer">
          <button className="modeBtn" onClick={types}>
            {text}
          </button>
          <button className="modeBtn">{modebtntext}</button>
          <button className="modeBtn3">{text_sa}</button>
          <button className="graphBtn" onClick={() => setgraph(true)}>
            GRAPH
          </button>
        </div>

        <div className="upperGrid">
          <button className="shiftBtn" onClick={toggleShift}>
            Shift
          </button>
          <button className="alphaBtn" onClick={toggleAlpha}>
            Alpha
          </button>

          <button className="arrowBtn" onClick={() => cursor("left")}>
            <img src={leftarrow} alt="Left Arrow" className="icon" />
          </button>
          <button className="arrowBtn" onClick={() => cursor("right")}>
            <img src={rightarrow} alt="Right Arrow" className="icon" />
          </button>

          <button className="modeBtn1" onClick={selectmode}>
            MODE
          </button>

          <div>
            {/* History Toggle Button */}
            <button
              onClick={() => setShowHistoryMenu(!showHistoryMenu)}
              className="modeBtn1"
            >
              His
            </button>

            {/* History Component */}
            <History
              showHistoryMenu={showHistoryMenu}
              setShowHistoryMenu={setShowHistoryMenu}
              historyData={history}
            />
          </div>

          {/* <button className="calcBtn">M+</button> */}

          <div>
            <p className="label">solve=</p>
            <button className="calcBtn">CALC</button>
          </div>
          <div>
            <p className="label">d/dx</p>
            <button className="calcBtn"onClick={integration}>
              ∫<sup>x</sup>
              <sub>y</sub>
            </button>
          </div>
          <button className="arrowBtn1">
            <img
              src={up}
              alt="Up Arrow"
              className="icon"
              onClick={() => cursor("up")}
            />
          </button>
          <button className="arrowBtn1">
            <img
              src={down}
              alt="Down Arrow"
              className="icon"
              onClick={() => cursor("down")}
            />
          </button>

          <div>
            <p className="label">x!</p>
            <button className="calcBtn">x⁻¹</button>
          </div>
          <div>
            <p className="label">∑</p>
            <button className="calcBtn">log₂y</button>
          </div>

          {/* Row 3 */}
          <div>
            <p className="label">x y/z ÷R</p>
            <button className="calcBtn">x/y</button>
          </div>
          <div>
            <p className="label">x&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mod</p>
            <button className="calcBtn">√x</button>
          </div>
          <div>
            <p className="label">x̅</p>
            <button className="calcBtn">x²</button>
          </div>
          <div>
            <p className="label">ⁿ√y</p>
            <button className="calcBtn">xʸ</button>
          </div>
          <div>
            <p className="label">10ˣ</p>
            <button className="calcBtn">Log</button>
          </div>
          <div>
            <p className="label">
              eˣ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;t
            </p>
            <button className="calcBtn">Ln</button>
          </div>

          <div>
            <p className="label">
              ∠&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a
            </p>
            <button className="calcBtn">(-)</button>
          </div>
          <div>
            <p className="label3">FACT&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b</p>
            <button className="calcBtn">° ' "</button>
          </div>
          <div>
            <p className="label">| x |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;c</p>
            <button className="calcBtn" onClick={() => setshowHypeMenu(true)}>
              hyp
            </button>
          </div>
          <div>
            <p className="label">sin⁻¹&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
            <button className="calcBtn" onClick={sin}>sin</button>
          </div>
          <div>
            <p className="label">cos⁻¹&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
            <button className="calcBtn" onClick={cos}>cos</button>
          </div>
          <div>
            <p className="label">tan⁻¹&nbsp;&nbsp;&nbsp;&nbsp;</p>
            <button className="calcBtn"onClick={tan}>tan</button>
          </div>

          <div>
            <p className="label3">STO&nbsp;&nbsp;CLRv</p>
            <button className="calcBtn">RCL</button>
          </div>
          <div>
            <p className="label">
              i&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cot
            </p>
            <button className="calcBtn">ENG</button>
          </div>
          <div>
            <p className="label">
              %&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cot⁻¹
            </p>
            <button className="calcBtn">(</button>
          </div>
          <div>
            <p className="label">
              ,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;x
            </p>
            <button className="calcBtn">)</button>
          </div>
          <div>
            <p className="label">x/y → y/z</p>
            <button className="calcBtn">S⇔D</button>
          </div>
          <div>
            <p className="label">M-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;m</p>
            <button className="calcBtn">M+</button>
          </div>
        </div>

        <div className="lowerGrid">
          <div>
            <p className="label1">CONST</p>
            <button className="numberBtn" onClick={() => handleClick("7")}>
              7
            </button>
          </div>
          <div>
            <p className="label1">CONV SI</p>
            <button className="numberBtn" onClick={eight}>
              8
            </button>
          </div>
          <div>
            <p className="label1">Limit</p>
            <button className="numberBtn" onClick={nine}>
              9
            </button>
          </div>
          <div>
            <p className="label1">&nbsp;</p>
            <button className="deleteBtn" onClick={cut}>
              ⌫
            </button>
          </div>

          <div>
            <p className="label1">CLR ALL</p>
            <button className="deleteBtn" onClick={clr}>
              AC
            </button>
          </div>

          <div>
            <p className="label1">MATRIX</p>
            <button className="numberBtn" onClick={four}>
              4
            </button>
          </div>
          <div>
            <p className="label1">VECTOR</p>
            <button className="numberBtn" onClick={five}>
              5
            </button>
          </div>
          <div>
            <p className="label1">FNC HELP</p>
            <button className="numberBtn" onClick={six}>
              6
            </button>
          </div>
          <div>
            <p className="label1">nCr&nbsp;&nbsp;&nbsp;GCD</p>

            <button className="operatorBtn" onClick={mul}>
              X
            </button>
          </div>

          <div>
            <p className="label1">nPr&nbsp;&nbsp;&nbsp;LCM</p>
            <button className="operatorBtn" onClick={divide}>
              ÷
            </button>
          </div>

          <div>
            <p className="label1">STAT</p>
            <button className="numberBtn" onClick={one}>
              1
            </button>
          </div>
          <div>
            <p className="label1">COMPLX</p>
            <button className="numberBtn" onClick={two}>
              2
            </button>
          </div>
          <div>
            <p className="label1">DISTR</p>
            <button className="numberBtn" onClick={three}>
              3
            </button>
          </div>
          <div>
            <p className="label1">Pol Cell</p>
            <button className="operatorBtn" onClick={plus}>
              +
            </button>
          </div>

          <div>
            <p className="label1">Rec Floor</p>
            <button className="operatorBtn" onClick={mins}>
              -
            </button>
          </div>

          <div>
            <p className="label1">copy paste </p>
            <button className="numberBtn" onClick={zero}>
              0
            </button>
          </div>
          <div>
            <p className="label1">&nbsp;Ran#RandInt</p>
            <button className="numberBtn">.</button>
          </div>
          <div>
            <p className="label1">
              π&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e
            </p>
            <button className="numberBtn">Exp</button>
          </div>
          <div>
            <p className="label1">Pre Ans</p>

            <button className="numberBtn">Ans</button>
          </div>

          <div>
            <p className="label1">HISTORY</p>
            <button className="equalsBtn" onClick={() => handleCalculate()}>
              =
            </button>
          </div>
        </div>
      </div>
      {showMenu && (
        <div className="modeMenuContainer">
          <ModeMenu
            showMenu={showMenu}
            setShowMenu={setShowMenu}
            setSelectedMode={setSelectedMode}
            shift={shift}
            reset={resetshift}
          />
        </div>
      )}

      {shiftMenu && (
        <div className="modeMenuContainer">
          <ShiftMenu
            showShiftMenu={shiftMenu}
            setShowShiftMenu={setshiftMenu}
            setSelectedMode={setSelectedMode}
            shift={shift}
            resetshift={resetshift}
          />
        </div>
      )}

      {showHypeMenu && (
        <div className="modeMenuContainer">
          <HypeMenu
            showHypeMenu={showHypeMenu}
            setShowHypeMenu={setshowHypeMenu}
            setSelectedMode={setSelectedMode}
          />
        </div>
      )}

      {consmenu && (
        <div className="modeMenuContainer">
          <ConstMenu
            showConstMenu={consmenu}
            setShowConstMenu={setconsmenu}
            setSelectedMode={setSelectedMode}
            shift={shift}
            resetshift={resetshift}
          />
        </div>
      )}

      {convmenu && (
        <div className="modeMenuContainer">
          <ConvBtnMenu
            showConvMenu={convmenu}
            setShowConvMenu={setconvmenu}
            setSelectedMode={setSelectedMode}
            shift={shift}
            resetshift={resetshift}
          />
        </div>
      )}

      {matrix && (
        <div className="modeMenuContainer">
          <MatrixShift
            showMatrixMenu={matrix}
            setShowMatrixMenu={setmatrix}
            onDataSelect={MatrixDataSelect}
            shift={shift}
            resetshift={resetshift}
          />
        </div>
      )}

      {vector && (
        <div className="modeMenuContainer">
          <VectorShift
            showVectorMenu={vector}
            setShowVectorMenu={setvctor}
            shift={shift}
            resetshift={resetshift}
            onDataSelect={vectorDataSelect}
          />
        </div>
      )}

      {base && (
        <div className="modeMenuContainer">
          <BaseShift
            showBaseMenu={base}
            setShowBaseMenu={setbase}
            setSelectedMode={setSelectedMode}
            shift={shift}
            resetshift={resetshift}
          />
        </div>
      )}

      {cmplx && (
        <div className="modeMenuContainer">
          <CmplxShift
            showCmplxMenu={cmplx}
            setShowCmplxMenu={setcmplx}
            setSelectedMode={setSelectedMode}
            shift={shift}
            resetshift={resetshift}
          />
        </div>
      )}

      {stat && (
        <div className="modeMenuContainer">
          <StatsShift
            showStatsMenu={stat}
            setShowStatsMenu={setstat}
            setSelectedMode={setSelectedMode}
            shift={shift}
            resetshift={resetshift}
          />
        </div>
      )}

      {graph && <Graph onClose={() => setgraph(false)} />}
      {his && (
        <div className="modeMenuContainer">
          <History
            showhistoryMenu={his}
            setShowhisMenu={sethis}
            setSelectedMode={setSelectedMode}
          />
        </div>
      )}
    </div>
  );
}

export default Calculator;
