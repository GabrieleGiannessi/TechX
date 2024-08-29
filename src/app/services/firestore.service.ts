import { inject, Injectable } from '@angular/core';
import { addDoc, collectionData, Firestore } from '@angular/fire/firestore';
import { collection, CollectionReference, Timestamp } from 'firebase/firestore';
import { UserInterface } from './auth.service';
import { toSignal } from '@angular/core/rxjs-interop'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  firestore = inject(Firestore); 

  usersCollection = <CollectionReference<UserInterface>> collection (this.firestore, 'users'); 
  private users$ = <Observable<UserInterface[]>> collectionData (this.usersCollection, { idField : 'uid'}); 
  users = toSignal (this.users$, { initialValue : []})

  articlesCollection = <CollectionReference<Article>> collection (this.firestore, 'articles'); 
  private article$ =  <Observable<Article[]>> collectionData (this.articlesCollection, { idField : 'id'}); 
  article = toSignal (this.article$, { initialValue : []})

  //articles

  addUser(user : UserInterface) {
    const ref = collection (this.firestore, 'users'); 
    return addDoc ( ref, user ); 
  } 

  addArticle(article : Article){
    const ref = collection (this.firestore, 'articles'); 
    return addDoc ( ref, article ); 
  }

  updateUsername(){}
  updateDescription(){}
  updatePhoneNumber(){}

  updateArticlePhoto(){}
}

export interface Article{
  id : string, 
  userID : string, 
  title : string, 
  category: string, 
  price: number, 
  state : string, 
  data : Timestamp
  description : string,
  numPrefers : string, 
  preferList : string[]
}