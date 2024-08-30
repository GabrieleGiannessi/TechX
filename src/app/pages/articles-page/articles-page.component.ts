import { Component, inject } from '@angular/core';
import { FilterButtonComponent } from "../../components/filter-button/filter-button.component";
import { FirestoreService } from '../../services/firestore.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  route = inject (ActivatedRoute)

  queryParams : Params = {
    title : '', 
    category : '', 
    order : '', 
  }

  constructor(){
    if (this.route.snapshot.queryParams['title']) this.queryParams['title'] = this.route.snapshot.queryParams['title'];
    if (this.route.snapshot.queryParams['category']) this.queryParams['category'] = this.route.snapshot.queryParams['category'];
    if (this.route.snapshot.queryParams['order']) this.queryParams['order'] = this.route.snapshot.queryParams['order'];
  }

  

}
