export type Title = 'Dr.' | 'Prof.' | null;

export interface User {
  title: Title;
  firstName: string;
  lastName: string;
  readonly joinedAt?: number; //must be Unix Timestamp (generated with Date.now)
  
  readonly id?: number //for clearly differentiating between sets of data, TODO: depending on ORM perhaps unneccessary?
}