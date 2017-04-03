import { Component, OnInit } from '@angular/core';
import { ServerService } from './../server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName: string;
  nameTaken = false;
  nameTooLong = false;
  constructor(private server: ServerService, private router: Router) { }
  onLogin() {
    if (this.userName.length < 21) {
      this.nameTooLong = false;
      this.server.login(this.userName).subscribe(succeeded => {
        this.nameTaken = !succeeded;
        if (succeeded) {
          this.router.navigate(['/home']);
        }
      });
    } else {
      this.nameTooLong = true;
      this.nameTaken = false;
    }
  }
  ngOnInit() {
  }

}
