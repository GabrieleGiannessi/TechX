import { computed, inject, Injectable } from '@angular/core';
import { AuthService, UserInterface } from './auth.service';
import { FirestoreService } from './firestore.service';
import { map, Observable, of } from 'rxjs';
import { addDoc, collection, collectionData, CollectionReference, doc, Firestore, query, Timestamp, updateDoc } from '@angular/fire/firestore';
import { toSignal } from '@angular/core/rxjs-interop';
import { user } from '@angular/fire/auth';
import { orderBy } from 'firebase/firestore';

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
        username : this.authService.currentUserCredential()?.username, 
        photoURL : this.authService.currentUserCredential()?.photoURL,
      },{
        username: otherUser.username,
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

  sendMessage(chat: Chat, message: string, id : string) {
    const date = Timestamp.fromDate(new Date()); 
    const ref = collection (this.firestore.firestore, 'chats', chat.id, 'messages'); 
    //inserisco il messaggio nella chat e aggiorno la chat con data e ultimo messaggio
    addDoc (ref, {
      text : message, 
      senderID : id, 
      sentDate : date,
    }); 
    updateDoc (doc (this.firestore.firestore, 'chats', chat.id), {
      lastMessage : message, 
      lastMessageDate : date, 
    })
  }

  getMessages(chat : Chat){
    const ref = <CollectionReference<Message>> collection (this.firestore.firestore, 'chats', chat.id, 'messages'); 
    const queryAll = query (ref, orderBy('sentDate', 'asc')); 
    return <Observable<Message[]>> collectionData ( queryAll ); 
  }
  
}

export interface Chat{
  id:string; 
  lastMessage?: string;
  lastMessageDate: Timestamp; 
  userIDs :  string[]; 
  users : UserInterface[]; 

  chatPic?: string; 
  chatName?: string; 
}

export interface Message{
  text:string; 
  senderID: string; 
  sentDate: Timestamp; 
}
