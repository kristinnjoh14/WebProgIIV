import { Component, OnInit } from '@angular/core';
import { SellersService, Seller } from './../sellers.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [SellersService]
})
export class HomeComponent implements OnInit {
  private sellers : Seller[];
  constructor(private service : SellersService) {  }
  getSellers() {
    this.service.getSellers().subscribe(result => {
      this.sellers = result;
    });
    console.log("getting sellers");
  }
  ngOnInit() {
    this.service.getSellers().subscribe(result => {
      this.sellers = result;
    });
  }

}
