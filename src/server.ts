//backend application framework for nodejs
import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import * as userdata from './data';
import { isSimpleUser } from './user';


//create our UserData-Object
const users = new userdata.UserData();

//create express application
const app = express();

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });


//incoming data is being parsed to a json object
app.use(express.json());

//to better decode routes
app.use(express.urlencoded({ extended: true }));

//evtl später
//app.use(cookieParser());


//default get-route
app.get('/', (request, response, next) => {
    console.log('Server: Received empty-path get-request!');
    response.send("Hello World!");
})

//actual get-route, that provides the servers data
app.get('/getAllData', (request, response, next) => {
    console.log('Server: Received proper get-request!');
    response.send(JSON.stringify([...users.getAllData()]));  
})

//post request handler
//requires a simple ./user.User-object to be received
//saves received object's data in the users object, where it will receive an identifier and a joinedAt-Unix-timestamp
//updates all websocket clients automatically
app.post('/addUser', (request, response, next) => {
    console.log('Server: Received post-request: %s', request.body);

    //see if the data has the correct form
    if (isSimpleUser(request.body)) {
        //add the user
        let usermap = users.addUser(request.body.title, request.body.firstName, request.body.lastName);

        //Print data for debug purposes
        users.logAllData();

        //Broadcast the changed Data to all clients
        console.log('Server: Broadcasting new data to all clients...');
        let dataToBroadcast = JSON.stringify([...users.getAllData()]);
        wss.clients.forEach((client)=>{
            if(client.readyState === WebSocket.OPEN){
                console.log('Server: Sending data...');
                client.send(dataToBroadcast);
            }
        });
        console.log('Server: Data sent.')

        //send a response
        response.send('this was a post');
    }
    else {
        //if the data does not have the correct form
        console.log('Server: Wrong input');
        response.send('Warning: This was a wrong input for adding a user');
    }

})

//put request handler
//requires an object {id: number, title: 'Dr.'|'Prof.'|null, firstName: string, lastName: string} to be received
//changes the already saved object with the same id in the data-storage to comply with the new information
//updates all websocket clients automatically
app.put('/changeUserData', (request, response, next) => {
    console.log('Server: Received put-request: %s', request.body);

    //see if the data has the correct form
    if (typeof request.body?.id === 'number' && isSimpleUser({title: request.body?.title, firstName: request.body?.firstName, lastName: request.body?.lastName })) {
        let usermap = users.changeUserData(request.body.id, request.body.title, request.body.firstName, request.body.lastName);

        //Print data for debug purposes
        users.logAllData();

        //Broadcast the changed Data to all clients
        console.log('Server: Broadcasting new data to all clients...');
        let dataToBroadcast = JSON.stringify([...users.getAllData()]);
        wss.clients.forEach((client)=>{
            if(client.readyState === WebSocket.OPEN){
                console.log('Server: Sending data...');
                client.send(dataToBroadcast);
            }
        });
        console.log('Server: Data sent.')

        //send a response
        response.send('this was a put');
    }
    else {
        //if the data does not have the correct form
        console.log('Server: Wrong input');
        response.send('Warning: This was a wrong input for changing user data');
    }
})

//delete request handler
//requires an object {id: number} to be received
//deletes the already saved object with the same id in the data-storage
//updates all websocket clients automatically
app.delete('/deleteUser', (request, response, next) => {
    console.log('Server: Received delete-request: %s', request.body);

    //see if the data has the correct form
    if (typeof request.body?.id === 'number') {
        let usermap = users.deleteUser(request.body.id);

        //Print data for debug purposes
        users.logAllData();

        //Broadcast the changed Data to all clients
        console.log('Server: Broadcasting new data to all clients...');
        let dataToBroadcast = JSON.stringify([...users.getAllData()]);
        wss.clients.forEach((client)=>{
            if(client.readyState === WebSocket.OPEN){
                console.log('Server: Sending data...');
                client.send(dataToBroadcast);
            }
        });
        console.log('Server: Data sent.')

        //send a response
        response.send('this was a delete');
    }
    else {
        //if the data does not have the correct form
        console.log('server: Wrong input');
        response.send('Warning: This was a wrong input for deleting a user');
    }
})

//Websocket
wss.on('connection', (ws: WebSocket) => {

    //connection is up, let's add a simple event
    //ws.on('message', (message: string) => {

        //log the received message and send it back to the client
    //    console.log('webSocketServer: Received: %s', message);
        //ws.send('Hello, you sent -> ${message}');
    //});

    //Console-notification upon new connection
    ws.on('open', () => {

        //log the received message and send it back to the client
        console.log('WebSocketServer: New connection');
        //ws.send('Hello.');
    });

    //Console-notification upon closed connection
    ws.on('close', () => {

        //log the received message and send it back to the client
        console.log('WebSocketServer: Closed connection');
    });

    //send immediatly a feedback to the incoming connection 
    console.log('WebSocketServer: New connection');   
    ws.send('Hi there, I am a WebSocket server');
});

//start our server
server.listen(process.env.PORT || 8999, () => {
    console.log('Server: Started at %s', server.address());
});