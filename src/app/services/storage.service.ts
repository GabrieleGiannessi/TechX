import { inject, Injectable } from '@angular/core';
import { ref, Storage } from '@angular/fire/storage';
import { getDownloadURL } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  storage = inject (Storage); 

  updateProfilePic(){}

  fetchProfilePic(url : string ){
    return getDownloadURL(ref(this.storage, 'images/profiles/'+url));
    
  }

  uploadArticlePhoto(){

  }
  
  fetchArticlePhoto(url : string){
    return getDownloadURL(ref(this.storage, 'images/articles/'+url))
  }
}
