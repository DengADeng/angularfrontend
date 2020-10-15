import {Component, DoCheck, ElementRef, NgZone, OnChanges, OnInit, Renderer2} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {ProductService} from "./services/product.service";
import { ItemStorage } from './utils/itemCart';
import { OrderService } from './services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges {
  userInfo: Observable<any>;
  title = 'finalproject';
  itemNum :any;
  searchForm: FormGroup;
  searchList=[];
  constructor(
    public authService: AuthService,
    private orderService: OrderService,
    private fb: FormBuilder,
    private productService: ProductService,
    private renderer2: Renderer2,
    private elementRef: ElementRef,
  ){
    this.orderService.num.subscribe(res=>{this.itemNum = this.orderService.num});
  }
  ngOnInit(): void {
    
    this.authService.checklogin();
    this.itemNum = ItemStorage.getTotalCount();
    this.checkLogin();
    this.searchForm = this.fb.group({
      search:[]
    });
   // console.log(this.authService.userInfo['name'])
    //this.userInfo = this.authService.userInfo;
  }
  ngOnChanges(): void {
    //this.ngOnInit();
   // window.location.reload();
  }
  checkLogin(): void{
    if(this.authService.loggedIn){
      if(JSON.parse(localStorage.getItem('userInfo')).name){
        this.userInfo = JSON.parse(localStorage.getItem('userInfo')).name;
      }    
    }
    
  }
  
  logout() {
    this.authService.logout();
    this.ngOnInit();
    //console.log(this.authService.loggedIn);
  }

  search(data:any){
    this.searchList = [];
    this.productService.searchProduct(data).subscribe((res)=>{
      res.forEach((e,i) => {
        this.searchList.push({name: e.name, href:'http://fuzhou123.s3-website.us-east-2.amazonaws.com/productDetail/'+ e._id});
      });
      //console.log(this.searchList[0].name);
      const ul = this.elementRef.nativeElement.querySelectorAll('.nav-ul')[0];
      this.renderer2.removeClass(ul,'hidden');
    })
  }
  hiddenArea(){
    const ul = this.elementRef.nativeElement.querySelectorAll('.nav-ul')[0];
    this.renderer2.addClass(ul,'hidden');
  }
  
}
