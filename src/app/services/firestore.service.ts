import { inject, Injectable } from '@angular/core';
import { addDoc, arrayRemove, arrayUnion, collectionData, doc, Firestore, updateDoc } from '@angular/fire/firestore';
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
  articles = toSignal (this.article$, { initialValue : []})

  addUser(user : UserInterface) {
    const ref = collection (this.firestore, 'users'); 
    return addDoc ( ref, user ); 
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

  updatePreferList(id:string, articleID : string){
    const ref = doc (this.firestore, 'users', id);
    return updateDoc ( ref, { preferList : arrayUnion (articleID)})
  }

  updateArticlePhotos (id:string, photos:string[]){
    const ref = doc (this.firestore, 'articles', id); 
    return updateDoc (ref, { photos : photos})
  }

  deleteFromPreferList(id:string, articleID : string){
    const ref = doc (this.firestore, 'users', id);
    return updateDoc ( ref, { preferList : arrayRemove (articleID)})
  }

  updateNumPrefersArticle(id : string, value : number){
    const ref = doc (this.firestore, 'articles', id); 
    return updateDoc (ref, { numPrefers : value})
  }

  updateArticlePhoto(){}
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
  preferList : string[]
}