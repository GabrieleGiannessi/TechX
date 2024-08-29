import { Component, effect, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  authService = inject (AuthService); 
  router = inject (Router); 

  constructor(){
    effect (() => 
    console.log (this.authService.logged())); 
  }

}
