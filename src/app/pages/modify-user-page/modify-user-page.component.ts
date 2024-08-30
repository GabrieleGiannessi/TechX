import { Component, inject, input, TemplateRef, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FirestoreService } from '../../services/firestore.service';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modify-user-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modify-user-page.component.html',
  styleUrl: './modify-user-page.component.css'
})
export class ModifyUserPageComponent {


  authService = inject(AuthService);
  firestoreService = inject(FirestoreService);
  router = inject(Router);
  modalService = inject(NgbModal); 
  closeResult = ''; 

  id = input.required<string>();

  @ViewChild('content') content!: TemplateRef<any>;

  usernameIsTaken = (firestore: FirestoreService): ValidatorFn => {
    return (c: AbstractControl): ValidationErrors | null => {
      return firestore.users().some(u => u.username === c.value) ? { istaken: true } : null;
    }
  }

  noWhiteSpaceValidator(c: AbstractControl): ValidationErrors | null {
    if (!c.value) return null;  // Controlla se c.value è null o undefined
    return c.value.trim().length === 0 ? null : { whitespace: true };
  }

  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(5), this.noWhiteSpaceValidator, this.usernameIsTaken(this.firestoreService)]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
    description: new FormControl('', [Validators.required, Validators.minLength(30)]),
  });

  onSubmit(e: Event) {
    e.preventDefault();

    const { username, phoneNumber, description } = this.form.value;

    console.log('username: ', username)
    console.log('phoneNumber: ', phoneNumber); 
    console.log ('description: ', description);
    let flag = false;

    //controlliamo uno per uno
    if (this.form.controls['username'].valid && username) {
      //si modifica lo username del chiamante
      this.firestoreService.updateUsername(this.id(), username); //probabile modifica a currentUser ù
      flag = true;
    }

    if (this.form.controls['phoneNumber'].valid && phoneNumber) {
      //si modifica il phoneNumber del chiamante
      this.firestoreService.updatePhoneNumber(this.id(), phoneNumber); //probabile modifica a currentUser 
      flag = true;

    }

    if (this.form.controls['description'].valid && description) {
      //si modifica la description del chiamante
      this.firestoreService.updateDescription(this.id(), description); //probabile modifica a currentUser 
      flag = true;
    }

    if (flag) {
      this.open(this.content); 
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
