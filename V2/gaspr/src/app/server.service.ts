import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';


@Injectable()
export class ServerService {
  socket: any;
  constructor() {
    this.socket = io('http://localhost:8080');
    this.socket.on('connect', function () {
      console.log("server successfully connected!");
    });
  }
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

}
