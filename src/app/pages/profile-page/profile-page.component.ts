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
    if (this.state()) return this.firestore.articles().filter( (article) => article.userID === this.id()); 
    return this.firestore.articles().filter( (article) => article.userID === this.id() && article.state === this.state());
  } )
  
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
