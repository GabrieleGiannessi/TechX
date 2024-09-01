import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-button',
  standalone: true,
  imports: [],
  templateUrl: './category-button.component.html',
  styleUrl: './category-button.component.css'
})
export class CategoryButtonComponent {

  router = inject (Router); 

  bgColor = input.required<string>(); 
  title = input.required<string>(); 

}
