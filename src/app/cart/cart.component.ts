import {Component, OnInit, Renderer2} from '@angular/core';
import {ItemStorage} from "../utils/itemCart";
import {ProductService} from "../services/product.service";
import { ElementRef} from '@angular/core';
import {OrderService} from "../services/order.service";
import {ActivatedRoute, Router} from "@angular/router";
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  itemList: any;
  itemInfo = [];
  total: number = 0;
  constructor(
              private route:  Router,public orderService: OrderService,public productService: ProductService,private el:ElementRef,private renderer2: Renderer2) { }

  ngOnInit(): void {
    this.addItemList();
    this.initItemList();
  }
  addItemList():void{
    this.itemList = ItemStorage.getGoodsObj();
  }
  initItemList():void{
    for(let i in this.itemList){
      this.productService.getProduct(i).subscribe(
        res=> {
          let obj =  this.itemList[i];
          res['qty'] = obj;
          this.itemInfo.push(res);
          this.total += (+res.price) * obj;
        }
      );
    }

  }

  checkout() {
    const data = this.itemInfo;
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))._id;
    const username = JSON.parse(localStorage.getItem('userInfo')).name;
    let orderInfo = [];
    let numInfo = [];

    for(let i in this.itemInfo){
      orderInfo.push(this.itemInfo[i]._id);
      numInfo.push(this.itemInfo[i].qty);
    }
    let order = {
      "orderInfo": orderInfo,
      "numInfo": numInfo,
      "user_id": userInfo,
      "price": this.total,
      "user_name": username
    }
    this.orderService.addOrder(order).subscribe(res=> {
      alert("addOrder successfully" + JSON.stringify(res.data._id));
      localStorage.setItem('cart', '[]');
      this.orderService.changeNum();
      document.getElementById('cart-main').innerHTML="<a style='color: #000' href='/order/" + res.data._id + "'>order address</a>";
    })
    
  }

  totalPrice():void{
    this.total = 0;
    for(let i=0; i<this.itemInfo.length;i++){
      this.total +=(+this.itemInfo[i].qty) * (+this.itemInfo[i].price);
    }
  };
  chageValue(event,i,item) {
    this.itemInfo[i].qty = event.target.value;
    this.el.nativeElement.querySelector('#value').text = (+this.itemInfo[i].qty) * (+this.itemInfo[i].price);
    this.totalPrice();
    let istore = ItemStorage.getGoodsObj();
    let tem = [];
    for(let i in istore){
      tem.push({"goodsid": i,"count": +istore[i]});
    }
    for(let i in tem){
      if(tem[i].goodsid == item._id){
        tem[i].count = +event.target.value;
      }
    }
    localStorage.setItem('cart',JSON.stringify(tem));
    this.orderService.changeNum();
  }
}
