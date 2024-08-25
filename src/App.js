import React, { useState } from 'react';
import './App.css';  // Import the updated CSS file

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            const content = event.target.result.trim();
            console.log('Trimmed file content:', content);
            setJsonInput(content);
        };

        if (file) {
            reader.readAsText(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted');

        try {
            const parsedJson = JSON.parse(jsonInput);
            console.log('Parsed JSON:', parsedJson);

            const res = await fetch('https://limitless-crag-27911-b2adbd4242c9.herokuapp.com/bfhl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(parsedJson),
            });

            if (!res.ok) {
                console.error('Network response was not ok:', res.statusText);
                throw new Error('Network response was not ok');
            }

            const data = await res.json();
            console.log('Server Response:', data);
            setResponse(data);
        } catch (err) {
            console.error('Error occurred:', err);
            alert('Invalid JSON or network error');
        }
    };

    return (
        <div className="App">
            <h1>BFHL Frontend</h1>
            <form onSubmit={handleSubmit} className="upload-form">
                <input 
                    type="file"
                    accept=".json"
                    onChange={handleFileChange}
                    className="file-input"
                />
                <button type="submit" className="submit-button">Submit</button>
            </form>

            {response && (
                <div className="response-container">
                    <h2>Response from Server:</h2>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default App;
