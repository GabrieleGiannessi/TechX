import { Component, computed, effect, inject, input } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FirestoreService } from '../../services/firestore.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-article-page',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './article-page.component.html',
  styleUrl: './article-page.component.css'
})
export class ArticlePageComponent {

  firestore = inject (FirestoreService); 
  authService = inject (AuthService); 

  id = input.required<string>(); 

  article = computed (() => this.firestore.articles().find (article => article.id === this.id())); 
  articlePhotos = computed (() => this.article()?.photos.slice (1)); 

  constructor (){
    effect (() =>{
      console.log (this.article())
      console.log (this.articlePhotos())
    } ) 

  }
}
