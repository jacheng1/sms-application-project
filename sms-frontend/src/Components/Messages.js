import { useEffect, useState } from 'react';
import axios from 'axios';

function Messages() {
    const [sentMessages, setSentMessages] = useState([]);

    // Everytime dependency array value is updated, useEffect is called
    useEffect(() => {
        // Retrieve sent messages with axios
        axios.get("http://localhost:3000/customer-texts")
            .then((response) => {
                console.log(response.data);
                setSentMessages(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    const retrieveMessages = async() => {
        await axios.get("http://localhost:3000/customer-texts")
            .then((response) => {
                setSentMessages(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

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

    return (
        <html>
            <body className="body-container-messages">
                <div>
                    <h1>Sent Messages</h1>
                    <div>
                        {renderMessages()}
                    </div>
                </div>
            </body>
        </html>
    );
};

export default Messages;