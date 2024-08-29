import { Component, effect, ElementRef, inject, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  authService = inject(AuthService);
  router = inject (Router);  
  storage = inject(StorageService); 
  
  @ViewChild('profileImage') profileImage! : ElementRef<HTMLInputElement>;

  constructor (){
    effect (() => {
      if(this.authService.logged()){
        if (this.authService.currentUserCredential()?.photoURL){
          //prelevo la foto usando il servizio di storage
          this.storage.fetchProfilePic(this.authService.currentUserCredential()!.photoURL).then(pic => {
            if (this.profileImage && this.profileImage.nativeElement){
              this.profileImage.nativeElement.src = pic; 
            }
          })
        }
      }
    }
  )}

  signInWithGoogle (){
    return this.authService.signInWithGoogle();
  }

}
