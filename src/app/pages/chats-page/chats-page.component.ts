import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, map, Observable, of, OperatorFunction, switchMap, tap } from 'rxjs';
import { FirestoreService } from '../../services/firestore.service';
import { AuthService } from '../../services/auth.service';
import { NgbTypeahead, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { Chat, ChatService } from '../../services/chat.service';
import { ChatButtonComponent } from "../../components/chat-button/chat-button.component";
import { ChatHeaderComponent } from "../../components/chat-header/chat-header.component";
import { ChatAreaComponent } from "../../components/chat-area/chat-area.component";
import { ChatInputAreaComponent } from "../../components/chat-input-area/chat-input-area.component";
import { DateDisplayPipe } from '../../pipes/date-display.pipe';

@Component({
  selector: 'app-chats-page',
  standalone: true,
  imports: [ReactiveFormsModule, NgbTypeahead, ChatButtonComponent, ChatHeaderComponent, ChatAreaComponent, ChatInputAreaComponent],
  templateUrl: './chats-page.component.html',
  styleUrl: './chats-page.component.css',
  providers: [DateDisplayPipe]
})
export class ChatsPageComponent {

  firestore = inject(FirestoreService);
  chatService = inject (ChatService); 
  authService = inject (AuthService);

  searchUser = new FormControl('', Validators.required)
  searching = false;
  searchFailed = false;

  id = input.required<string>(); 

  userChats = computed (() => this.chatService.addDisplayNameAndPic(this.chatService.chats().filter ((chat) => chat.userIDs.includes(this.id())),this.id())); 
  selectedChat = signal<Chat|null>(null); 

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
    this.searchUser.reset();
  }

  createChatFromSelect (e : NgbTypeaheadSelectItemEvent ){
    const username = e.item; 
    const otherUser = this.firestore.users().find(u => u.username === username);
    if (!otherUser) return; 

    this.chatService.addChat(otherUser);
    this.searchUser.reset(); 
  }

  handleChatSelected( chat : Chat) {
    this.selectedChat.set(chat);
    }

}
