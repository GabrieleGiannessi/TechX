import { Component, model } from '@angular/core';
import { Params } from '@angular/router';

@Component({
  selector: 'app-order-filter',
  standalone: true,
  imports: [],
  templateUrl: './order-filter.component.html',
  styleUrl: './order-filter.component.css'
})
export class OrderFilterComponent {
  
  order = model.required<string>(); 
  
  setAsc(){
    this.order.set('ASC'); 
  }
  
  setDesc(){
    this.order.set('DESC'); 
  }
  
  reset() {
    this.order.set(''); 
  }

}
