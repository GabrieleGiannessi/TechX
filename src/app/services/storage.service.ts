import { inject, Injectable } from '@angular/core';
import { ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { getDownloadURL } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  storage = inject (Storage); 

  async uploadProfilePic(input : HTMLInputElement) {
    const files = input.files ? input.files : null;
    if (!files) return null; 

    if (files.length === 1) {
      const storage = ref (this.storage, files[0].name); 
      return uploadBytesResumable (storage, files[0]); 

    }

    return null; 
  }

  fetchProfilePic(url : string ){
    return getDownloadURL(ref(this.storage, 'profiles/'+url));
    
  }

  uploadArticlePhoto(){
  }

  fetchArticlePhoto(url : string){
    return getDownloadURL(ref(this.storage, 'articles/'+url))
  }
}
