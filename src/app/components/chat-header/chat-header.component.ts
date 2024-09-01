import { Component, computed, effect, ElementRef, inject, input, ViewChild } from '@angular/core';
import { Chat } from '../../services/chat.service';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { AuthService } from '../../services/auth.service';

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
    authService = inject (AuthService);  

    chat = input.required<Chat>(); 

    //devo recuperare l'id dello user con cui sto chattando 
    otherUserID = computed (() => {
      if (this.authService.currentUserCredential()){
        const otherIndex = this.chat().userIDs.indexOf(this.authService.currentUserCredential()!.uid) ? 0 : 1; 
        return this.chat().userIDs[otherIndex]; 
      }
      return ''; 
    })

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
