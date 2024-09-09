import { Component, model, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Params } from '@angular/router';
import { NgbTypeahead, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, filter, map, merge, Observable, OperatorFunction, Subject } from 'rxjs';


const categories : string[] =[
  "PC e componenti", 
  "Fotocamere e videocamere",
  "Memorie",
  "Droni", 
  "Dispositivi di archiviazione",
  "Telefonia",
  "Tablet",
  "Dispositivi IOT",
  "Strumenti audio",
]; 

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [ NgbTypeahead, FormsModule, ReactiveFormsModule],
  templateUrl: './category-filter.component.html',
  styleUrl: './category-filter.component.css'
})
export class CategoryFilterComponent {
  
  category = model.required<string>()
  text :  FormControl = new FormControl('', [Validators.required]); 
  
  @ViewChild('instance', { static: true }) instance!: NgbTypeahead;
  
	focus$ = new Subject<string>();
	click$ = new Subject<string>();
  
	search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
		const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
		const inputFocus$ = this.focus$;
    
		return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map((term) =>
				(term === '' ? categories : categories.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10),
    ),
  );
};

onKeyUp (e : KeyboardEvent) {
  if (e.key === "escape"){
    this.text.setValue(''); 
  }
  
  if (e.key === "Enter"){
    this.category.set(this.text.value); 
    }
  }

reset(e : MouseEvent) {
  e.stopPropagation(); //non faccio propagare il click al bottone

  this.category.set('');
  this.text.setValue('')
}

setCategory(e : NgbTypeaheadSelectItemEvent ) {
    const value =  e.item; 
    this.category.set(value);
  }
}
