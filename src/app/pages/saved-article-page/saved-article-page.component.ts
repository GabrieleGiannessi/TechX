import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ArticleComponent } from "../../components/article/article.component";
import { FilterButtonComponent } from "../../components/filter-button/filter-button.component";
import { filter } from 'rxjs';
import { PriceFilterComponent } from "../../components/price-filter/price-filter.component";
import { OrderFilterComponent } from "../../components/order-filter/order-filter.component";
import { CategoryFilterComponent } from "../../components/category-filter/category-filter.component";

@Component({
  selector: 'app-saved-article-page',
  standalone: true,
  imports: [ArticleComponent, FilterButtonComponent, PriceFilterComponent, OrderFilterComponent, CategoryFilterComponent],
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
 
  category = signal<string>(''); 
  order = signal<string>(''); 
  max = signal<number>(9999);
  min = signal<number>(0);

  savedArticles = computed (() => this.filter(this.category(), this.order(), this.max(), this.min())); 

  filter(category: string | null, order: string | null, max: number | null, min: number | null) {
    let filteredArticles = this.firestore.articles().filter(article => this.firestore.users().find (user => user.uid === this.id())?.preferList!.some((articleID) => articleID === article.id )); // Inizialmente usa gli articoli salvati

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
