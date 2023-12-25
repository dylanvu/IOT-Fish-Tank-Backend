// import the node.js express module
import express from "express";

// import the service account correctly: https://stackoverflow.com/a/70106896
import serviceAccount from "./service_account.json" assert { type: "json" };

// import what's needed for the firebase admin module
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// create the express webserver object
const app = express();
// declare the port that we will be hosting this on. It'll be accessible on "http://localhost:3000" since we put port number as 3000
const port = 3000;

// create the firebase application using the service account
initializeApp({
    credential: cert(serviceAccount)
});

// create the firestore database access in the application
const db = getFirestore();

// create a GET endpoint at the base
app.get('/', (req, res) => {
    res.send("Hello World!");
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

// turn on the webserver
app.listen(port, () => {
    // print this out to the node.js terminal
    console.log(`Example app listening on http://localhost:${port}`)
})