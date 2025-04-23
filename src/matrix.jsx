import React, { useState } from "react";
import "./matrix.css";

const MatrixShift = ({ showMatrixMenu, setShowMatrixMenu, shift, resetshift, onDataSelect }) => {
  
  const [selectedItem, setSelectedItem] = useState(null);

  const conversions = ["matA", "matB", "matC", "Data", "Transpose", "Determinant"];
  const dataSubMenu = ["MatA", "MatB", "MatC"];

  const handleConversionClick = (matrix) => {
    if (matrix === "Data") {
      setSelectedItem("Data"); 
    } else {
      console.log("Selected Conversion:", matrix);
      setShowMatrixMenu(false);
      resetshift();
    }
  };

  const handleDataClick = async (item) => {
    console.log(`Data selected for: ${item}`);

    // Send selected data back to the main component
    onDataSelect(item); 
    
    setShowMatrixMenu(false);
    setSelectedItem(null);
  };

  return (
    <>
      {showMatrixMenu && !selectedItem && (
        <div className="menu">
          <a href="#" className="cancel" onClick={() => setShowMatrixMenu(false)}>
            Cancel
          </a>
          <p className="menu-title">MATRIX</p>
          <ul className="menu-list">
            {conversions.map((conversion, index) => (
              <li
                key={index}
                className="menu-item"
                onClick={() => handleConversionClick(conversion)}
              >
                {index + 1}: {conversion}
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedItem === "Data" && (
        <div className="menu">
          <a href="#" className="cancel" onClick={() => setSelectedItem(null)}>
            Cancel
          </a>
          <p className="menu-title">DATA</p>
          <ul className="menu-list">
            {dataSubMenu.map((value, index) => (
              <li
                key={index}
                className="menu-item"
                onClick={() => handleDataClick(value)}
              >
                {index + 1}: {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default MatrixShift;
