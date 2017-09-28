import { Component, Input, OnInit, NgZone } from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import { environment } from '../environments/environment';
import { WindowRef } from './windowRef';
import {User} from './models/user';

import './rxjs-operators';


@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html'
})

export class AppComponent {
  currentUser: User;

  constructor(private _ngZone: NgZone) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  myFacebookStatus() {
    WindowRef.get().FB.getLoginStatus((response: any) => {
      if (response.status === 'connected') {
        this.myfacebookProfile();
      } else {
        WindowRef.get().FB.login((response: any) => { this.myfacebookProfile(); }, { scope: 'public_profile,email' });
      }
    });
  }

  myfacebookProfile() {
    WindowRef.get().FB.api('/me', 'get', { fields: 'id,name,email,gender' },
      (response: any) => {
        this._ngZone.run(() => {
          var name = response.name.substr(0, response.name.indexOf(" "));
          var email = response.email;
          localStorage.setItem('currentUser', JSON.stringify({ name: name, email: email }));
          location.reload();
        });
      }
    );
  }

  myfacebookLogoutWrapper() {
    WindowRef.get().FB.getLoginStatus((response: any) => {
      if (response.status === 'connected') {
        this.myFacebookLogout();
      } else {
        WindowRef.get().FB.login((response: any) => { this.myFacebookLogout(); }, { scope: 'public_profile,email' });
      }
    });
  }

  myFacebookLogout() {
    WindowRef.get().FB.logout(
      (response: any) => {
        this._ngZone.run(() => {
          localStorage.removeItem('currentUser');
          location.reload();
        });
      }
    );
  }

}
