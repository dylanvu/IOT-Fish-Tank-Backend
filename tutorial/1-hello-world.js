// import the node.js express module
import express from "express";

// create the express webserver object
const app = express();
// declare the port that we will be hosting this on. It'll be accessible on "http://localhost:3000" since we put port number as 3000
const port = 3000;

// create a GET endpoint at the base
app.get('/', (req, res) => {
    res.send("Hello World!");
});

// turn on the webserver
app.listen(port, () => {
    // print this out to the node.js terminal
    console.log(`Example app listening on http://localhost:${port}`)
})