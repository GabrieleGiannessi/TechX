import { computed, inject, Injectable, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithCredential, signInWithEmailAndPassword, signInWithPopup, signOut } from '@angular/fire/auth';
import { collection, getDocs, query, where } from '@angular/fire/firestore';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth = inject (Auth); 
  firestore = inject (FirestoreService); 

  currentUserSig = signal <UserInterface | null | undefined>(undefined); 
  currentUserCredential = computed (() => {
    if (this.currentUserSig()) return this.currentUserSig();
    return null; 
  })

  logged = signal <boolean> (false); 

  constructor(){
    onAuthStateChanged(this.auth, ((user) => {
      if (user) {
        this.logged.set(true); 
        const q = query(collection (this.firestore.firestore, 'users'), where ('uid', '==', user.uid))
        getDocs(q).then((snap) => {
          if (snap.docs.length > 0) { //lo abbiamo trovato
            this.currentUserSig.set({
              uid : user.uid, 
              email : user.email!, 
              username :  snap.docs[0].data()['username'],
              phoneNumber : snap.docs[0].data()['phoneNumber'], 
              photoURL : snap.docs[0].data()['photoURL'],
              description : snap.docs[0].data()['description'],
              preferList: snap.docs[0].data()['preferList'],
            })
          }
        })
      }else {
        this.logged.set(false);
      }
    }))
  }

  register (email : string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password); 
  }

  login(email:string, password: string) {
    return signInWithEmailAndPassword(this.auth, email,password);
  }

  logout(){
    return signOut(this.auth);
  }

  signInWithGoogle(){
    return signInWithPopup (this.auth, new GoogleAuthProvider()); 
  }

  sendPasswordResetEmail(email: string){
    return sendPasswordResetEmail(this.auth, email); 
  }

}

export interface UserInterface {
  uid : string, 
  phoneNumber : string, 
  photoURL : string, 
  email : string, 
  username : string, 
  description : string, 
  preferList : string[]; 
}