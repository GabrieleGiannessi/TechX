import { Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { DateDisplayPipe } from './pipes/date-display.pipe';
import { DatePipe, isPlatformBrowser } from '@angular/common';
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

  constructor(@Inject(PLATFORM_ID) private platformId: Object){}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.notificationService.subscribeToPush(); 
    }
  }
  
  
}
