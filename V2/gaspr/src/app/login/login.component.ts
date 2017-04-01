import { Component, OnInit } from '@angular/core';
import { ServerService } from './../server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName : string = 'kiddi';
  nameTaken : boolean = false;
  constructor(private server : ServerService, private router : Router) { }
  onLogin() {
    this.server.login(this.userName).subscribe(succeeded => {
      this.nameTaken = !succeeded;
      if(succeeded) {
        this.router.navigate(['/home']);
      }
    });
  }
  ngOnInit() {
  }

}
