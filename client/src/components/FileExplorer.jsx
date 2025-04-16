import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from '../utils/Token';
// import './FileExplorer.css';

function FileExplorer({ onFileSelect }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const token = getToken();
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      
      const res = await axios.get('http://localhost:5000/api/code/files', config);
      setFiles(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch files');
      setLoading(false);
    }
  };

  const handleFileClick = (file) => {
    if (onFileSelect) {
      onFileSelect(file);
    }
  };

  const handleDelete = async (fileId, e) => {
    e.stopPropagation();
    
    if (window.confirm('Are you sure you want to delete this file?')) {
      try {
        const token = getToken();
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };
        
        await axios.delete(`http://localhost:5000/api/code/files/${fileId}`, config);
        fetchFiles(); // Refresh the file list
      } catch (err) {
        console.error(err);
        setError('Failed to delete file');
      }
    }
  };

  if (loading) {
    return <div>Loading files...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="file-explorer">
      <h3>Your Files</h3>
      <ul className="file-list">
        {files.length === 0 ? (
          <li className="no-files">No files found</li>
        ) : (
          files.map(file => (
            <li key={file._id} className="file-item" onClick={() => handleFileClick(file)}>
              <span className="file-name">{file.fileName}</span>
              <span className="file-language">{file.language}</span>
              <button 
                className="delete-button" 
                onClick={(e) => handleDelete(file._id, e)}
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
      <button className="new-file-button" onClick={() => onFileSelect(null)}>
        Create New File
      </button>
    </div>
  );
}

export default FileExplorer;