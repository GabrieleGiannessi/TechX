import { Component, input } from '@angular/core';
import { Chat } from '../../services/chat.service';

@Component({
  selector: 'app-chat-input-area',
  standalone: true,
  imports: [],
  templateUrl: './chat-input-area.component.html',
  styleUrl: './chat-input-area.component.css'
})
export class ChatInputAreaComponent {

  chat = input.required<Chat> (); 

  //addMessage
}
