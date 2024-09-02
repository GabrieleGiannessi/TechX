import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { DateDisplayPipe } from './pipes/date-display.pipe';
import { DatePipe } from '@angular/common';
import { SwPush } from '@angular/service-worker';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [DatePipe, DateDisplayPipe]
})
export class AppComponent implements OnInit{
  title = 'TechX';

  notificationService = inject (NotificationService); 

  ngOnInit(): void {
    this.notificationService.subscribeToPush(); 
  }
  
  
}
