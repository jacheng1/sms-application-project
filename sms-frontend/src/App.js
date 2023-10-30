import messageLogo from './messageLogo.png';
import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // memory storage
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [successfulResponse, setSuccessfulResponse] = useState(null);

  const updatePhoneNumber = (e) => {
    // output value that was typed into text field
    console.log({value: e.target.value});

    // save input value into local memory
    setPhoneNumber(e.target.value);
  };

  const updateMessage = (e) => {
    // output value that was typed into text field
    console.log({value: e.target.value});

    // save input value into local memory
    setMessage(e.target.value);
  };

  const submitMessage = () => {
    console.log("Send button was pressed");

    setError(null);
    setSuccessfulResponse(null);

    // Collect data from the state, & send data to the backend
    axios.post("http://localhost:3000/create-customer-text", {
      phoneNumber: phoneNumber, 
      message: message,
    })
    .then((response) => {
      console.log("MESSAGE RETURNED: ", response.data);
      setSuccessfulResponse(response.data);
    })
    .catch((e) => {
      setError(e.message);
    });
  };

  return (
    <html>
      <body className="body-container">
        {error && <div>ERROR: DATA WAS NOT SENT SUCCESSFULLY {error}</div>}
        {successfulResponse && <div>MESSAGE SUCCESSFULLY CREATED {successfulResponse}</div>}
        <div className="header-container">
          <h1>SMS Messenger</h1>
          <img src={messageLogo} alt="Message Logo" style={{width: "150px", height: "150px"}}></img>
        </div>
        <div className="main-container">
          <div className="field-container">
            <h2>Send a message!</h2>
              <label for="pNumber">Phone Number</label>
              <br></br>
              <input type="text" id="pNumber" name="phoneNumber" placeholder="Enter a phone number..." value={phoneNumber} onChange={updatePhoneNumber}></input>

              <br></br>

              <label for="msg">Message</label>
              <br></br>
              <input type="text" id="msg" name="message" placeholder="Enter a message..." value={message} onChange={updateMessage}></input>

              <br></br>

              <input type="submit" id="sendButton" value="Send" onClick={() => submitMessage()}></input>
      
              <br></br>

              <input type="submit" id="seeMessagesButton" value="View sent messages" ></input>
          </div>
        </div>
      </body>
    </html>
  );
}

export default App;
