import { Component, computed, effect, inject, signal } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserComponent } from "../../components/user/user.component";

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [UserComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.css'
})
export class UsersPageComponent {

  firestore = inject (FirestoreService); 
  router = inject (Router); 
  route = inject (ActivatedRoute); 

  username = signal<string> ('')

  userList = computed (() => this.firestore.users().filter (user => user.username.toLowerCase().includes(this.username().toLowerCase())))

  log = effect (() => console.log (this.userList())); 

  constructor (){
    if (this.route.snapshot.queryParams['title']) this.username.set (this.route.snapshot.queryParams['title']); 
  } 

}
