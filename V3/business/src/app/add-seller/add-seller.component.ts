import { Component, OnInit } from '@angular/core';
import { Seller, SellersService } from './../sellers.service'
@Component({
  selector: 'app-add-seller',
  templateUrl: './add-seller.component.html',
  styleUrls: ['./add-seller.component.css']
})
export class AddSellerComponent implements OnInit {
  newSeller : Seller = <Seller>{};
  notValidated : boolean = false;
  constructor(private service : SellersService) { }
  postNewSeller() {
    if(!this.newSeller.name) {
      this.notValidated = true;
    }
    else {
      this.service.postSeller(this.newSeller);
    }
  }
  ngOnInit() {
  }

}
