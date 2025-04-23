import React from "react";
import "./base_n.css";

const History = ({ showHistoryMenu, setShowHistoryMenu, historyData }) => {
  console.log("History component received:", historyData);

  return (<>
    {showHistoryMenu && (
      <div className="menu">
        <a href="#" className="cancel" onClick={() => setShowHistoryMenu(false)}>
          Cancel
        </a>
        <p className="menu-title">Calculation History</p>
        <ul className="menu-list">
          {historyData.length === 0 ? (
            <li className="menu-item">No history available</li>
          ) : (
            historyData.map((item, index) => (
              <li key={index} className="menu-item">
                <div className="mb-1">
                  <h4 className="font-semibold text-sm text-blue-700">Calculation</h4>
                  <span>{item.expression} = <strong>{item.result}</strong></span>
                </div>
                <div className="text-xs text-gray-500">
                  <h4 className="font-semibold text-sm text-green-700">Date & Time</h4>
                  <span>
  {new Date(item.timestamp).toLocaleString('en-US', {
    hour12: true,
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit'
  })}
</span>

                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    )}
  </>
  
  
  );
};

export default History;
