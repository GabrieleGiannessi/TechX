import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { FilterButtonComponent } from "../../components/filter-button/filter-button.component";
import { Article, FirestoreService } from '../../services/firestore.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleComponent } from "../../components/article/article.component";
import { AuthService } from '../../services/auth.service';
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
 
  articles = computed (() => this.filter(this.title(), this.category(), this.order(), this.max(), this.min()))

  ngOnInit () : void {
    this.route.queryParamMap.subscribe(params => {
      const titleParam = params.get('title');
      const categoryParam = params.get('category');

      if(titleParam) this.title.set(titleParam);
      if(categoryParam) this.category.set(categoryParam);
      });
  }

  filter(title: string | null, category: string | null, order: string | null, max: number | null, min: number | null) {
    let filteredArticles = this.firestore.articles(); // Inizialmente usa tutti gli articoli

    if (title) {
        filteredArticles = filteredArticles.filter(article => 
            article.title.toLowerCase().includes(title.toLowerCase())
        );
    }

    if (category) {
        filteredArticles = filteredArticles.filter(article => 
            article.category === category
        );
    }

    if (order) {
        filteredArticles = filteredArticles.sort((a, b) => {
            if (order === 'ASC') {
                return a.price - b.price;
            } else if (order === 'DESC') {
                return b.price - a.price;
            }
            return 0; // Se l'ordine non è né 'ASC' né 'DESC', non cambiare nulla
        });
    }

    //filtro per il prezzo dell'articolo
    const maxVal = max ? max : Infinity;  // Default infinito se max non è definito
    const minVal = min ? min : 0;         // Default 0 se min non è definito

  filteredArticles = filteredArticles.filter(article => 
    article.price >= minVal && article.price <= maxVal
  );

    // Imposta gli articoli filtrati e ordinati
    return filteredArticles; 
  }
}
