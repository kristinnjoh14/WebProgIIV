import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SellersService, Product } from './../sellers.service'
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  product : Product = <Product>{};
  newProduct : Product = <Product>{};
  notValid : boolean = false;
  sid : number;
  pid : number;
  constructor(private service : SellersService, private route : ActivatedRoute) { }
  postChanges() {
    if(!this.product.name || this.product.price < 0 ||
     this.product.quiantityInStock < 0) {
      this.notValid = true;
      return;
    }
    else {
      this.service.editProduct(this.product, this.sid).subscribe(result => {
        this.newProduct = result;
      });
    }
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.sid = +params['sid'];
      this.pid = +params['pid'];
    });
    this.product = this.service.getProductBySellerAndProductId(this.sid, this.pid);
  }

}
