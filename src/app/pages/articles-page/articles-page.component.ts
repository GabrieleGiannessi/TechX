import { Component, inject } from '@angular/core';
import { FilterButtonComponent } from "../../components/filter-button/filter-button.component";
import { FirestoreService } from '../../services/firestore.service';
import { Router } from '@angular/router';
import { ArticleComponent } from "../../components/article/article.component";

@Component({
  selector: 'app-articles-page',
  standalone: true,
  imports: [FilterButtonComponent, ArticleComponent],
  templateUrl: './articles-page.component.html',
  styleUrl: './articles-page.component.css'
})
export class ArticlesPageComponent {

  firestore = inject (FirestoreService); 
  router = inject (Router)

}
