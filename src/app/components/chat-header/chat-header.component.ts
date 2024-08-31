import { Component, effect, ElementRef, inject, input, ViewChild } from '@angular/core';
import { Chat } from '../../services/chat.service';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-chat-header',
  standalone: true,
  imports: [],
  templateUrl: './chat-header.component.html',
  styleUrl: './chat-header.component.css'
})
export class ChatHeaderComponent {

    router = inject(Router); 
    storage = inject (StorageService); 

    chat = input.required<Chat>(); 

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

}
