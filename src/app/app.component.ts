import { Component, OnInit } from '@angular/core';
import { Writer } from './models/writer';
import { Poem } from './models/poem';
import { WriterService } from './services/writer.service';
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

export class AppComponent {
  selectedWriter: Writer;
  title = 'I am the poet of the body, I am the poet of the soul';
  //apiHost = environment.apiHost

  eventListenWriter(writer: Writer): void {
    this.selectedWriter = writer;

  }
}
