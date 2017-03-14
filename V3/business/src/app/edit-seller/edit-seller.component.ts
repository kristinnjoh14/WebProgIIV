import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Seller, SellersService } from './../sellers.service';
import { ToastrService } from 'toastr-ng2';
@Component({
  selector: 'app-edit-seller',
  templateUrl: './edit-seller.component.html',
  styleUrls: ['./edit-seller.component.css']
})
export class EditSellerComponent implements OnInit {
  seller : Seller = <Seller>{};
  newSeller : Seller = <Seller>{};
  id : number;
  constructor(private service : SellersService, private route : 
  ActivatedRoute, private toastr : ToastrService) { }
  postChanges() {
    if(!this.seller.name) {
      this.toastr.warning('Vinsamlegast farðu yfir að allar upplýsingar hafi verið rétt skráðar.', 'Aðgerð hafnað');
      return;
    }
    else if(this.newSeller.category == this.seller.category &&
    this.newSeller.imagePath == this.seller.imagePath &&
    this.newSeller.name == this.seller.name){
      this.toastr.warning('Seljanda hefur þegar verið breytt', 'Aðgerð hafnað');
    }
    else {
      this.service.editSeller(this.seller).subscribe(result => {
        this.newSeller = result;
        this.toastr.success('Seljanda hefur verið breytt', 'Aðgerð tókst!');
      });
    }
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.service.getSellerById(this.id).subscribe(result => {
      this.seller = result;
    });
  }
}
