import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SellersService, Seller, Productlist } from './../sellers.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  id : number;
  name : string;
  imgpath : string;
  category : string;
  productlist : Productlist;
  constructor(private route : ActivatedRoute, private service : SellersService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.service.getSellerById(this.id).subscribe(result => {
      this.name = result.name;
      this.imgpath = result.imagePath;
      this.category = result.category;
    });
    this.service.getProductsBySellerId(this.id).subscribe(result => {
      this.productlist = result;
    });
  }

}