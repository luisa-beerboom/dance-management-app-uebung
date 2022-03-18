import * as user from './user';

let newUser = {title: null, firstName: "Max", lastName: "Mustermann", joinedAt: Date.now};


//creates a new user
//TODO: implement this
//TODO: This might need to go into a different Class (if the ORM is separated off)
//TODO: use id as an identifier good?
function addUser(title: 'Dr.' | 'Prof.' | null, firstName: string, lastName: string){
  //create a user with these exact specifications, a current timestamp (and an index(?))
  //add him to our table
}

//changes the data of a chosen user
//TODO: implement this
//TODO: This might need to go into a different Class (if the ORM is separated off)
//TODO: use id as an identifier good?
function changeUserData(id: number, title: 'Dr.' | 'Prof.' | null, firstName: string, lastName: string){
  //try to find the User with id=<number>
  //if he exists change the variables title, firstname and lastname to the new values
  //else maybe throw an error
}

//deletes the chosen user
//TODO: implement this
//TODO: This might need to go into a different Class (if the ORM is separated off)
//TODO: use id as an identifier good?
function deleteUser(index: number){
  //try to find the User with id=<number>
  //if he exists delete him
  //else maybe throw an error
}