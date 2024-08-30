import { Component, computed, effect, ElementRef, inject, input, model, TemplateRef, ViewChild } from '@angular/core';
import { Article, FirestoreService } from '../../services/firestore.service';
import { FirestoreError } from 'firebase/firestore';
import { StorageService } from '../../services/storage.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent {

  firestore = inject (FirestoreService); 
  storage = inject (StorageService); 
  authService = inject (AuthService); 
  router = inject (Router); 
  modalService = inject (NgbModal);
  closeResult = '';

  @ViewChild ('content') content! : TemplateRef<any>; 
  @ViewChild('profileImage') profileImage! : ElementRef<HTMLInputElement>;
  @ViewChild('articleImage') articleImage! : ElementRef<HTMLInputElement>;

  article  = input.required<Article>(); //id dell'articolo
  title = computed (() => this.article().title);
  description = computed (() => this.article().description);
  price = computed (() => this.article().price);

  user = computed (() => this.firestore.users().find(user => user.uid === this.article().userID)); //utente che ha fatto l'articolo
  username = computed (() => this.user()?.username); 
  photoURL = computed (() => this.user()?.photoURL); 

  isPrefered = model.required<boolean>(); 

  prefer = computed (() => this.isPrefered());

  constructor (){
    effect (() => {
      if (this.user()?.photoURL){
        this.storage.fetchProfilePic(this.user()!.photoURL).then(profilePic => {
          if (this.profileImage && this.profileImage.nativeElement){
            this.profileImage.nativeElement.src = profilePic;
          }
        })
      }
    })
  }

  setPrefer(){
    if (this.authService.logged()){
      if (this.isPrefered()){
        this.firestore.updateNumPrefersArticle(this.article().id, this.article().numPrefers - 1)
          this.firestore.deleteFromPreferList (this.authService.currentUserCredential()!.uid, this.article().id)
            this.isPrefered.set(false); 
      }else{
        this.firestore.updateNumPrefersArticle(this.article().id, this.article().numPrefers + 1)
          this.firestore.updatePreferList (this.authService.currentUserCredential()!.uid, this.article().id)
            this.isPrefered.set(true)
      }
    }else {
      this.open(this.content); //apro il modal per loggarsi
    }

  }

  signInWithGoogle (){
    return this.authService.signInWithGoogle().then (() => this.router.navigateByUrl ('/articles'));
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
