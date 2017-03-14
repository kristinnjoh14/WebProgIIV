import { Component, OnInit } from '@angular/core';
import { Seller, SellersService } from './../sellers.service'
@Component({
  selector: 'app-add-seller',
  templateUrl: './add-seller.component.html',
  styleUrls: ['./add-seller.component.css']
})
export class AddSellerComponent implements OnInit {
  newSeller : Seller = <Seller>{};
  postedSeller : Seller = <Seller>{};
  constructor(private service : SellersService) { }
  postNewSeller() {
    if(!this.newSeller.name) {
      console.log("postNewSeller() was called without a name");
      return;
    }
    else {
      this.service.postSeller(this.newSeller).subscribe(result => {
      this.postedSeller = result;      
    });
    }
  }
  ngOnInit() {
  }

}
