import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServerService } from './../server.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  room: String;
  pass: String;
  validated: boolean = false;
  passwordRequired: boolean = true;
  message: String;
  messageHistory: String[];

  constructor(private route: ActivatedRoute,
    private server: ServerService, private router : Router) {
    if(!this.server.userName) {
      this.router.navigate(['login']);
      return;
    }
    this.room = this.route.snapshot.params['id'];
    this.pass = this.route.snapshot.params['imagineThisIsEncryptedOrSth'];
    this.server.joinRoom(this.room, this.pass).subscribe(succeeded => {
      if (succeeded === true) {
        this.validated = true;
        console.log("room joined");
      }
      else {
        this.validated = false;
      }
    });
    this.server.getMsg(this.room).subscribe(msgHistory => {
      this.messageHistory = msgHistory;
    });
  }

  checkPassword() {
    this.server.joinRoom(this.room, this.pass).subscribe(succeeded => {
      if (succeeded === true) {
        this.validated = true;
        console.log("room joined");
      }
      else {
        this.validated = false;
      }
    });
  }

  sendMsg() {
    this.server.sendMsg(this.message, this.room);
  }

  ngOnInit() {
  }

}
