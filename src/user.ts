// const <name>: <Typ> = <Inhalt>
const possibleTitles: ['Dr.', 'Prof.', null]=['Dr.', 'Prof.', null];
export type Title = typeof possibleTitles;

//An interface for user-data
export interface User {
  title: Title;
  firstName: string;
  lastName: string;
  readonly joinedAt?: number; //must be Unix Timestamp (generated with Date.now)
}

//type guard that tests, whether an object has the required attributes to be a User
export function isSimpleUser (suspectedUser: any): suspectedUser is User {
  //Wenn suspectedUser null ist, gibt suspectedUser?.title undefined zurück

  return possibleTitles.includes(suspectedUser?.title) && typeof suspectedUser?.firstName === 'string' && typeof suspectedUser?.lastName === 'string';

  //Alternative:
  //if (!!suspectedUser && typeof suspectedUser === 'object'){
  //  return possibleTitles.includes(suspectedUser.title)  && typeof suspectedUser.firstName === 'string' && typeof suspectedUser.lastName === 'string';
  //}
}