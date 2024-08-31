import { computed, inject, Injectable } from '@angular/core';
import { AuthService, UserInterface } from './auth.service';
import { FirestoreService } from './firestore.service';
import { map, Observable, of } from 'rxjs';
import { addDoc, collection, collectionData, CollectionReference, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  firestore = inject(FirestoreService);
  authService = inject (AuthService); 

  userChatList = computed(() => this.firestore.users().map (user => user.username)); 

  addChat(otherUser : UserInterface){
    const ref = collection(this.firestore.firestore, 'chats'); 
    return addDoc(ref, {
      userIDs : [this.authService.currentUserCredential()?.uid, otherUser.uid], 
      users : [{
        displayName : this.authService.currentUserCredential()?.username, 
        photoURL : this.authService.currentUserCredential()?.photoURL,
      },{
        displayName: otherUser.username,
        photoURL : otherUser.photoURL,
      }]
    })
  }

  addDisplayNameAndPic(){}
  getMessages(){}
}

export interface Chat{

}

export interface Message{

}
