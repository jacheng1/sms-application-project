import { useEffect, useState } from 'react';
import axios from 'axios';
import './Messages.css';
// import retrieveMessages from './utils';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';

function Messages() {
    // 1- Create state that will know if the overlay is opened or closed
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [sentMessages, setSentMessages] = useState([]);

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

    // Everytime dependency array value is updated, useEffect is called
    useEffect(() => {
        // Retrieve sent messages with axios
        axios.get("http://localhost:3000/create-customer-text")
            .then((response) => {
                console.log(response.data);
                setSentMessages(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    /*
    // Everytime dependency array value is updated, useEffect is called
    useEffect(() => {
        setSentMessages(retrieveMessages())
    }, []);
    */

    const retrieveMessages = async() => {
        await axios.get("http://localhost:3000/create-customer-text")
            .then((response) => {
                setSentMessages(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    /*
    const renderMessages = () => {
        return sentMessages.map((message, index) => {
            console.log({message});

            // Wrap nodes in empty fragment <></>
            return (
                <>
                    <div>Record: {index}</div>
                    <ol>
                        <li>First Name: {message.firstName}</li>
                        <li>Last Name: {message.lastName}</li>
                        <li>Phone Number: {message.phoneNumber}</li>
                        <li>Message: {message.message}</li>
                        <li>Sent Date: {message.createdAt}</li>
                    </ol>
                </>
            );
        });
    };
    */

    const renderTableRows = () => {
        return sentMessages.map((message, i) => {
            return (
                <TableRow key={message.firstName + i} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                    <TableCell component="th" scope="row">{message.firstName}</TableCell>
                    <TableCell align="right">{message.lastName}</TableCell>
                    <TableCell align="right">{message.phoneNumber}</TableCell>
                    <TableCell align="right">{message.message}</TableCell>
                    <TableCell align="right">{message.createdAt}</TableCell>
                </TableRow>
            );
        });
    };

    return (
        <html>
            <body className="body-container-messages">
                <body className="topbar-container">
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
                    <div className="sent-messages-container">
                        <Box sx={{margin: "40px;"}}>
                            <h1 className="sent-messages-title">Sent Messages</h1>
                            <Grid container>
                                <Grid xs={7}>
                                    <TableContainer component={Paper}>
                                        <Table sx={{minWidth: 650}} aria-label="sent messages table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>First Name</TableCell>
                                                    <TableCell align="right">Last Name</TableCell>
                                                    <TableCell align="right">Phone Number</TableCell>
                                                    <TableCell align="right">Message</TableCell>
                                                    <TableCell align="right">Date Sent</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>{renderTableRows()}</TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>   
                        </Box>
                    </div>
                </body>
            </body>
        </html>
    );
};

export default Messages;