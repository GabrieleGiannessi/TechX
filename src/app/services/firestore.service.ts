import { inject, Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  firestore = inject(Firestore); 

  //users
  //articles

  addUser(){}
  addArticle(){}

  updateUsername(){}
  updateDescription(){}
  updatePhoneNumber(){}

  updateArticlePhoto(){}
}
