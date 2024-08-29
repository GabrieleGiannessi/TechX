import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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
  
  form : FormGroup = new FormGroup({
    email: new FormControl ('', [Validators.required]),
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
