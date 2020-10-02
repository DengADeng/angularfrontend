import { Component, OnInit } from '@angular/core';
import {ProductService} from "../services/product.service";
import {LocalStorage} from "../utils/localstore";
import {ItemStorage} from "../utils/itemCart";
import {OrderService} from "../services/order.service";
import {Input,Output,EventEmitter} from '@angular/core';
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  itemList;
  cartInfo;
  constructor(public orderService: OrderService,public productService: ProductService,) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      res=> { this.itemList = res;}
    );
    this.checkCart();
  }

  checkCart():void{
    if(localStorage.getItem('cart')){
      console.log('ok');
      //localStorage.removeItem('cart');
    }else{
      const arr = [];
      localStorage.setItem('cart', JSON.stringify(arr))
    }
  }
  addToCart(i): void{
    const product = {
      "goodsid": i._id,
      "count": 1
    }
    ItemStorage.setItem(product);
    console.log(ItemStorage.getGoodsObj());
    this.orderService.changeNum();
  }


}
