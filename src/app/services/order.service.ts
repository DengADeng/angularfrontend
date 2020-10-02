import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable, Subject} from "rxjs";
import {tap} from "rxjs/operators";
import {ItemStorage} from "../utils/itemCart";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private API_URL = `${environment.API_URL}`;
  public numInfo:any;
  public num :Subject<any> = new Subject();
  constructor(private http: HttpClient, private  router: Router) { }

  getOrders(): Observable<any>{
    return this.http.get(this.API_URL + 'api/orders')
      .pipe(tap(res => {
        if (res){
          return res;
        }
      }));
  }
  getOrder(Itemid): Observable<any>{
    const id = Itemid;
    return this.http.get(this.API_URL + 'api/orders/'+ id)
      .pipe(tap(res => {
        if (res){
          return res;
        }
      }));
  }

  addOrder(order): Observable<any>{

    const orderData = {
      'orderInfo' :order.orderInfo,
      'price': order.price,
      'numInfo': order.numInfo,
      'user_id': order.user_id,
      'user_name': order.user_name
    }
    return this.http.post(this.API_URL + 'api/orders', orderData)
      .pipe(tap(res => {
        if (res){
          return res;
        }
      }));
  };
  changeNum():void{
    this.numInfo = ItemStorage.getTotalCount();
  };

}
