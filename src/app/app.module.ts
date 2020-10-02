import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import {AppRoutingModule} from "./app-routing.module";
import {RouterModule} from "@angular/router";
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { SigninComponent } from './auth/signin/signin.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {LocalStorage} from "./utils/localstore";
import { UserAdminComponent } from './user-admin/user-admin.component';
import { ProductChangeComponent } from './user-admin/product-change/product-change.component';
import { ProductDetailComponent } from './body/product-detail/product-detail.component';
import {ItemStorage} from "./utils/itemCart";
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { OrderDetailComponent } from './order/order-detail/order-detail.component';




@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    LoginComponent,
    RegisterComponent,
    SigninComponent,
    UserAdminComponent,
    ProductChangeComponent,
    ProductDetailComponent,
    CartComponent,
    OrderComponent,
    OrderDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [LocalStorage,ItemStorage],
  bootstrap: [AppComponent],
  entryComponents: [ProductChangeComponent],
})
export class AppModule { }
