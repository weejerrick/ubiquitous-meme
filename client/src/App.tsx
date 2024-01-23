import { ChangeEvent, useState } from 'react'
import './App.css'
import { postData } from './api';

const MAX_LENGTH = 4096;
function App() {
  const [text, setText] = useState('');

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = () => {
    postData({
      data: text,
    })
  }

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
        <span>{text?.length}/{MAX_LENGTH}</span>
      </div>
      <div style={{ marginBottom: 20 }}>
        <label style={{display: 'block'}} htmlFor="image_upload">Choose images to upload (PNG, JPG)</label>
        <input
          id="image_upload"
          type="file"
          accept=".jpg, .jpeg, .png"
        />
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default App
