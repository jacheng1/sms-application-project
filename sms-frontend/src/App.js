import messageLogo from './messageLogo.png';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

// Return copyright string
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit">
        JMC SMS
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

function App() {
  // Memory storage
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [successfulResponse, setSuccessfulResponse] = useState(null);

  // 1- Create state that will know if the overlay is opened or closed
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  // Everytime a value changes, the content of the use effect is going to be
  // evaluated
  useEffect(() => {
    // if the open
    // update the overlay display to be visible
    // if closed
    // update the overlay to be none
    if (isOverlayOpen) {
      document.getElementById("overlay").style.display = "block";
    }
    else {
      document.getElementById("overlay").style.display = "none";
    }

    console.log("isOverlayOpen is",isOverlayOpen);
  }, [isOverlayOpen])

  const updatePhoneNumber = (e) => {
    // Output value that was typed into text field
    console.log({value: e.target.value});

    // Save input value into local memory
    setPhoneNumber(e.target.value);
  };

  const updateMessage = (e) => {
    // Output value that was typed into text field
    console.log({value: e.target.value});

    // Save input value into local memory
    setMessage(e.target.value);
  };

  const submitMessage = () => {
    // Print confirmation message
    console.log("Send button was pressed");

    setError(null);
    setSuccessfulResponse(null);

    // Collect data from the state via parameters, & send data of parameters to the backend
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

// When the X button is clicked I want to toggle the value
// from false -> true ; true -> false
// isOverlayOpen
  return (
    <html>
      <body className="body-container">
        {error && <div>ERROR: DATA WAS NOT SENT SUCCESSFULLY {error}</div>}
        {successfulResponse && <div>MESSAGE SUCCESSFULLY CREATED {successfulResponse}</div>}
        <div id="overlay"></div>
        <div className="hamburger-container">
            <input class="checkbox" type="checkbox" onClick={() => setIsOverlayOpen(!isOverlayOpen)}/>
            <div className="hamburger">
              <span class="line line1"></span>
              <span class="line line2"></span>
              <span class="line line3"></span>
            </div>
          <div class="hamburger-items">
            <li><a href="#">Home</a></li>
            <li><a href="#">Messages</a></li>
            <li><a href="#">Contacts</a></li>
          </div>
        </div>
        <div className="header-container">
          <h1>SMS Messenger</h1>
          <img src={messageLogo} alt="Message Logo" style={{width: "150px", height: "150px"}}></img>
        </div>
        <div className="main-container">
          <div className="field-container">
            <h2>Send a message!</h2>
            <Container component="main" maxWidth="xs">
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Box component="form" noValidate sx={{mt: 3}}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        variant="outlined"
                        type="text"
                        id="pNumber"
                        label="Phone Number"
                        name="phoneNumber"
                        value={phoneNumber}
                        onChange={updatePhoneNumber}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        variant="outlined"
                        type="text"
                        id="msg"
                        label="Message"
                        name="message"
                        value={message}
                        onChange={updateMessage}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    fullWidth
                    type="submit"
                    id="sendButton"
                    onClick={() => submitMessage()}
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                  >
                    Send
                  </Button>
                  <Button
                    fullWidth
                    type="submit"
                    id="seeMessagesButton"
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                  >
                    View Sent Messages
                  </Button>
                </Box>
              </Box>
              <Copyright sx={{mt: 5}}/>
            </Container>
          </div>
        </div>
      </body>
    </html>
  );
};

export default App;