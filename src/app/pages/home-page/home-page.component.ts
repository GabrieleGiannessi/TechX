import { Component, effect, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SearchbarComponent } from "../../components/searchbar/searchbar.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [SearchbarComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  authService = inject (AuthService); 
  router = inject (Router); 

  search = 'articles' //lo passo alla searchbar

  constructor(){
    effect (() => 
    console.log (this.authService.currentUserCredential())); 
  }

}
