import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-password-page.component.html',
  styleUrl: './forgot-password-page.component.css'
})
export class ForgotPasswordPageComponent {

  authService = inject (AuthService); 
  modalService = inject(NgbModal); 
  router = inject (Router)
  closeResult = ''; 

  email : FormControl = new FormControl ('', [Validators.required, Validators.email]);
  @ViewChild ('content') content! : TemplateRef<any>; 

  onSubmit(e: Event) {
    e.preventDefault(); 
    this.email.markAsTouched(); 

    if (!this.email.valid) return; 

    const email = this.email.value;
    this.authService.sendPasswordResetEmail(email).then(() => {
      this.open(this.content); 
    })
    
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
