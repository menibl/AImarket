import React, { useState, useEffect } from 'react';
import axios from 'axios';


function SelectOptions() {
  const [selectedMessages, setSelectedMessages] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/messages');
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSelectChange = (selectedValue) => {
    setSelectedMessages(selectedValue);
  };

  return (
    <div className="App">
      <h1>Select Options from MongoDB</h1>
      <div>
        <select
          id="model"
          value={selectedMessages}
          onChange={(e) => handleSelectChange(e.target.value)}
        >
          <option value="">בחר אובייקט</option>
          {messages.map((option, index) => (
            <option key={index} value={option._id}>
              {option.name}
            </option>
          ))}
        </select>
        <h2>The options are:</h2>
        <ul>
          {messages.map((option, index) => (
            <li key={index}>{option.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SelectOptions;
