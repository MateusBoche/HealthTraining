import { Injectable } from '@angular/core';
import { UserCredential } from '../domain/dto/user-credential';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() {}
  
  authenticate(credential: UserCredential){
    console.log(`trying to authenticate...`);
    console.log(credential);

  }

  logout(){


  }
}
