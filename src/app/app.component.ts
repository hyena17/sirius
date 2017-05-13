import { Component, Input, OnInit, NgZone } from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import { environment } from '../environments/environment';
import { WindowRef } from './windowRef';

import './rxjs-operators';


@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html'
})

export class AppComponent {
  name: string;
  email: string;

  constructor(private _ngZone: NgZone) {
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
          this.name = response.name.substr(0, response.name.indexOf(" "));
          this.email = response.email;
        });
      }
    );
  }

  myfacebookLogout() {
    WindowRef.get().FB.logout(
      (response: any) => {
        this._ngZone.run(() => {
          this.name = undefined;
          this.email = undefined;
        });
      }
    );
  }

}
