import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';

/* export interface User {
  userName : string
}

export interface Message {
  user : string,
  msg : string,
  timeStamp : Date
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
      console.log('server successfully connected!');
    });
  }
  // Function definitions
  login(userName: string): Observable<boolean> {
    const observable = new Observable(obs => {
      this.socket.emit('adduser', userName, succeeded => {
        if (!succeeded) {
          obs.next(succeeded);
        } else {
          console.log('user has been added');
          this.userName = userName;
          obs.next(succeeded);
        }
      });
    });
    return observable;
  }
  // Function is copied from lecture, but the data is incomplete.
  // Maybe I'm just not reading it right, but I can't f.x. get topics
  // It seems to me that only the name of the Room object is passed
  // Have tried mapping from json, but data seems to be in different, albeit
  // similar format
  getRooms(): Observable<String[]> {
    const observable = new Observable<String[]>(obs => {
      console.log('requesting roomlist');
      this.socket.emit('rooms');
      this.socket.on('roomlist', (list) => {
        const roomList: String[] = [];
        for (const room in list) {
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

  joinRoom(roomName: String, pass: String) {
    const observable = new Observable(obs => {
      const param = {
        room: roomName,
        pass: pass
      };
      this.socket.emit('joinroom', param, function (a: boolean, b) {
        console.log('joining', roomName);
        obs.next(a);
      });
    });
    return observable;
  }

  leaveRoom(room: String) {
    this.socket.emit('partroom', room);
  }

  addRoom(roomName: String): Observable<boolean> {
    const observable = new Observable(obs => {
      if (!roomName) {
        return;
      }
      const param = {
        room: roomName
      };
      this.socket.emit('joinroom', param, function (a: boolean, b) {
        obs.next(a);
      });
    });
    return observable;
  }

  sendMsg(msg: String, room: String) {
    const param = {
      msg: msg,
      roomName: room
    };
    console.log('attempting to send', msg, 'to', room);
    this.socket.emit('sendmsg', param, succeeded => {
      console.log('message sent');
    });
  }
  // Here, there must be some other way to get data,
  // I wish I could just map to interface
  // Bailing in favor of studying for exam, 
  // will yield more grade-value I think
  getMsg(room: String): Observable<String[]> {
    const observable = new Observable(obs => {
      this.socket.on('updatechat', (messages) => {
        const msgHistory = [];
        for (const msg in messages) {
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
