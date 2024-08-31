import { computed, inject, Injectable } from '@angular/core';
import { AuthService, UserInterface } from './auth.service';
import { FirestoreService } from './firestore.service';
import { map, Observable, of } from 'rxjs';
import { addDoc, collection, collectionData, CollectionReference, Firestore, Timestamp } from '@angular/fire/firestore';
import { toSignal } from '@angular/core/rxjs-interop';
import { user } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  firestore = inject(FirestoreService);
  
  authService = inject (AuthService); 

  userChatList = computed(() => this.firestore.users().map (user => user.username)); 

  usersCollection = <CollectionReference<Chat>> collection (this.firestore.firestore, 'chats'); 
  private chat$ = <Observable<Chat[]>> collectionData (this.usersCollection, { idField : 'id'}); 
  chats = toSignal (this.chat$, { initialValue : []})

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

  addDisplayNameAndPic(chats : Chat[], userID: string ): Chat[]{
    chats.forEach(chat => {
      const otherIndex = chat.userIDs.indexOf(userID) === 0 ? 1 : 0;
      const { username , photoURL }= chat.users[otherIndex];
      chat.chatName = username; 
      chat.chatPic = photoURL;    
    });

    return chats; 
  }
  getMessages(){}
}

export interface Chat{
  id:string; 
  lastMessage?: string;
  lastMessageDate?: Timestamp; 
  userIDs :  string[]; 
  users : UserInterface[]; 

  chatPic?: string; 
  chatName: string; 
}

export interface Message{
  text:string; 
  senderID: string; 
  sentDate: Timestamp; 
}
