import { ChangeEvent, useState } from 'react'
import './App.css'
import { postData } from './api';
import { checkXSS } from './utils';

const MAX_LENGTH = 4096;
const errorStates = {
  'NONE': 'None',
  'INVALID_BODY_MAX_LENGTH': 'Buffer Overflow',
  'INVALID_BODY_XSS': 'Cross Site Scripting',
  'INVALID_BODY_SQL': 'SQL Injection',
}
const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB

function App() {
  const [text, setText] = useState('');
  const [isMalicious, setIsMalicious] = useState('none')
  const [fileSize, setFileSize] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

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

  const handleSubmit = async () => {
    setIsSuccess(false)
    if (checkXSS(text)) {
      setIsMalicious('xss');
      return;
    }
    setIsMalicious('none')
    const res = await postData({
      data: text,
    })
    const { success, code } = res;
    if (code && !success) {
      setIsMalicious(code)
    } else {
      setIsSuccess(true)
    }
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
          <h2 style={{ margin: 5 }}>Malicious Code Suspected</h2>
          // @ts-ignore
          <h3>Vulnerability Type: {errorStates[isMalicious]}</h3>
        </div>
      )}
      {isSuccess && (
        <div style={{ marginTop: 30, height: 200, backgroundColor: '#AAFFB7', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <h2 style={{ margin: 5 }}>No Malicious Code Found</h2>
        </div>
      )}
    </div>
  )
}

export default App
