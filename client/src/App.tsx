import { ChangeEvent, useState } from 'react'
import './App.css'

const MAX_LENGTH = 4096;
function App() {
  const [count, setCount] = useState(0);

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCount(e.target.value?.length);
  };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ margin: 0 }}>Malicious Code Detector 🚨</h1>
        <sub>Input your instructions here</sub>
      </div>
      <textarea maxLength={MAX_LENGTH} style={{ height: 200, width: 500 }} onChange={
        handleTextChange
      } />
      <div style={{ marginTop: 5, marginBottom: 20 }}>
        <span>{count}/{MAX_LENGTH}</span>
      </div>
      <div style={{ marginBottom: 20 }}>
        <input type="file" id="avatar" name="avatar"
          accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        />
      </div>
      <button>Submit</button>
    </div>
  )
}

export default App
