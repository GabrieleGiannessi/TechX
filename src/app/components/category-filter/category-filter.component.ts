import { Component, model, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
]; 

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [ NgbTypeahead, FormsModule, ReactiveFormsModule],
  templateUrl: './category-filter.component.html',
  styleUrl: './category-filter.component.css'
})
export class CategoryFilterComponent {

  label = model.  required<string>()
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
      this.label.set(this.text.value); 
    }
  }

  setCategory(e : NgbTypeaheadSelectItemEvent ) {
    const value =  e.item; 
    this.label.set (value)
    }
}
