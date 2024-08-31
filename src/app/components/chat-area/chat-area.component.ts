import { Component, computed, effect, inject, input } from '@angular/core';
import { Chat, ChatService } from '../../services/chat.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-area',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-area.component.html',
  styleUrl: './chat-area.component.css'
})
export class ChatAreaComponent {

  chatService = inject (ChatService); 

  chat = input.required<Chat>(); 

  chatMessages$ = computed (() => this.chatService.getMessages(this.chat())); 
  
}
