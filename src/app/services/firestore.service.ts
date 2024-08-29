import { inject, Injectable } from '@angular/core';
import { addDoc, collectionData, Firestore } from '@angular/fire/firestore';
import { collection, CollectionReference } from 'firebase/firestore';
import { UserInterface } from './auth.service';
import { toSignal } from '@angular/core/rxjs-interop'

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  firestore = inject(Firestore); 

  usersCollection = <CollectionReference<UserInterface>> collection (this.firestore, 'users'); 
  private users$ = collectionData (this.usersCollection, { idField : 'uid'}); 
  users = toSignal (this.users$, { initialValue : []})

  articlesCollection = <CollectionReference<UserInterface>> collection (this.firestore, 'articles'); 
  private article$ = collectionData (this.articlesCollection, { idField : 'uid'}); 
  article = toSignal (this.article$, { initialValue : []})

  //articles

  addUser(user : UserInterface) {
    const ref = collection (this.firestore, 'users'); 
    return addDoc ( ref, user ); 
  } 

  addArticle(){}

  updateUsername(){}
  updateDescription(){}
  updatePhoneNumber(){}

  updateArticlePhoto(){}
}
