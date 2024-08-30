import { Component, computed, effect, ElementRef, inject, input, ViewChild } from '@angular/core';
import { Article, FirestoreService } from '../../services/firestore.service';
import { FirestoreError } from 'firebase/firestore';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent {

  firestore = inject (FirestoreService); 
  storage = inject (StorageService); 

  @ViewChild('profileImage') profileImage! : ElementRef<HTMLInputElement>;

  article  = input.required<Article>(); //id dell'articolo
  title = computed (() => this.article().title);
  description = computed (() => this.article().description);
  price = computed (() => this.article().price);

  user = computed (() => this.firestore.users().find(user => user.uid === this.article().userID)); //utente che ha fatto l'articolo
  username = computed (() => this.user()?.username); 
  photoURL = computed (() => this.user()?.photoURL); 

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
