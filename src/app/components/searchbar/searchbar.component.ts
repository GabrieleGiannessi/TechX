import { Component, inject, model } from '@angular/core';
import { FormControl, FormControlDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css'
})
export class SearchbarComponent {
  
  router = inject (Router); 
  search = model.required<string>()

  text = new FormControl(''); 
  
  onSearchTypeChange(e : Event) {
  
    const select = <HTMLInputElement> e.target;
    const input = <HTMLInputElement> document.querySelector ('#search'); 
    this.search.set(select.value); 

    if (this.search() === 'articles'){
      input.placeholder = 'Es: Iphone 13'; 
    }else {
      input.placeholder = 'Cerca una persona';
    }
  }

  onKeyUp(e: KeyboardEvent) {
      if (e.key === 'Escape'){
        this.text.setValue(''); 
      }

      if(e.key === 'Enter'){
        this.router.navigate([this.search()], { queryParams : {
          title : this.text.value
      }})
      }

    }
}
