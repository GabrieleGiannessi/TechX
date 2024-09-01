import { Component, computed, effect, inject, model, OnInit, signal, ViewChild } from '@angular/core';
import { FilterButtonComponent } from "../../components/filter-button/filter-button.component";
import { Article, FirestoreService } from '../../services/firestore.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ArticleComponent } from "../../components/article/article.component";
import { AuthService } from '../../services/auth.service';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, filter, map, merge, Observable, OperatorFunction, Subject } from 'rxjs';
import { CategoryFilterComponent } from "../../components/category-filter/category-filter.component";
import { OrderFilterComponent } from "../../components/order-filter/order-filter.component";
import { PriceFilterComponent } from "../../components/price-filter/price-filter.component";



@Component({
  selector: 'app-articles-page',
  standalone: true,
  imports: [FilterButtonComponent, ArticleComponent, CategoryFilterComponent, OrderFilterComponent, PriceFilterComponent],
  templateUrl: './articles-page.component.html',
  styleUrl: './articles-page.component.css'
})
export class ArticlesPageComponent implements OnInit {

  firestore = inject (FirestoreService)
  router = inject (Router)
  route = inject (ActivatedRoute)
  authService = inject (AuthService)

  title = signal<string>(''); 
  category = signal<string>(''); 
  order = signal<string>(''); 
  max = signal<number>(9999);
  min = signal<number>(0);

  log = effect (() => console.log (this.category())); 

  articles = signal <Article[]> ( this.firestore.articles() ); 
  dbArticles = computed (() => this.articles()); 

  ngOnInit () : void {
    this.route.queryParamMap.subscribe(params => {
      const titleParam = params.get('title');
      const categoryParam = params.get('category');
      const orderParam = params.get("order");
      const priceMaxParam = params.get('maxprice'); 
      const priceMinParam = params.get("minprice");

      if(titleParam) this.title.set(titleParam);

      this.filter(titleParam, categoryParam, orderParam, priceMaxParam, priceMinParam );
      });
  }
  filter(title: string | null, category: string | null, order: string | null, max: string | null, min: string | null ) {
    
    if (title) this.articles.set ( this.articles().filter(article => article.title.toLowerCase().includes(title.toLowerCase()))); 
    if (category) this.articles.set ( this.articles().filter (article => article.category === category)); 
    if (order){
      if(order === 'ASC') this.articles.set(this.articles().sort((a, b) => a.price - b.price));
      if (order === 'DESC') this.articles.set(this.articles().sort((a, b) => b.price - a.price));
    }
    if (max && min) this.articles.set (this.articles().filter((article) => article.price <= this.max() && article.price >= this.min()));
  }

  onFormSubmit() {
    this.router.navigate(['articles'], {queryParams : {
      title : this.title(),
      category : this.category(), 
      order : this.order(),
      max : this.max(),
      min : this.min()
    }, 
    queryParamsHandling: 'merge'
    }); 
    }
}
