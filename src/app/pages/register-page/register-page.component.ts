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

  usernameIsTaken = (firestoreService: FirestoreService) : ValidatorFn => {
    return (c : AbstractControl) => {
      if (firestoreService.users().filter(u => u.displayName === c.value).length > 0) return { istaken : true };
      return null; 
    }
  }

  noWhiteSpaceValidator (c : AbstractControl) : ValidationErrors | null {
    return c.value.trim().length === c.value.length ? null : { whitespace : true };
  }

  form : FormGroup = new FormGroup ({
    email: new FormControl('', [Validators.required,Validators.email]), 
    password : new FormControl ('', [Validators.required, Validators.minLength(8), this.noWhiteSpaceValidator]), 
    username : new FormControl ('', [Validators.required, Validators.minLength(5), this.noWhiteSpaceValidator, this.usernameIsTaken(this.firestoreService)])
  }); 

  
onSubmit(e : Event) {
  e.preventDefault(); 

  if (!this.form.valid) return; 

  const { email, password, username } = this.form.value; 
  this.authService.register(email, password).then(response => {
    this.firestoreService.addUser({
      uid : response.user.uid,  
      email : email, 
      displayName : username, 
      photoURL : 'unknown.png', 
      description: '', 
      preferList : [], 
      phoneNumber : ''
    }).then(() => {
      this.router.navigateByUrl ('/home'); 
    })
  })
  .catch ((error) => { console.log (error.message); })
}


}
