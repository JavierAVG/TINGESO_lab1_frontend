import React, { useState } from 'react';

const FileUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            setSelectedFile(file);
            setError('');
        } else {
            setError('Please select a valid PDF file.');
        }
    };

    const handleUpload = () => {
        if (selectedFile) {
            // Handle file upload (e.g., send to backend server)
            const formData = new FormData();
            formData.append('file', selectedFile);
        }
    };

    return (
        <div>
            <input type="file" accept="application/pdf" onChange={handleFileChange} />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button onClick={handleUpload} disabled={!selectedFile}>Upload</button>
        </div>
    );
};

export default FileUpload;