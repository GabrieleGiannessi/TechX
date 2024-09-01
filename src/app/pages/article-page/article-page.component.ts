import { Component, computed, effect, inject, input } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FirestoreService } from '../../services/firestore.service';
import { AuthService } from '../../services/auth.service';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-article-page',
  standalone: true,
  imports: [NavbarComponent, NgbCollapseModule, ReactiveFormsModule],
  templateUrl: './article-page.component.html',
  styleUrl: './article-page.component.css'
})
export class ArticlePageComponent {

  firestore = inject (FirestoreService); 
  authService = inject (AuthService); 

  id = input.required<string>(); 
  isCollapsed = true;
  price = new FormControl ('', [Validators.required]); 

  article = computed (() => this.firestore.articles().find(article => article.id === this.id())!); 
  articlePhotos = computed (() => this.article()?.photos.slice (1)); 

  user = computed (() => this.firestore.users().find(user => user.uid === this.article()?.userID)); //utente che ha fatto l'articolo

  constructor (){
    effect (() =>{
      console.log (this.user())
    })
  }

  updatePrice(){
    if(!this.price.valid) return; 
    this.firestore.updatePrice (this.id(), parseFloat(this.price.value!)); 
  }

  //metodo usato per rimuovere l'articolo
  removeArticle() {
    if (this.article()){
      this.firestore.deleteArticle(this.article().id!); 

      //rimuovere dalla lista dei preferiti (se presente) degli utenti l'articolo (funzione di cleanup)
      this.firestore.users().forEach((user) => {
        if (user.preferList.includes(this.article().id!)){
          this.firestore.deleteArticleFromUser (user.uid, this.article().id!); //rimuoviamo dal db l'articolo presente nella preferList
        } 
      })
    }
  }
  
  
}

