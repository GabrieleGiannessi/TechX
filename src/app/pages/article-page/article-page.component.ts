import { Component, computed, effect, inject, input, TemplateRef, ViewChild } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FirestoreService } from '../../services/firestore.service';
import { AuthService } from '../../services/auth.service';
import { ModalDismissReasons, NgbCollapseModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  router = inject (Router); 

  id = input.required<string>(); 
  isCollapsed = true;
  price = new FormControl ('', [Validators.required]); 

  article = computed (() => this.firestore.articles().find(article => article.id === this.id())!); 
  articlePhotos = computed (() => this.article()?.photos.slice (1)); 

  user = computed (() => this.firestore.users().find(user => user.uid === this.article()?.userID)); //utente che ha fatto l'articolo

  @ViewChild('content') content!: TemplateRef<any>;
  modalService = inject(NgbModal);
  closeResult = '';


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

      this.open(this.content); //apro il modal di avvenuta rimozione 
    }
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }

  
  
}

