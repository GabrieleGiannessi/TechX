import { Component, computed, effect, ElementRef, inject, input, signal, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FirestoreService } from '../../services/firestore.service';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';
import { FilterButtonComponent } from "../../components/filter-button/filter-button.component";
import { ArticleComponent } from "../../components/article/article.component";

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [FilterButtonComponent, ArticleComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent {

  authService = inject (AuthService); 
  firestore = inject (FirestoreService); 
  storage = inject (StorageService); 
  router = inject (Router)

  @ViewChild('profileImage') profileImage! : ElementRef<HTMLInputElement>; 

  id = input.required<string>(); 

  state = signal<string>(''); 
  user = computed (() => this.firestore.users().find ((user) => user.uid === this.id())); 

  userArticles = computed (() => {
    return this.state() ? this.firestore.articles().filter ((article) => article.userID === this.user()?.uid && article.state === this.state()) :
     this.firestore.articles().filter ((article) => article.userID === this.user()?.uid); 
  })
  
  constructor(){
    effect (() => {
      if (this.user()){
        if (this.user()?.photoURL){
          this.storage.fetchProfilePic(this.user()!.photoURL).then((url) => {
            if (this.profileImage && this.profileImage.nativeElement){
              this.profileImage.nativeElement.src = url;
            }
          });
        }
      }
    })
  }

  uploadPhoto(){
    const input = <HTMLInputElement> document.querySelector('#profile'); 
    const files = input.files ? input.files : null; 
    if (files){
      this.storage.uploadProfilePic(input); 
      this.firestore.updateProfilePic(this.id(), files[0]!.name); 
      if (this.authService.currentUserCredential()?.uid === this.id()){ //aggiornamento in tempo reale
        this.authService.currentUserSig.update ((user) => ({ ...user!, photoURL: files[0]!.name }))
      }
    } 
  }

}
