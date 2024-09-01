import { inject, Injectable } from '@angular/core';
import {  collection, CollectionReference, Timestamp, addDoc, arrayRemove, arrayUnion, collectionData, doc, Firestore, updateDoc, setDoc, deleteDoc } from '@angular/fire/firestore';
import {  UserInterface } from './auth.service';
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
  articles = toSignal (this.article$, { initialValue : []})

  addUser(id: string, user: Partial<UserInterface>) {
    const ref = doc(this.firestore, 'users', id);
    return setDoc(ref, {
      email: user.email,
      username: user.username,
      photoURL: user.photoURL,
      description: user.description,
      preferList: user.preferList,
      phoneNumber: user.phoneNumber,
    }, { merge: true }); // Merge assicura che i campi esistenti non vengano sovrascritti se non specificati.
  }
  
  addArticle(article : Article){
    const ref = collection (this.firestore, 'articles'); 
    return addDoc ( ref, article ); 
  }

  updateUsername(id:string, username:string){
    const ref = doc (this.firestore, 'users', id);
    return updateDoc ( ref, { username : username }); 
  }

  updateDescription(id: string, description : string){
    const ref = doc (this.firestore, 'users', id);
    return updateDoc ( ref, { description : description }); 
  }
  updatePhoneNumber(id: string, phoneNumber : string){
    const ref = doc (this.firestore, 'users', id);
    return updateDoc ( ref, { phoneNumber : phoneNumber }); 
  }

  updateProfilePic (id : string, photoURL : string){
    const ref = doc (this.firestore, 'users', id);
    return updateDoc ( ref, { photoURL : photoURL }); 
  }

  updateArticlePhotos (id:string, photos:string[]){
    const ref = doc (this.firestore, 'articles', id); 
    return updateDoc (ref, { photos : photos})
  }

  updatePreferList(id:string, articleID : string){
    const ref = doc (this.firestore, 'users', id);
    return updateDoc ( ref, { preferList : arrayUnion (articleID)})
  }
  
  deleteFromPreferList(id:string, articleID : string){
    const ref = doc (this.firestore, 'users', id);
    return updateDoc ( ref, { preferList : arrayRemove (articleID)})
  }

  updateNumPrefersArticle(id : string, value : number){
    const ref = doc (this.firestore, 'articles', id); 
    return updateDoc (ref, { numPrefers : value})
  }

  updatePrice (articleID : string, price : number){
    const ref = doc (this.firestore, 'articles', articleID); 
    return updateDoc (ref, { price : price})
  }

  deleteArticle(id: string) {
    const docRef = doc (this.firestore, 'articles', id); 
    return deleteDoc (docRef); 
  }

  deleteArticleFromUser (userID : string, articleID : string){
    const userRef = doc (this.firestore, 'users', userID); 
    return updateDoc (userRef, { preferList : arrayRemove(articleID)})
  }

}

export interface Article{
  id? : string, 
  userID : string, 
  title : string, 
  category: string, 
  price: number, 
  photos : string[], 
  state : string, 
  data : Timestamp
  description : string,
  numPrefers : number, 
}