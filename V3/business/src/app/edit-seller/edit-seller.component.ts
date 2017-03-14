import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Seller, SellersService } from './../sellers.service'
@Component({
  selector: 'app-edit-seller',
  templateUrl: './edit-seller.component.html',
  styleUrls: ['./edit-seller.component.css']
})
export class EditSellerComponent implements OnInit {
  seller : Seller = <Seller>{};
  newSeller : Seller = <Seller>{};
  id : number;
  constructor(private service : SellersService, private route : ActivatedRoute) { }
  postChanges() {
    if(!this.seller.name) {
      return;
    }
    else {
      this.service.editSeller(this.seller).subscribe(result => {
        this.newSeller = result;
      });
    }
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.service.getSellerById(this.id).subscribe(result => {
      this.seller = result;
    });
  }

}
