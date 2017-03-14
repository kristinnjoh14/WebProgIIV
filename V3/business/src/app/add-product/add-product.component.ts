import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Seller, SellersService, Product } from './../sellers.service';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  newProduct : Product = <Product>{};
  postedProduct : Product = <Product>{};
  id : number;
  constructor(private service : SellersService, private route : ActivatedRoute) { }
  postNewProduct() {
    this.service.postProduct(this.newProduct, this.id).subscribe(result => {
    this.postedProduct = result;
    });
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
  }

}
