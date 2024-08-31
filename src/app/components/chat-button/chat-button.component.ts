import { Component, effect, ElementRef, inject, input, Output, ViewChild, EventEmitter } from '@angular/core';
import { Chat } from '../../services/chat.service';
import { StorageService } from '../../services/storage.service';
import { DateDisplayPipe } from "../../pipes/date-display.pipe";

@Component({
  selector: 'app-chat-button',
  standalone: true,
  imports: [DateDisplayPipe],
  templateUrl: './chat-button.component.html',
  styleUrl: './chat-button.component.css',
})
export class ChatButtonComponent {

  storage = inject (StorageService); 
  
  chat = input.required<Chat>(); 
  @Output() chatSelected = new EventEmitter<Chat>(); 

  @ViewChild('profileImage') profileImage! : ElementRef<HTMLInputElement>;

  constructor() {
    effect (() => {
      if (this.chat().chatPic){
        this.storage.fetchProfilePic(this.chat().chatPic!).then((url) => {
          if (this.profileImage && this.profileImage.nativeElement){
            this.profileImage.nativeElement.src = url; 
          }
        });
      }
    })
  }

  selectChat(){
    this.chatSelected.emit(this.chat()); 
  }
}
