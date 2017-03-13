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

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'seller/:id', component: DetailsComponent},
  { path: 'addseller', component: AddSellerComponent },
  { path: 'seller/:id/addproduct', component: AddProductComponent},
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
  ]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsComponent,
    TopTenComponent,
    AddSellerComponent,
    AddProductComponent
  ],
  imports: [
    AlertModule.forRoot(),    //ng2-bootstrap
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    TabsModule.forRoot(),
    NgbModule.forRoot()
  ],
  providers: [SellersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
