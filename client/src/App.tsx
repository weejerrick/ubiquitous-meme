import { useState } from 'react'
import './App.css'

const maxLength = 4096;
function App() {

  const [count, setCount] = useState(0);

  const handleTextChange = (e) => {
    setCount(e.target.value?.length);
  };

  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ margin: 0 }}>Malicious Code Detector 🚨</h1>
        <sub>Input your instructions here</sub>
      </div>
      <textarea maxLength={10} style={{ height: 200, width: 500 }} onChange={
        handleTextChange
      } />
      <div id="the-count">
        <span>{count}</span>
        <span>/ {maxLength}</span>
      </div>
    </>
  )
}

export default App
