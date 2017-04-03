import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServerService } from './../server.service';
// import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  room: String;
  pass: String;
  validated = false;
  passwordRequired = true;
  message: String;
  messageHistory: String[] = [];

  constructor(private route: ActivatedRoute,
    private server: ServerService, private router: Router) {
    if (!this.server.userName) {
      this.router.navigate(['login']);
      return;
    }
    this.room = this.route.snapshot.params['id'];
    this.pass = this.route.snapshot.params['imagineThisIsEncryptedOrSth'];
    this.server.joinRoom(this.room, this.pass).subscribe(succeeded => {
      if (succeeded === true) {
        this.validated = true;
        console.log('room joined');
      } else {
        this.validated = false;
      }
    });
    this.messageHistory = [];
  }
  leaveRoom() {
    this.server.leaveRoom(this.room);
  }
  checkPassword() {
    this.server.joinRoom(this.room, this.pass).subscribe(succeeded => {
      if (succeeded === true) {
        this.validated = true;
        console.log('room joined');
      } else {
        this.validated = false;
      }
    });
  }

  sendMsg() {
    this.server.sendMsg(this.message, this.room);
    this.message =  '';
  }
  // Have tried many things both here and in serverservice to get the messages
  // But it seems that the server's response is actually quite hard to deal with
  // without mapping from JSON. The same applies to getting a room's topic.
  ngOnInit() {
    this.server.getMsg(this.room).subscribe(msgHistory => {
      this.messageHistory = [];
      for (const msg in msgHistory) {
        if (msgHistory.hasOwnProperty(msg)) {
          this.messageHistory.push(msg);
        }
      }
      console.log(msgHistory);
    });
  }

}
