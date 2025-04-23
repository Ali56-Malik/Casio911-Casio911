import React from 'react'
import { useState } from 'react';

export default function Sum() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  
   const hoor=async()=>{
    try{
      const resp=await fetch(`http://127.0.0.1:5000/api/some?numb1=${num1}&numb2=${num2}`
      )
      // const data=await resp.json()
      if (resp.ok){
        console.log("fu me",resp.status)
      }
      const data=await resp.json()
      console.log(data)
      

    }catch(error){
      console.log("love u")
    }

  }
  return (
    
    <div style={{ padding: '20px' }}>
            <h1>Number Addition API</h1>
            <input
                type="text"
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
                placeholder="Enter first number"
            />
            <br />
            <input
                type="text"
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
                placeholder="Enter second number"
            />
            <br />
             <button onClick={hoor}>Add Numbers</button>
             

        </div>
  )
}
