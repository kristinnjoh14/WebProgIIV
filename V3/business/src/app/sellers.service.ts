import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/rx';

export interface Seller {
  id : number;
  name: string;
  category : string;
  imagePath : string;
}

export interface Product {
  id : number;
  name : string;
  price : number;
  quantitySold : number;
  quiantityInStock : number;
  imagePath : string;
}

@Injectable()
export class SellersService {

  constructor(private http : Http) { }

  getSellers() : Observable<Seller[]> {
    return this.http.get("http://localhost:5000/api/sellers").map(response => {
      return <Seller[]> response.json();
    });
  }
  getSellerById(id : number) : Observable<Seller> {
    return this.http.get(`http://localhost:5000/api/sellers/${id}`).map(response => {
      return <Seller> response.json();
    });
  }
  getProductsBySellerId(id : number) : Observable<Product[]> {
    return this.http.get(`http://localhost:5000/api/sellers/${id}/products`).map(response => {
      return <Product[]> response.json();
    });
  }
  getProductBySellerAndProductId(sid : number, pid : number) : Product {
    let product : Product = <Product>{};
    this.getProductsBySellerId(sid).subscribe(result => {
      let productlist : Product[] = result;
      productlist.forEach(resP => {
        if(resP.id == pid) {
          product.name = resP.name;
          product.price = resP.price;
          product.quantitySold = resP.quantitySold;
          product.quiantityInStock = resP.quiantityInStock;
          product.imagePath = resP.imagePath;
          product.id = resP.id;
        }
      });
    });
    return product;
  }
  postSeller(newSeller : Seller) : Observable<Seller> {
    return this.http.post(`http://localhost:5000/api/sellers`, newSeller)
    .map(response => {
      return <Seller> response.json();
    });
  }
  postProduct(newProduct : Product, id : number) : Observable<Product> {
    return this.http.post(`http://localhost:5000/api/sellers/${id}/products`, newProduct)
    .map(response => {
      return <Product> response.json();
    });
  }
  editSeller(seller : Seller) : Observable<Seller> {
    return this.http.put(`http://localhost:5000/api/sellers/${seller.id}`, seller)
    .map(response => {
      return <Seller> response.json();
    })
  }
  editProduct(product : Product, sid : number) : Observable<Product> {
    return this.http.put(`http://localhost:5000/api/sellers/${sid}/products/${product.id}`, product)
    .map(response => {
      return <Product> response.json();
    })
  }

}
