import { Component, OnInit } from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import { environment } from '../environments/environment';

import './rxjs-operators';


@Component({
  selector: 'my-app',
  template: `
    <nav style="margin-left: 40px;">
    </nav>
    <router-outlet></router-outlet>
    `
})

export class AppComponent { }
