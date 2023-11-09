import axios from 'axios';

const retrieveMessages = () => {
    axios.get("http://localhost:3000/create-customer-text")
        .then((response) => {
            return response;
        })
        .catch((e) => {
            console.log(e);
        });
};

export default retrieveMessages;