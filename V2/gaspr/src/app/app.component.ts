import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServerService } from './server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Gaspr';
  constructor(private server : ServerService) {

  }
}
