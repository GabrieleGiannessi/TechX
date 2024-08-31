import { Component, computed, effect, inject, input } from '@angular/core';
import { Chat, ChatService } from '../../services/chat.service';
import { CommonModule } from '@angular/common';
import { ChatMessageComponent } from "../chat-message/chat-message.component";
import { DateDisplayPipe } from '../../pipes/date-display.pipe';

@Component({
  selector: 'app-chat-area',
  standalone: true,
  imports: [CommonModule, ChatMessageComponent],
  templateUrl: './chat-area.component.html',
  styleUrl: './chat-area.component.css', 
  providers: [DateDisplayPipe]
})
export class ChatAreaComponent {

  chatService = inject (ChatService); 

  chat = input.required<Chat>(); 

  chatMessages$ = computed (() => this.chatService.getMessages(this.chat())); 
  
}
