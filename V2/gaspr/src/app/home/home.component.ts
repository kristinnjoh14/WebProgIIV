import { Component, OnInit } from '@angular/core';
import { ServerService } from './../server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  rooms: String[];
  newRoom: String;
  constructor(private server: ServerService, private router: Router) {
    if (this.server.userName) {
      server.getRooms().subscribe(list => {
        this.rooms = list;
      })
    }
    else {
      router.navigate(['login']);
    }
  }
  foo() {
    console.log(this.rooms);
    for (var room in this.rooms) {
      console.log(room);
    }
  }
  joinRoom(room: String) {
    console.log(room);
    this.server.joinRoom(room).subscribe(succeeded => {
      if (succeeded) {
        console.log(room, "joined");
      }
      else {
        console.log(room, "was not joined");
      }
    })
  }
  addRoom() {
    if (this.newRoom.length > 0) {
      this.server.addRoom(this.newRoom).subscribe(succeeded => {
        if(succeeded ===true) {
          //this.newRoom = "";
          this.router.navigate(['room', this.newRoom]);
        }
      });
    }
  }

  ngOnInit() {
  }

}