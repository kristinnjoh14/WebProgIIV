import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

/* export interface User {
  userName : string
}

export interface Message {
  msg : string
}

export interface Room {
  users : User[],
	ops : User[],
	banned : User[],
	messageHistory : Message[],
	topic : string,
	locked : boolean,
	password : string
} */

@Injectable()
export class ServerService {
  socket: any;
  constructor() {
    this.socket = io('http://localhost:8080');
    this.socket.on('connect', function () {
      console.log("server successfully connected!");
    });
  }
  //Function definitions
  login(userName: string): Observable<boolean> {
    let observable = new Observable(obs => {
      this.socket.emit('adduser', userName, succeeded => {
        if (!succeeded) { obs.next(succeeded); }
        else {
          console.log("user has been added");
          obs.next(succeeded);
        }
      });
    });
    return observable;
  }

  getRooms() : Observable<String[]> {
    let observable = new Observable<String[]>(obs => {
      console.log("requesting roomlist");
      this.socket.emit('rooms');
      this.socket.on('roomlist', (list) => {
          let roomList : String[] = [];
          for(var room in list) {
            roomList.push(room);
          }
          obs.next(roomList);
        }
      );
    });
    return observable;
  }
}
