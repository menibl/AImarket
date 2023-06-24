import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SelectModel() {
  const [selectedModel, setSelectedModel] = useState('');
  const [models, setModels] = useState([]);

  useEffect(() => {
    fetchModels();
  }, []);
  const fetchModels = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/AIModelObject');
      setModels(response.data);
    } catch (error) {
      console.error('Error fetching Models:', error);
    }
  };
  
  

  /*const fetchModels = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/modelFinder');
      const modelsArray = Object.entries(response.data).map(([name, value]) => ({ name, value }));
      setModels(modelsArray);
    } catch (error) {
      console.error('Error fetching Models:', error);
    }
  };*/

  const handleSelectChange = (selectedValue) => {
    setSelectedModel(selectedValue);
  };

  return (
    <div className="App">
      <h1>Choose Model</h1>
      <div>
        <select
          id="model"
          value={selectedModel}
          onChange={(e) => handleSelectChange(e.target.value)}
        >
          <option value="">בחר אובייקט</option>
          {models.map((option, index) => (
            <option key={index} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        <h2>The models are:</h2>
     
      </div>
    </div>
  );
}

export default SelectModel;




/*import React, { useState, useEffect } from 'react';
import axios from 'axios';


function SelectModel() {
  const [selectedModel, setSelectedModel] = useState('');
  const [Model, setModel] = useState([]);

  useEffect(() => {
    fetchModel();
  }, []);
  const fetchModel = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/modelFinder');
      const modelArray = Object.entries(response.data).map(([name, value]) => ({ name, value }));
      setModel(modelArray);
    } catch (error) {
      console.error('Error fetching Model:', error);
    }
  };
  
  /*const fetchModel = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/modelFinder');
      setModel(response.data);
    } catch (error) {
      console.error('Error fetching Model:', error);
    }
  };

  const handleSelectChange = (selectedValue) => {
    setSelectedModel(selectedValue);
  };

  return (
    <div className="App">
      <h1>chose Model</h1>
      <div>
        <select
          id="model"
          value={selectedModel}
          onChange={(e) => handleSelectChange(e.target.value)}
        >
          <option value="">בחר אובייקט</option>
          {Model.map((option, index) => (
            <option key={index} value={option._id}>
              {option}
            </option>
          ))}
        </select>
        <h2>The models are:</h2>
        <ul>
          {Model.map((option, index) => (
            <li key={index}>{option.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SelectModel;*/
