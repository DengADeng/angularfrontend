import {Component, DoCheck, ElementRef, NgZone, OnChanges, OnInit, Renderer2} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {ProductService} from "./services/product.service";
import { ItemStorage } from './utils/itemCart';
import { OrderService } from './services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges {
  userInfo: Observable<any>;
  title = 'finalproject';
  itemNum :any;
  width: any;
  height: any;
  constructor(
    public authService: AuthService,
    public orderService: OrderService,
    private activeRoute: ActivatedRoute,
    private el: ElementRef, 
    private renderer: Renderer2
  ){
    this.orderService.num.subscribe(res=>{this.itemNum = this.orderService.num});
  }
  ngOnInit(): void {
    
    this.authService.checklogin();
    this.itemNum = ItemStorage.getTotalCount();
    this.checkLogin();
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

  displaySubmenu() {
    this.renderer.removeClass(this.el.nativeElement.querySelector('.submenu-list'), 'hidden');
  }
  displayNone() {
    this.renderer.addClass(this.el.nativeElement.querySelector('.submenu-list'), 'hidden');
  }
}
