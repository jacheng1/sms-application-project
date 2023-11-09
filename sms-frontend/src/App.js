import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
// import retrieveMessages from './Components/utils';
import messageLogo from './messageLogo.png';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [successfulResponse, setSuccessfulResponse] = useState(null);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  // const [sentMessages, setSentMessages] = useState([]);

  // 1- Create state that will know if the overlay is opened or closed
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  // Everytime isOverlayOpen changes, the content of the use effect is going to be evaluated
  useEffect(() => {
    // if open, update the overlay display to be "visible"
    // if closed, update the overlay to be "none"
    if (isOverlayOpen) {
      document.getElementById("overlay").style.display = "block";
    }
    else {
      document.getElementById("overlay").style.display = "none";
    }

    console.log("isOverlayOpen is",isOverlayOpen);
  }, [isOverlayOpen])

  const updateFirstName = (e) => {
    // Output value that was typed into text field
    console.log({value: e.target.value});

    // Save input value into local memory
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    // Output value that was typed into text field
    console.log({value: e.target.value});

    // Save input value into local memory
    setLastName(e.target.value);
  }

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
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber, 
      message: message,
    })
    .then((response) => {
      console.log("MESSAGE RETURNED: ", response.data);

      // Reset states to default empty state
      setFirstName("");
      setLastName("");
      setPhoneNumber("");
      setMessage("");

      // Make success snack bar message visible
      setOpenSuccess(true);

      // Set a successful response
      setSuccessfulResponse(response.data);
      // retrieveMessages();
    })
    .catch((e) => {
      // Make error snack bar message visible
      setOpenError(true);

      // Set a error response
      setError(e.message);
    });
  };

  const handleCloseSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSuccess(false);
  };

  const handleCloseError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenError(false);
  };

  /*
  // Everytime dependency array value is updated, useEffect is called
  useEffect(() => {
    setSentMessages(retrieveMessages())
  }, []);
  */

// When the X button is clicked I want to toggle the value
// from false -> true ; true -> false
// isOverlayOpen
  return (
    <html className="messages-container">
      <body className="body-container">
        <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleCloseSuccess}>
          <Alert onClose={handleCloseSuccess} severity="success" sx={{width: '100%'}}>
            {successfulResponse}
          </Alert>
        </Snackbar>
        <Snackbar open={openError} autoHideDuration={6000} onClose={handleCloseError}>
          <Alert onClose={handleCloseError} severity="error" sx={{width: '100%'}}>
            {error}
          </Alert>
        </Snackbar>
        <div id="overlay"></div>
        <div className="hamburger-container">
            <input class="checkbox" type="checkbox" onClick={() => setIsOverlayOpen(!isOverlayOpen)}/>
            <div className="hamburger">
              <span class="line line1"></span>
              <span class="line line2"></span>
              <span class="line line3"></span>
            </div>
          <div class="hamburger-items">
            <li><a href="/">Home</a></li>
            <li><a href="/messages">Messages</a></li>
            <li><a href="/contacts">Contacts</a></li>
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
                <Box component="form" noValidate>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        variant="outlined"
                        type="text"
                        id="fName"
                        label="First Name"
                        name="firstName"
                        value={firstName}
                        onChange={updateFirstName}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        variant="outlined"
                        type="text"
                        id="lName"
                        label="Last Name"
                        name="lastName"
                        value={lastName}
                        onChange={updateLastName}
                      />
                    </Grid>
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
                    id="sendButton"
                    onClick={() => submitMessage()}
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                  >
                    Send
                  </Button>
                  <Button
                    fullWidth
                    id="seeMessagesButton"
                    variant="contained"
                    href="/messages"
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