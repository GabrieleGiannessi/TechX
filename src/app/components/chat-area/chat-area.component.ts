import { Component, input } from '@angular/core';
import { Chat } from '../../services/chat.service';

@Component({
  selector: 'app-chat-area',
  standalone: true,
  imports: [],
  templateUrl: './chat-area.component.html',
  styleUrl: './chat-area.component.css'
})
export class ChatAreaComponent {

  chat = input.required<Chat>(); 

  
}
