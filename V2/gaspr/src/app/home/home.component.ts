import { Component, OnInit } from '@angular/core';
import { ServerService } from './../server.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  rooms : String[];
  constructor(private server : ServerService) {
    server.getRooms().subscribe(list => {
      this.rooms = list;
    })
   }

  ngOnInit() {
  }

}
