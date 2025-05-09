
import React from "react";
import "./conv.css";

const ConvBtnMenu = ({ showConvMenu, setShowConvMenu, shift, resetshift }) => {
  
  const conversions =  [
    "in ► cm",
    "cm ► in",
    "ft ► m",
    "m ► ft",
    "yd ► m",
    "m ► yd",
    "mile ► km",
    "km ► mile",
    "n mile ► m",
    "nm ► n mile",
    "acre ► m²",
    "m² ► acre",
    "pc ► km",
    "km ► pc",
    "oz ► g",
    "g ► oz",
    "lb ► kg",
    "kg ► lb",
    "pa ► atm",
    "atm ► pa"
  ];;

  const handleConversionClick = (conversion) => {
    console.log("Selected Conversion:", conversion);
    setShowConvMenu(false);
    resetshift();
  };

  return (
    <>
      {showConvMenu && (
        <div className="menu">
          <a href="#" className="cancel" onClick={() => setShowConvMenu(false)}>
            Cancel
          </a>
          <p className="menu-title">SELECT CONVERSION</p>
          <ul className="menu-list">
            {conversions.map((conversion, index) => (
              <li key={index} className="menu-item" onClick={() => handleConversionClick(conversion)}>
                {index + 1}: {conversion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default ConvBtnMenu;