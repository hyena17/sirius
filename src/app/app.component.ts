import { Component, Input, OnInit, NgZone } from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import { environment } from '../environments/environment';
import { WindowRef } from './windowRef';

import './rxjs-operators';


@Component({
  selector: 'my-app',
  template: `
  <!-- header -->
  <header class="header-fixed">
    <div class="header-limiter">
      <h1>
          U<span>boo</span>
      </h1>
    </div>
    <div *ngIf="name" class="header-limiter" align="right">
          {{name}}
    </div>
  </header>
  <div class="header-fixed-placeholder"></div>


  <!--Display the application -->

  <div class="container">
    <div class="row">

    <nav style="margin-left: 40px;">
    </nav>
    <router-outlet></router-outlet>
    <div  *ngIf="name===undefined" align="center">
      <button type="button" class="btn btn-primary" (click)="myFacebookStatus()">Login with Facebook</button>
    </div>

    </div>

  </div>
    `
})

export class AppComponent {
  name: string;

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
    WindowRef.get().FB.api('/me',
      (response: any) => {
        this._ngZone.run(() => {
          this.name = response.name.substr(0, response.name.indexOf(" "));
        });
      }
    );
  }

}
