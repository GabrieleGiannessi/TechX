import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { FirestoreService } from '../../services/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

  authService = inject (AuthService); 
  firestoreService = inject (FirestoreService); 
  router = inject (Router);

  usernameIsTaken = (firestore: FirestoreService): ValidatorFn => {
    return (c: AbstractControl): ValidationErrors | null => {
      return firestore.users().some(u => u.username === c.value) ? { istaken: true } : null;
    }
  }

  noWhiteSpaceValidator(c: AbstractControl): ValidationErrors | null {
    if (!c.value) return null;  // Controlla se c.value è null o undefined
    return c.value.trim().length === c.value.length ? null : { whitespace: true };
  }
  

  form : FormGroup = new FormGroup ({
    email: new FormControl('', [Validators.required,Validators.email]), 
    password : new FormControl ('', [Validators.required, Validators.minLength(8), this.noWhiteSpaceValidator]), 
    username : new FormControl ('', [Validators.required, Validators.minLength(5), this.noWhiteSpaceValidator, this.usernameIsTaken(this.firestoreService)])
  }); 

  
onSubmit(e : Event) {
  e.preventDefault(); 
  this.form.markAllAsTouched(); 

  if (!this.form.valid) return; 

  const { email, password, username } = this.form.value; //sono validi
  this.authService.register(email, password).then(response => {
    this.firestoreService.addUser({
      uid : response.user.uid,  
      email : email, 
      username : username, 
      photoURL : 'unknown.png', 
      description: '', 
      preferList : [], 
      phoneNumber : ''
    }); 
    this.router.navigateByUrl ('/home'); 
  })
  .catch ((error) => { console.log (error.message); })
}


}
