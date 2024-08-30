import { Component, model } from '@angular/core';

@Component({
  selector: 'app-order-filter',
  standalone: true,
  imports: [],
  templateUrl: './order-filter.component.html',
  styleUrl: './order-filter.component.css'
})
export class OrderFilterComponent {

  label = model.required<string>(); 

  setAsc(){
    this.label.set('ASC'); 
  }

  setDesc(){
    this.label.set('DESC'); 
  }


}
