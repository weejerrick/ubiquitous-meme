import { ChangeEvent, useState } from 'react'
import './App.css'
import { postData } from './api';
import { checkXSS } from './utils';

const MAX_LENGTH = 4096;
const errorStates = {
  'none': 'None',
  'xss': 'XSS',
}
const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB

function App() {
  const [text, setText] = useState('');
  const [isMalicious, setIsMalicious] = useState('none')
  const [fileSize, setFileSize] = useState(0);

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        alert('File size exceeds the maximum limit');
        e.target.value = ''; // Remove the selected file
        setFileSize(0); // Reset the file size state
        return;
      } else {
        setFileSize(file.size);
      }
    }
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
          onChange={handleFileChange}
        />
      </div>
      <div>
        <span>File size: {fileSize} bytes</span>
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
