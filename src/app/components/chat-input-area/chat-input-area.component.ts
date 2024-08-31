import { Component, inject, input } from '@angular/core';
import { Chat, ChatService } from '../../services/chat.service';
import { AbstractControl, FormControl, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat-input-area',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './chat-input-area.component.html',
  styleUrl: './chat-input-area.component.css'
})
export class ChatInputAreaComponent {

  chatService = inject (ChatService); 

  noWhiteSpaceValidator(c: AbstractControl): ValidationErrors | null {
    return c.value.trim().length > 0 ? null : { 'whitespace': true };
  }

  userID = input.required<string>(); 
  chat = input.required<Chat>();
  text = new FormControl('', [Validators.required, this.noWhiteSpaceValidator])


  onKeyUp(e: KeyboardEvent) {
    if (e.key === 'Escape'){
      this.text.reset(); 
    }

    if (e.key === 'Enter'){
      //send message 
      if (this.text.valid){
        this.chatService.sendMessage(this.chat(), this.text.value!, this.userID());    
        this.text.reset(); 
      }
    }
  }

  sendMessageFromIcon() {
    if (this.text.valid){
      this.chatService.sendMessage(this.chat(), this.text.value!, this.userID());    
      this.text.reset(); 
    }
  }

  //addMessage
}
