import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, map, Observable, of, OperatorFunction, switchMap, tap } from 'rxjs';
import { FirestoreService } from '../../services/firestore.service';
import { AuthService } from '../../services/auth.service';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chats-page',
  standalone: true,
  imports: [ReactiveFormsModule, NgbTypeahead],
  templateUrl: './chats-page.component.html',
  styleUrl: './chats-page.component.css'
})
export class ChatsPageComponent {

  firestore = inject(FirestoreService);
  chatService = inject (ChatService); 
  authService = inject (AuthService);

  searchUser = new FormControl('', Validators.required)
  searching = false;
  searchFailed = false;

  //funzione di ricerca per typeahead
  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
			debounceTime(200),
			distinctUntilChanged(),
			map((term) =>
				term.length < 2 ? [] : this.chatService.userChatList().filter((v) => v !== this.authService.currentUserCredential()?.username && v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10),
			),
		);

  createChat() {
    if (!this.searchUser.valid) return; 

    const otherUser = this.firestore.users().find(u => u.username === this.searchUser.value);
    if (!otherUser) return; 

    this.chatService.addChat(otherUser);
  }

}
