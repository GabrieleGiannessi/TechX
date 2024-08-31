import { Component, inject, input } from '@angular/core';
import { Message } from '../../services/chat.service';
import { AuthService } from '../../services/auth.service';
import { DateDisplayPipe } from "../../pipes/date-display.pipe";

@Component({
  selector: 'app-chat-message',
  standalone: true,
  imports: [DateDisplayPipe],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.css',
})
export class ChatMessageComponent {

  authService = inject (AuthService); 

  message = input.required<Message>(); 

}
