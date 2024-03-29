// import the node.js express module
import express from "express";

// import the service account correctly: https://stackoverflow.com/a/70106896

// import what's needed for the firebase admin module
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

import dotenv from "dotenv"

dotenv.config();

// create the express webserver object
const app = express();
// declare the port that we will be hosting this on. It'll be accessible on "http://localhost:3000" since we put port number as 3000
const port = 3000;

// configure some middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// create the firebase application using the service account
initializeApp({
    credential: cert(JSON.parse(process.env.service_account))
});

// create the firestore database access in the application
const db = getFirestore();

// create a GET endpoint at the base
app.get('/', (req, res) => {
    res.send(`
<html>
    <h1>Hello!</h1>
    <p>Hi there!</p>
</html>
`);
});

// create a GET endpoint to get the newest data at http://localhost:${port}/newest
app.get('/newest', async (req, res) => {
    // get the data collection reference
    const dataCollection = db.collection("data");

    // get the esp32 document reference
    const esp32Doc = dataCollection.doc("esp32");

    // get the actual data contained in the document
    const snapshot = await esp32Doc.get();
    const data = snapshot.data();

    // print it out to the terminal
    console.log(data);

    // send the data in the response
    res.send(data);
});

// create a POST endpoint to write the newest data at http://localhost:${port}/update
app.post('/update', async (req, res) => {
    // POST requests update the data, and thus have "data" we need to extract from the request "body"

    // parse the body of the request
    const postData = req.body;

    // print it out
    console.log(postData);

    // write this new data to the database

    // get the data collection reference
    const dataCollection = db.collection("data");

    // get the esp32 document reference
    const esp32Doc = dataCollection.doc("esp32");

    // turn the data into a number in case it's a string
    const newDataValue = parseInt(postData["data"]);

    // now set the data to be the new data
    await esp32Doc.set({
        data: newDataValue
    });

    // send a successful response back: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
    res.sendStatus(201);
});

// turn on the webserver
app.listen(port, () => {
    // print this out to the node.js terminal
    console.log(`Example app listening on http://localhost:${port}`);
})