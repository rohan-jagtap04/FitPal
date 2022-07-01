import { Injectable } from '@angular/core';
import { User } from '../../model/user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  dbQuery$: Observable<User[]>;
  public static observedUser: User;
  constructor(
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private db: AngularFirestore
  ){
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
    this.dbQuery$ = of([]);
  }
  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        // this.ngZone.run(() => {
        //   this.router.navigate(['../dashboard']);
        // });
        this.setUser(email).subscribe((res:any) => {
          this.userData = res;
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Sign up with email/password
  SignUp(email: string, password: string, displayName: string, retypedPassword: string) {
    if(password !== retypedPassword){
      window.alert("Password and Retyped Password do not match.");
      return;
    }
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificationMail() function when new user sign
        up and returns promise */
        this.SendVerificationMail();
        this.CreateUserData(result.user, displayName);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['authentication/verify-email']);
      });
  }
  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  // Returns true when user is logged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }
  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      if (res) {
        this.router.navigate(['dashboard']);
      }
    });
  }
  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.db.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: (user.uid !== "") ? user.uid : "",
      email: (user.email !== "") ? user.email : "",
      displayName: (user.displayName !== null) ? user.displayName : "",
      photoURL: (user.photoURL !== null) ? user.photoURL : "",
      emailVerified: user.emailVerified,
      locations: user.locations,
      gymfriends: user.gymfriends
    };
    return userRef.set(userData, { merge: true });
  }

  CreateUserData(user: any, displayName: string){
    const userRef: AngularFirestoreDocument<any> = this.db.doc(
      `users/${user.uid}`
    );
    this.userData = {
      uid: (user.uid !== "") ? user.uid : "",
      email: (user.email !== "") ? user.email : "",
      displayName: displayName,
      photoURL: (user.photoURL !== null) ? user.photoURL : "",
      emailVerified: user.emailVerified,
      locations: [],
      gymfriends: []
    };
    return userRef.set(this.userData, { merge: true });
  }
  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      // this.router.navigate(['sign-in']);
    });
  }

  getAllUsersWithName(queryString: string){
      return this.db.collection('users', ref => ref.where('displayName', '==', queryString).limit(5)).valueChanges()
  }

  getUserWithUID(UID: string){
    return this.db.collection('users', ref => ref.where('uid', '==', UID)).valueChanges()
  }

  setUser(email: string){
    return this.db.collection('users', ref => ref.where('email', '==', email).limit(1)).valueChanges();
  }
}

