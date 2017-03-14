import { Component, OnInit } from '@angular/core';
import { Seller, SellersService, Product } from './../sellers.service';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  newProduct : Product = <Product>{};
  constructor() { }
  postNewProduct() {
    console.log(JSON.stringify(this.newProduct));
  }
  ngOnInit() {
  }

}
