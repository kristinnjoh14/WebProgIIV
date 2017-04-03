import { Component } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { ServerService } from './server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Gaspr';
  constructor(private router : Router, private server : ServerService) {
  }
  goToLogin() {
    this.router.navigate(['login']);
  }
}
