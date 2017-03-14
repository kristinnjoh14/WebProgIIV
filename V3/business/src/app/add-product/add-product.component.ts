import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'toastr-ng2';
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
  constructor(private service : SellersService, private route : 
  ActivatedRoute, private toastr : ToastrService) { }
  postNewProduct() {
    if(!this.newProduct.name || this.newProduct.price < 0 
    || this.newProduct.quantityInStock <0) {
      this.toastr.warning('Vinsamlegast farðu yfir að allar upplýsingar hafi verið rétt skráðar.', 'Aðgerð hafnað');
      return;
    }
    else if(this.postedProduct.imagePath == this.newProduct.imagePath &&
    this.postedProduct.name == this.newProduct.name &&
    this.postedProduct.price == this.newProduct.price &&
    this.postedProduct.quantityInStock == this.newProduct.quantityInStock) {
      this.toastr.warning('Vöru hefur nú þegar verið bætt við', 'Aðgerð hafnað')
      return;
    }
    this.service.postProduct(this.newProduct, this.id).subscribe(result => {
      this.postedProduct = this.newProduct;
      this.toastr.success('Vöru hefur verið bætt við','Aðgerð tókst');
    });
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
  }

}
