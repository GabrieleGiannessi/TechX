import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  auth = inject(AuthService); 
  firestore = inject(FirestoreService);

  addChat(){}
  addDisplayNameAndPic(){}
  getMessages(){}
  
}
