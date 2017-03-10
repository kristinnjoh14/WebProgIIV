import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, SellersService } from './../sellers.service';

@Component({
  selector: 'app-top-ten',
  templateUrl: './top-ten.component.html',
  styleUrls: ['./top-ten.component.css']
})
export class TopTenComponent implements OnInit {
  id : number;
  topProducts : Product[] = [];
  constructor(private route : ActivatedRoute, 
  private service : SellersService) { }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.service.getProductsBySellerId(this.id).subscribe(result => {
      this.topProducts = result.sort(function(a,b) {
      return (a.quantitySold > b.quantitySold) ? -1 : 
      ((b.quantitySold > a.quantitySold) ? 1 : 0);} ).slice(0,10);
    });
  }

}
