import { computed, inject, Injectable, signal } from '@angular/core';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  auth = inject (Auth); 

  currentUserSig = signal <UserInterface | null | undefined>(undefined); 
  currentUserCredential = computed (() => {
    if (this.currentUserSig()) return this.currentUserSig();
    return null; 
  })

  register (){}

  login(){}

  logout(){}

  loginWithGoogle(){}

}

export interface UserInterface {
  uid : string; 
  phoneNumber : string; 
  email : string; 
  description : string; 
  preferList : string[]; 
}