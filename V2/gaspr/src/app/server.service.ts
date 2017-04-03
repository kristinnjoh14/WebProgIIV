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
  userName: string;
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
          this.userName = userName;
          obs.next(succeeded);
        }
      });
    });
    return observable;
  }

  getRooms(): Observable<String[]> {
    let observable = new Observable<String[]>(obs => {
      console.log("requesting roomlist");
      this.socket.emit('rooms');
      this.socket.on('roomlist', (list) => {
        let roomList: String[] = [];
        for (var room in list) {
          if (list.hasOwnProperty(room)) {
            roomList.push(room);
          }
        }
        obs.next(roomList);
      }
      );
    });
    return observable;
  }

  joinRoom(roomName: String, pass : String) {
    let observable = new Observable(obs => {
      var param = {
        room: roomName,
        pass: pass
      }
      this.socket.emit('joinroom', param, function (a : boolean, b) {
        console.log("joining", roomName);
        obs.next(a);
      });
    });
    return observable;
  }

  addRoom(roomName: String) : Observable<boolean> {
    const observable = new Observable(obs => {
      if(!roomName) {
        return;
      }
      var param = {
        room: roomName
      }
      this.socket.emit('joinroom', param, function (a: boolean, b) {
        obs.next(a);
      });
    });
    return observable;
  }

  sendMsg(msg : String, room : String) {
    var param = {
      msg : msg,
      roomName : room
    }
    console.log("attempting to send",msg,"to",room);
    this.socket.emit('sendmsg', param, succeeded => {
      console.log("message sent");
    });
  }

  getMsg(room : String) : Observable<String[]> {
    const observable = new Observable(obs => {
      this.socket.on('updatechat', room, this.userName, (messages) => {
        let msgHistory : String[] = [];
        for (var msg in messages) {
          if (messages.hasOwnProperty(msg)) {
            msgHistory.push(msg);
          }
        }
        obs.next(msgHistory);
      });
    });
    return observable;
  }
}
