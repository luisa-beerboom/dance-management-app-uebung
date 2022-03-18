"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//backend application framework for nodejs
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
//create express application
const app = express();
//post request handler
app.post('hinzufuegen', (request, response, next) => {
    console.log('received post-request: %s', request.body);
    response.json({ this: 'was a post' });
    addUser(request.body.title, request.body.firstName, request.body.lastName); //TODO: if this method is relocated to a different class, change this accordingly
});
//put request handler
app.put('aendern', (request, response, next) => {
    console.log('received put-request: %s', request.body);
    response.json({ this: 'was a put' });
    changeUserData(request.body.id, request.body.title, request.body.firstName, request.body.lastName); //TODO: if this method is relocated to a different class, change this accordingly
});
//delete request handler
app.delete('loeschen', (request, response, next) => {
    console.log('received delete-request: %s', request.body);
    response.json({ this: 'was a delete' });
    deleteUser(request.body.id); //TODO: if this method is relocated to a different class, change this accordingly
});
//initialize a simple http server
const server = http.createServer(app);
//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });
wss.on('connection', (ws) => {
    //connection is up, let's add a simple event
    ws.on('message', (message) => {
        //log the received message and send it back to the client
        console.log('received: %s', message);
        ws.send(`Hello, you sent -> ${message}`);
    });
    //deal with post/put/delete requests
    //ws.on('upgrade', function upgrade(request, socket, head) {
    //    const { whatkind } = parse(request.method);
    //
    //    wss.handleUpgrade(request, socket, head, function done(ws){
    //    
    //    })
    //    
    //});
    //send immediatly a feedback to the incoming connection    
    ws.send('Hi there, I am a WebSocket server');
});
//start our server
server.listen(process.env.PORT || 8999, () => {
    console.log('Server started at %s', server.address());
});
//creates a new user
//TODO: implement this
//TODO: This might need to go into a different Class (if the ORM is separated off)
//TODO: use id as an identifier good?
function addUser(title, firstName, lastName) {
    //create a user with these exact specifications, a current timestamp (and an index(?))
    //add him to our table
}
//changes the data of a chosen user
//TODO: implement this
//TODO: This might need to go into a different Class (if the ORM is separated off)
//TODO: use id as an identifier good?
function changeUserData(id, title, firstName, lastName) {
    //try to find the User with id=<number>
    //if he exists change the variables title, firstname and lastname to the new values
    //else maybe throw an error
}
//deletes the chosen user
//TODO: implement this
//TODO: This might need to go into a different Class (if the ORM is separated off)
//TODO: use id as an identifier good?
function deleteUser(index) {
    //try to find the User with id=<number>
    //if he exists delete him
    //else maybe throw an error
}
//# sourceMappingURL=server.js.map