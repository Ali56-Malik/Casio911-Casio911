import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "./graph.css"

const Graph = ({ onClose }) => {
  const data = Array.from({ length: 21 }, (_, i) => {
    let x = i - 10;
    return { x: x, y: x * x };
  });

  return (
    <div className="graph-overlay">
      <div className="graph-container">
        <button className="cancel-btn" onClick={onClose}>✖</button>
        <div className="graph-content">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 20,
                right: 20,
                left: 20,
                bottom: 20,
              }}
            >
              <XAxis 
                dataKey="x" 
                tick={{ fill: '#fff' }}
                axisLine={{ stroke: '#fff' }}
              />
              <YAxis 
                tick={{ fill: '#fff' }}
                axisLine={{ stroke: '#fff' }}
              />
              <CartesianGrid 
                stroke="rgba(255, 255, 255, 0.3)" 
                strokeDasharray="3 3" 
              />
              <Tooltip
                contentStyle={{
                  background: '#222',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                }}
              />
              <Legend
                wrapperStyle={{
                  paddingTop: '10px',
                }}
              />
              <Line 
                type="monotone" 
                dataKey="y" 
                stroke="#00c3ff" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Graph;