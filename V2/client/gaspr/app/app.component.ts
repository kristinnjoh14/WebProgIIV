import {Component} from 'angular2/core';
import * as io from "socket.io-client";
@Component({
    selector: 'my-app',
    template: `<h1>Please choose a username to get started</h1>
    <form onsubmit="onLogin()">
        Username: <input ([ngModel])="username" placeholder="username" type="text" >
    </form>
    <p>{{username}}</p>
    <p *ngIf="loginFailed">Sorry, that username is taken</p>`
})
export class AppComponent { 
    username : string = "Kiddi";
    socket : any;
    loginFailed : boolean;
    constructor() {
        this.socket = io("http://localhost:8080/");
        this.socket.on("connect", function() {
            console.log("Successfully connected to server.")
        });
    }

    onLogin() {
        this.socket.emit("adduser", this.username, succeeded => {
            if(!succeeded) {
                this.loginFailed = true;
            }
            else {
                console.log("You have successfully logged in");
            }
        });
    }
 }