import * as user from './user';
import * as pers from './mappersistor';

//exportable class UserData
//manages a map that holds Users
export class UserData {

  private persist: pers.MapPersistor<user.User>;
  private users = new Map<number, user.User >();
  private idCounter = 0;

  constructor() {
    //create persistor object
    this.persist = new pers.MapPersistor<user.User>('./userdata.txt');
    
    //have it load the user-map or create a new one, if it doesn't exist
    this.persist.loadData().then(loadedData => {
      this.users = loadedData[0];
      this.idCounter = loadedData[1];

      console.log('Data: Initialized data storage');
      console.log('Data: Currently holding %s user(s)', this.users.size);
    
      //Print data for debug purposes
      this.logAllData();
    });
    
  };

  //creates a new user in accordance with the parameters and adds him to the map
  addUser(title: user.Title, firstName: string, lastName: string): Map<number, user.User> {
    //create a user with these exact specifications, a current timestamp (and an index(?))
    let newUser = { title: title, firstName: firstName, lastName: lastName, joinedAt: Date.now() };

    //prepare for next added user
    this.idCounter++;

    //add him to our map
    console.log('Data: Adding user nr. %s', this.idCounter-1);
    console.log('Data: Should now be holding %s user(s)', this.users.size+1);

    this.users.set(this.idCounter - 1, newUser);

    //persist the map
    this.persist.persistData(this.users);

    //return the map
    return this.users;
  }

  //changes the data of a chosen user (with id=id) in accordance with the parameters
  changeUserData(id: number, title: user.Title, firstName: string, lastName: string): Map<number, user.User> {
    //try to find the User with key=id
    if (this.users.has(id)) {
      //if he exists change the users title, firstname and lastname to the new values
      let newUser = { title: title, firstName: firstName, lastName: lastName, joinedAt: this.users.get(id)!.joinedAt };
      console.log('Data: Changing data for user nr. %s', id);
      console.log('Data: Currently holding %s user(s)', this.users.size);

      this.users.set(id, newUser);

      //persist the map
      this.persist.persistData(this.users);
  
      //return the map
      return this.users;
    }
    else {
      //else do not do it, maybe throw an error
      throw new Error("Data: Can't change nonexistant user.");
    }
  }

  //deletes the chosen user with id=id
  deleteUser(id: number): Map<number, user.User> {
    //if the user with key=id exists delete him
    if (this.users.delete(id)) {
      console.log('Data: Deleting user nr. %s', id);
      console.log('Data: Currently holding %s user(s)', this.users.size);

      //persist the map
      this.persist.persistData(this.users);
  
      //return the map
      return this.users;
    }
    else {
      //else throw an error
      throw new Error("Data: Can't delete nonexistant user.");
    }
  }

  //returns the entire map
  getAllData(): Map<number, user.User> {
    console.log('Data: Returning all user data');
    console.log('Data: Currently holding %s user(s)', this.users.size);
    return this.users;
  }

  //prints map-content in the log
  logAllData(){
    console.log('---------------------------------------------');
    console.log('DATA: CURRENT USERS:');
    console.log('---------------------------------------------');
    this.users.forEach((value, key, map) => {
        console.log('user no. %s:', key);
        console.log('title: %s', this.users.get(key)!.title);
        console.log('firstName: %s', this.users.get(key)!.firstName);
        console.log('lastName: %s', this.users.get(key)!.lastName);
        console.log('joinedAt: %s', this.users.get(key)!.joinedAt);
        console.log('---------------------------------------------');
    });
  }
}