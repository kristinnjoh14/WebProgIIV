import { Component, OnInit } from '@angular/core';
import { Seller, SellersService } from './../sellers.service';
import { ToastrService } from 'toastr-ng2'
@Component({
  selector: 'app-add-seller',
  templateUrl: './add-seller.component.html',
  styleUrls: ['./add-seller.component.css']
})
export class AddSellerComponent implements OnInit {
  newSeller : Seller = <Seller>{};
  postedSeller : Seller = <Seller>{};
  constructor(private service : SellersService, private toastr : ToastrService) { }
  postNewSeller() {
    if(!this.newSeller.name) {
      console.log("postNewSeller() was called without a name");
      this.toastr.warning('Vinsamlegast farðu yfir að allar upplýsingar hafi verið rétt skráðar.', 'Aðgerð hafnað');
      return;
    }
    else if(this.postedSeller.name == this.newSeller.name &&
    this.postedSeller.category == this.newSeller.category &&
    this.postedSeller.imagePath == this.newSeller.imagePath) {
        this.toastr.warning('Seljanda hefur nú þegar verið bætt við', 'Aðgerð hafnað');
        return;
    }
    else {
      this.service.postSeller(this.newSeller).subscribe(result => {
        this.postedSeller = result;      
        this.toastr.success('Seljanda hefur verið bætt við', 'Aðgerð tókst');
      });
    }
  }
  ngOnInit() {
  }

}
