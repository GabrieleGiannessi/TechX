import { Component, inject, ViewChild } from '@angular/core';
import { FilterButtonComponent } from "../../components/filter-button/filter-button.component";
import { FirestoreService } from '../../services/firestore.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ArticleComponent } from "../../components/article/article.component";
import { AuthService } from '../../services/auth.service';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, filter, map, merge, Observable, OperatorFunction, Subject } from 'rxjs';
import { CategoryFilterComponent } from "../../components/category-filter/category-filter.component";
import { OrderFilterComponent } from "../../components/order-filter/order-filter.component";



@Component({
  selector: 'app-articles-page',
  standalone: true,
  imports: [FilterButtonComponent, ArticleComponent, CategoryFilterComponent, OrderFilterComponent],
  templateUrl: './articles-page.component.html',
  styleUrl: './articles-page.component.css'
})
export class ArticlesPageComponent {

  firestore = inject (FirestoreService)
  router = inject (Router)
  route = inject (ActivatedRoute)
  authService = inject (AuthService)

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

  onFormSubmit(e: MouseEvent) {
    e.preventDefault();

    
    this.router.navigate(['articles'], {queryParams : this.queryParams}); 
  
    }



}
