import { Component, inject, signal, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  authService = inject (AuthService); 
  router = inject(Router);
  modalService = inject(NgbModal);
  closeResult = '';

  error = signal <string> (''); 
  @ViewChild('content') content!: TemplateRef<any>;

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

  form : FormGroup = new FormGroup({
    email: new FormControl ('', [Validators.required, Validators.email]),
    password: new FormControl ('', [Validators.required]),  
  })

  onSubmit($event: Event) {
    $event.preventDefault(); 
    this.form.markAllAsTouched(); 

    if (!this.form.valid) return; 

    const { email, password } = this.form.value;
    this.authService.login(email, password).then(response => {
      this.router.navigateByUrl('/home');
    })
    .catch (err => {
      this.error.set (err.message); 
      this.open(this.content); 
    })
  }

   showPassword(e: Event) {
    const icon = e.target as HTMLElement;
    const input = document.querySelector<HTMLInputElement>('#password');

    if (input) {
        if (icon.classList.contains('bi-eye-slash')) {
          icon.classList.remove('bi-eye-slash');
          icon.classList.add('bi-eye');
          input.type = 'text'; // Nascondi la password
        } else {
          icon.classList.remove('bi-eye');
          icon.classList.add('bi-eye-slash');
          input.type = 'password'; // Mostra la password
        }
    }
}

}
