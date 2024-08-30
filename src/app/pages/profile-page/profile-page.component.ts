import { Component, computed, effect, ElementRef, inject, input, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FirestoreService } from '../../services/firestore.service';
import { computeMsgId } from '@angular/compiler';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent {

  authService = inject (AuthService); 
  firestore = inject (FirestoreService); 
  storage = inject (StorageService); 

  @ViewChild('profileImage') profileImage! : ElementRef<HTMLInputElement>; 

  id = input.required<string>(); 

  user = computed (() => this.firestore.users().find ((user) => user.uid === this.id())); 
  
  constructor(){
    effect (() => {
      if (this.user()){
        if (this.user()?.photoURL){
          console.log (this.user()?.photoURL)
          this.storage.fetchProfilePic(this.user()!.photoURL).then((url) => {
            if (this.profileImage && this.profileImage.nativeElement){
              this.profileImage.nativeElement.src = url;
            }
          });
        }
      }
    })
  }


  
}
