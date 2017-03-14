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
  alreadyPosted : boolean = false;
  constructor(private service : SellersService) { }
  postNewSeller() {
    if(!this.newSeller.name) {
      console.log("postNewSeller() was called without a name");
      return;
    }
    else if(this.postedSeller.name == this.newSeller.name &&
    this.postedSeller.category == this.newSeller.category &&
    this.postedSeller.imagePath == this.newSeller.imagePath) {
        this.alreadyPosted = true;
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
