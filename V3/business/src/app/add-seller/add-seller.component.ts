import { Component, OnInit } from '@angular/core';
import { Seller, SellersService } from './../sellers.service'

@Component({
  selector: 'app-add-seller',
  templateUrl: './add-seller.component.html',
  styleUrls: ['./add-seller.component.css']
})
export class AddSellerComponent implements OnInit {
  newSeller : Seller;
  notValidated : boolean = false;
  constructor(private service : SellersService) { }
  validateSeller() {
    //Do amazing things
    if(this.newSeller) {
      console.log(this.newSeller.name);
    }
  }
  ngOnInit() {
    this.newSeller.name = "Jón";
    this.newSeller.category = "Rusl";
    this.newSeller.imagePath = "";
  }

}
