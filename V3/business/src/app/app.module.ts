import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SellersService } from './sellers.service';
import { DetailsComponent } from './details/details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertModule } from 'ng2-bootstrap';
import { TabsModule } from 'ng2-bootstrap/tabs';
import { TopTenComponent } from './top-ten/top-ten.component';
import { AddSellerComponent } from './add-seller/add-seller.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditSellerComponent } from './edit-seller/edit-seller.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ToastrModule } from 'toastr-ng2';
import { 404componentComponent } from './404component/404component.component'

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'seller/:id', component: DetailsComponent},
  { path: 'addseller', component: AddSellerComponent },
  { path: 'seller/:id/editseller', component: EditSellerComponent},
  { path: 'seller/:id/addproduct', component: AddProductComponent},
  { path: 'seller/:sid/editproduct/:pid', component: EditProductComponent},
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', redirectTo: '/404', component: 404Component}
  ]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsComponent,
    TopTenComponent,
    AddSellerComponent,
    AddProductComponent,
    EditSellerComponent,
    EditProductComponent,
    404componentComponent
  ],
  imports: [
    AlertModule.forRoot(),    //ng2-bootstrap
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    TabsModule.forRoot(),
    NgbModule.forRoot(),
    ToastrModule.forRoot()
  ],
  providers: [SellersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
