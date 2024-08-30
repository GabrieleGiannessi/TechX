import { Component, computed, effect, inject, input } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ArticleComponent } from "../../components/article/article.component";
import { FilterButtonComponent } from "../../components/filter-button/filter-button.component";
import { filter } from 'rxjs';

@Component({
  selector: 'app-saved-article-page',
  standalone: true,
  imports: [ArticleComponent, FilterButtonComponent],
  templateUrl: './saved-article-page.component.html',
  styleUrl: './saved-article-page.component.css'
})
export class SavedArticlePageComponent {

  firestore = inject (FirestoreService)
  router = inject (Router)
  route = inject (ActivatedRoute)
  authService = inject (AuthService)

  id = input.required<string>(); //id utente
  user = computed (() => this.firestore.users().find (user => user.uid === this.id()))

  filterList = computed (() => this.user()?.preferList); 

  savedArticles = computed (() => this.firestore.articles().filter(article => this.filterList()!.some((articleID) => articleID === article.id ))); 
   

  queryParams : Params = {
    title : '', 
    category : '', 
    order : '', 
  }

  constructor(){
    effect (() => {

    })
  }
}
