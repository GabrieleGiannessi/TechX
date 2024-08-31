import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { FirestoreService } from '../../services/firestore.service';
import { StorageService } from '../../services/storage.service';
import { getDownloadURL } from '@angular/fire/storage';
import { Timestamp } from 'firebase/firestore';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

const categories: string[] = [
  "PC e componenti",
  "Fotocamere e videocamere",
  "Memorie",
  "Droni",
  "Dispositivi di archiviazione",
  "Telefonia",
  "Tablet",
  "Dispositivi IOT",
];
@Component({
  selector: 'app-create-new-article-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-new-article-page.component.html',
  styleUrl: './create-new-article-page.component.css'
})
export class CreateNewArticlePageComponent {

  firestore = inject(FirestoreService);
  storage = inject(StorageService);
  authService = inject (AuthService); 
  router = inject(Router); 
  modalService = inject(NgbModal);
  closeResult = '';

  @ViewChild('content') content!: TemplateRef<any>;


  isCategoryValid(c: AbstractControl): ValidationErrors | null {
    if (!c.value) return { notvalid: true }
    return categories.includes(c.value) ? null : { notvalid: true }
  }

  form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required, this.isCategoryValid]),
    state: new FormControl('', ),
    description: new FormControl('', [Validators.required, Validators.minLength(30)]),
    price: new FormControl('', [Validators.required])
  })

   showPreview() {
    let fileInput = <HTMLInputElement>document.querySelector('#article-photos')!;
    let imageContainer = document.querySelector('#images')!;
    let numOfFile = <HTMLElement>document.querySelector('#num-of-files')!;
  
    imageContainer.innerHTML = '';
    if (fileInput.files!.length > 0) {
      numOfFile.textContent = `${fileInput.files!.length} file selezionati`;
    }else numOfFile.textContent = 'Nessun file selezionato';
  
    const filesArray = Array.from(fileInput.files!);
  
    for (const file of filesArray) {
      let reader = new FileReader();
      let figure = document.createElement('figure');
      reader.onload = () => {
        let img = document.createElement('img');
        img.setAttribute('src', reader.result as string); 
        figure.appendChild(img);
      }
      imageContainer.appendChild(figure);
      reader.readAsDataURL(file);
    }
  }
  

  onSubmit(e: Event) {
    e.preventDefault();

    this.form.markAllAsTouched();

    if (!this.form.valid) return;

    // Aggiungiamo le foto dell'articolo allo storage

    const { state, title, description, price, category } = this.form.value; 

    const element = <HTMLInputElement>document.querySelector('#article-photos');
    const input = element.files ? element.files : null;

    if (!input) return;

    const uploadedPhotoUrls: string[] = [];

    const uploadPhotoAndGetUrl = (file: File): Promise<string> => {
      return this.storage.uploadArticlePhoto(file);
    };

    const uploadPromises = Array.from(input).map(file => {
      return uploadPhotoAndGetUrl(file).then(url => {
        uploadedPhotoUrls.push(url);
      });
    });

    if (this.authService.currentUserCredential()){
      this.firestore.addArticle({ 
        userID : this.authService.currentUserCredential()!.uid, 
        title : title, 
        category: category, 
        price: price, 
        photos : uploadedPhotoUrls, 
        state : state, 
        data : Timestamp.fromDate(new Date()),
        description : description,
        numPrefers : 0, 
        preferList : []
      })
    }

    // Quando tutti gli upload sono completati
    Promise.all(uploadPromises).then(() => {
      console.log('Tutte le foto sono state caricate:', uploadedPhotoUrls);

      //inserisco l'articolo su firestore e do la conferma all'utente del successo dell'operazione
      //this.firestore.updateArticlePhotos()

      // Mostra popup di conferma o altro
      this.open(this.content); 

    }).catch(error => {
      console.error('Errore nel caricamento delle foto:', error);
    });
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
