import { Component, effect, ElementRef, inject, TemplateRef, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  
  authService = inject(AuthService);
  router = inject (Router);  
  storage = inject(StorageService); 
  
  modalService = inject (NgbModal);
  closeResult = '';
  
  @ViewChild('profileImage') profileImage! : ElementRef<HTMLInputElement>;
  @ViewChild('content') content!: TemplateRef<any>;
  
  constructor (){
    effect (() => {
      if(this.authService.logged()){
        if (this.authService.currentUserCredential()?.photoURL){
          //prelevo la foto usando il servizio di storage
          this.storage.fetchProfilePic(this.authService.currentUserCredential()!.photoURL).then(pic => {
            if (this.profileImage && this.profileImage.nativeElement){
              this.profileImage.nativeElement.src = pic; 
            }
          })
        }
      }
    }
  )}
  
  signInWithGoogle (){
    this.authService.signInWithGoogle().then (() => {
      this.router.navigateByUrl ('/home'); 
    });
    this.modalService.dismissAll(); 
  }
  
  logout() {
    this.authService.logout(); 
    this.router.navigateByUrl('home'); 
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
