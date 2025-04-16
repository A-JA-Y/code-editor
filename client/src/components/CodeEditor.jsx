import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import { getToken } from '../utils/Token';

function CodeEditor() {
  const [code, setCode] = useState('// Write your code here');
  const [language, setLanguage] = useState('javascript');
  const [theme, setTheme] = useState('vs-dark');
  const [fileName, setFileName] = useState('untitled.js');
  const [message, setMessage] = useState('');
  
  const handleEditorChange = (value) => {
    setCode(value);
  };
  
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    
    // Update file extension based on language
    const name = fileName.split('.')[0];
    let extension = 'js';
    
    switch(e.target.value) {
      case 'javascript':
        extension = 'js';
        break;
      case 'python':
        extension = 'py';
        break;
      case 'java':
        extension = 'java';
        break;
      case 'csharp':
        extension = 'cs';
        break;
      case 'typescript':
        extension = 'ts';
        break;
      default:
        extension = 'txt';
    }
    
    setFileName(`${name}.${extension}`);
  };
  
  const handleFileNameChange = (e) => {
    setFileName(e.target.value);
  };
  
  const saveCode = async () => {
    try {
      const token = getToken();
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };
      
      const body = JSON.stringify({
        fileName,
        language,
        code
      });
      
      await axios.post('http://localhost:5000/api/code/save', body, config);
      setMessage('Code saved successfully!');
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setMessage('');
      }, 3000);
    } catch (err) {
      console.error(err);
      setMessage('Error saving code. Please try again.');
    }
  };
  
  return (
    <div className="code-editor-container">
      <div className="editor-header">
        <input
          type="text"
          value={fileName}
          onChange={handleFileNameChange}
          className="file-name-input"
        />
        
        <select 
          value={language}
          onChange={handleLanguageChange}
          className="language-select"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="csharp">C#</option>
          <option value="typescript">TypeScript</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
        </select>
        
        <select 
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="theme-select"
        >
          <option value="vs">Light</option>
          <option value="vs-dark">Dark</option>
        </select>
        
        <button onClick={saveCode} className="save-button">
          Save
        </button>
      </div>
      
      {message && <div className="message">{message}</div>}
      
      <Editor
        height="70vh"
        language={language}
        theme={theme}
        value={code}
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: true },
          fontSize: 14,
          automaticLayout: true,
          wordWrap: 'on',
          lineNumbers: 'on',
          scrollBeyondLastLine: false
        }}
      />
    </div>
  );
}

export default CodeEditor;