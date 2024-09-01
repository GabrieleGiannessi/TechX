import { Component, input, model } from '@angular/core';

@Component({
  selector: 'app-filter-button',
  standalone: true,
  imports: [],
  templateUrl: './filter-button.component.html',
  styleUrl: './filter-button.component.css'
})
export class FilterButtonComponent {

    label = input.required<string> ();
    state = model.required<string> ();
    
    setState() {
       this.state.update((state) => ( state.concat(this.label())))     
    }

    removeState (){
      this.state.update((state) => ( state.replace(this.label(), '')));  
    }
   
}
