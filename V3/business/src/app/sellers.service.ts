import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/rx';

export interface Seller {
  id : number;
  name: string;
  category : string;
  imagePath : string;
}

export interface Productlist {
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
  getProductsBySellerId(id : number) : Observable<Productlist> {
    return this.http.get(`http://localhost:5000/api/sellers/${id}/products`).map(response => {
      return <Productlist> response.json();
    });
  }

}
