import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private API_URL = `${environment.API_URL}`;
  constructor(private http: HttpClient, private  router: Router) { }

  getProducts(): Observable<any>{
    return this.http.get(this.API_URL + 'api/products')
      .pipe(tap(res => {
        if (res){
          return res;
        }
      }));
  }
  getProduct(Itemid): Observable<any>{
    const id = Itemid;
    return this.http.get(this.API_URL + 'api/products/'+ id)
      .pipe(tap(res => {
        if (res){
          return res;
        }
      }));
  }

  addProduct(product): Observable<any>{
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const isAdmin = userInfo['isAdmin'];
    const productData = {
        'isAdmin' : isAdmin,
        'name': product.name,
        'price': product.price,
        'image': product.image,
        'brand': product.brand,
        'category': product.category,
        'countInStock': product.countInStock,
        'description': product.description,
        'rating': product.rating,
        'numReviews': product.numReviews,
    }
    return this.http.post(this.API_URL + 'api/products', productData, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token
      }
    })
      .pipe(tap(res => {
        if (res){
          return res;
        }
      }));
  }

  updateProduct(product): Observable<any>{
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const isAdmin = userInfo['isAdmin'];
    const id = product._id;
    const productData = {
      'isAdmin' : isAdmin,
      'name': product.name,
      'price': product.price,
      'image': product.image,
      'brand': product.brand,
      'category': product.category,
      'countInStock': product.countInStock,
      'description': product.description,
      'rating': product.rating,
      'numReviews': product.numReviews,
    }
    return this.http.put(this.API_URL + 'api/products/'+ id, productData, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token
      }
    })
      .pipe(tap(res => {
        if (res){
          return res;
        }
      }));
  }

  deleteProduct(product): Observable<any>{
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const isAdmin = userInfo['isAdmin'];
    const id = product._id;
    return this.http.delete(this.API_URL + 'api/products/'+ id, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token
      }
    })
      .pipe(tap(res => {
        if (res){
          return res;
        }
      }));
  }

  searchProduct(product): Observable<any>{
    console.log(product);
    const productName= product['search'];
    return this.http.get(this.API_URL + 'api/products/product?name='+ productName)
    .pipe(tap(res =>{
      if(res){
        return res;
      }})
    )
  }
}
