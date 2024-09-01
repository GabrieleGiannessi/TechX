import { Component, effect, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SearchbarComponent } from "../../components/searchbar/searchbar.component";
import { CategoryButtonComponent } from "../../components/category-button/category-button.component";



@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [SearchbarComponent, CategoryButtonComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  authService = inject (AuthService); 
  router = inject (Router); 

  search = 'articles' //lo passo alla searchbar
  
  cardColors: string[] = [
    '#007bff',  // Blu
    '#007bff',
    '#28a745',  // Verde
    '#dc3545',  // Rosso
    '#ffc107',  // Giallo
    '#6c757d',  // Grigio
    '#17a2b8',  // Ciano
    '#e83e8c',  // Rosa
    '#343a40'   // Scuro
  ];

  categories: string[] = [
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
  

  constructor(){
    effect (() => 
    console.log (this.authService.currentUserCredential())); 
  }

}
