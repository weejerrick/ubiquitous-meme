import { ChangeEvent, useState } from 'react'
import './App.css'
import { postData } from './api';
import { checkXSS } from './utils';

const MAX_LENGTH = 4096;

const errorStates = {
  'none': 'None',
  'xss': 'XSS',
}

function App() {
  const [text, setText] = useState('');
  const [isMalicious, setIsMalicious] = useState('none')

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = () => {
    if (checkXSS(text)) {
      setIsMalicious('xss');
      return;
    }
    setIsMalicious('none')
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
        <label style={{ display: 'block' }} htmlFor="image_upload">Choose images to upload (PNG, JPG)</label>
        <input
          id="image_upload"
          type="file"
          accept=".jpg, .jpeg, .png"
        />
      </div>
      <button onClick={handleSubmit}>Submit</button>
      {isMalicious !== 'none' && (
        <div style={{ marginTop: 30, height: 200, backgroundColor: '#ACFFAA', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <h2 style={{margin: 5}}>Malicious Code Suspected</h2>
          <h3>Vulnerability Type: {errorStates.xss}</h3>
        </div>
      )}
    </div>
  )
}

export default App
