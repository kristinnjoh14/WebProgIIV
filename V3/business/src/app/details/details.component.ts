import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SellersService, Seller, Product } from './../sellers.service';
import { TabsModule } from 'ng2-bootstrap/tabs';

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
  productlist : Product[];
  constructor(private route: ActivatedRoute, private service: SellersService) {}

  getSellerProducts() {
    this.service.getProductsBySellerId(this.id).subscribe(result => {
      this.productlist = result;
    });
  }
  alertMe() {
    console.log("What the shit, man\n");
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.service.getSellerById(this.id).subscribe(result => {
      this.name = result.name;
      this.imgpath = result.imagePath;
      this.category = result.category;
      this.getSellerProducts();
    });
  }

}