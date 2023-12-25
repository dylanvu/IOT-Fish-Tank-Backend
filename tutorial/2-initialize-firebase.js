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

// turn on the webserver
app.listen(port, () => {
    // print this out to the node.js terminal
    console.log(`Example app listening on http://localhost:${port}`)
})