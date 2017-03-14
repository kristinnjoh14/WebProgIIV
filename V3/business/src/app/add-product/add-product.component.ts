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
  notValid : boolean = false;
  id : number;
  constructor(private service : SellersService, private route : ActivatedRoute) { }
  postNewProduct() {
    if(!this.newProduct.name || this.newProduct.price < 0 
    || this.newProduct.quiantityInStock <0) {
      this.notValid = true;
      return;
    }
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
