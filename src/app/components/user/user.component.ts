import { Component, effect, ElementRef, inject, input, ViewChild } from '@angular/core';
import { UserInterface } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  storage = inject (StorageService); 
  router = inject (Router)

  user = input.required<UserInterface> (); 

  @ViewChild('profileImage') profileImage! : ElementRef<HTMLInputElement>;
  
  constructor (){
    effect (() => {
      if (this.user()?.photoURL){
        this.storage.fetchProfilePic(this.user()!.photoURL).then(profilePic => {
          if (this.profileImage && this.profileImage.nativeElement){
            this.profileImage.nativeElement.src = profilePic;
          }
        })
      }
    })
  }
}
