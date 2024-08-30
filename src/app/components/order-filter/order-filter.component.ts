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
  
  params = model.required<Params>(); 
  
  setAsc(){
    this.params.set({ ...this.params(), order: 'ASC' }); 
  }
  
  setDesc(){
    this.params.set({ ...this.params(), order : 'DESC' }); 
  }
  
  reset() {
    this.params.set({ ...this.params(), order : ''})
  }

}
