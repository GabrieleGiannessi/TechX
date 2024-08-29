import { inject, Injectable } from '@angular/core';
import { Storage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  storage = inject (Storage); 

  updateProfilePic(){}
  fetchProfilePic(){}

  uploadArticlePhoto(){}
  fetchArticlePhoto(){}
}
