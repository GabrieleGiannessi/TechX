import { inject, Injectable } from '@angular/core';
import { ref, Storage } from '@angular/fire/storage';
import { getDownloadURL } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  storage = inject (Storage); 

  updateProfilePic(){}

  fetchProfilePic(URL : string ){
    return getDownloadURL(ref(this.storage, 'images/profiles/'+URL));
    
  }

  uploadArticlePhoto(){}
  fetchArticlePhoto(){}
}
