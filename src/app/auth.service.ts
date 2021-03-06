import { SessionService } from './session.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private session: SessionService) { }

  public isSignedIn(){
    return !!this.session.accessToken;
  }

  public doSignOut(){
    this.session.destroy();
  }

  public doSignIn(accessToken: string, name: string){
    if((!accessToken) || (!name)){
      return;
    }
    this.session.accessToken = accessToken;
    this.session.name = name;
    console.log(this.session);
  }

}
