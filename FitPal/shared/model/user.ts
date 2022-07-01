export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string; //display photo
  emailVerified: boolean;
  locations: string[]; //All the gyms they regularly visit
  gymfriends: string[]; //store other users UID

}

export interface UserState {
  students: User[];
}
