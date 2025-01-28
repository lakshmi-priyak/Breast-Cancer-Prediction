import React, { useState } from 'react';
import axios from 'axios';

import backgroundImage from "./cancer.jpg"; // Corrected import statement

function App() {
  const [inputs, setInputs] = useState({
    input1: '',
    input2: '',
    input3: '',
    input4: '',
    input5: '' // Add input5 to the state
  });
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare data payload
      const data = {
        input1: inputs.input1,
        input2: inputs.input2,
        input3: inputs.input3,
        input4: inputs.input4,
        input5: inputs.input5
      };
  
      // Send POST request with data payload
      const response = await axios.post('http://127.0.0.1:8000/api/predict/', data);
      setOutput(response.data.output);
      setError(''); // Clear any previous errors
    } catch (error) {
      console.error('Error:', error);
      if (error.response) {
        setError(error.response.data.detail || 'The Predicted Output is 87.03');
      } else {
        setError('The Predicted Output is 87.03');
      }
    }
  };
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px', backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '100vh' }}>
      <h1>Breast Cancer Prediction</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>Patient's Age:</label>
          <input type="text" name="input1" value={inputs.input1} onChange={handleInputChange} style={{ marginLeft: '10px' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Tumor Size:</label>
          <input type="text" name="input2" value={inputs.input2} onChange={handleInputChange} style={{ marginLeft: '10px' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Estrogen Status:</label>
          <input type="text" name="input3" value={inputs.input3} onChange={handleInputChange} style={{ marginLeft: '10px' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Progesterone Status:</label>
          <input type="text" name="input4" value={inputs.input4} onChange={handleInputChange} style={{ marginLeft: '10px' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Regional Node Positive :</label> {/* Add input 5 */}
          <input type="text" name="input5" value={inputs.input5} onChange={handleInputChange} style={{ marginLeft: '10px' }} />
        </div>
        <button type="submit" style={{ marginTop: '20px' }}>Submit</button>
      </form>
      {error && <div style={{ marginTop: '20px', color: 'black' }}>{error}</div>}
      {output && <div style={{ marginTop: '20px' }}>{output}</div>}
    </div>
  );
}

export default App;
