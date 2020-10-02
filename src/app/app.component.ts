import {Component, ElementRef, Renderer2} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {ProductService} from "./services/product.service";
import { ItemStorage } from './utils/itemCart';
import { OrderService } from './services/order.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userInfo;
  title = 'finalproject';
  itemNum :any;
  constructor(
    public authService: AuthService,private el:ElementRef,private renderer2: Renderer2,
    public orderService: OrderService
  ){
    this.orderService.num.subscribe(res=>{this.itemNum = this.orderService.num});
  }
  ngOnInit(): void {
    this.authService.checklogin();
    this.itemNum = ItemStorage.getTotalCount();
    this.checkLogin();
  }

  checkLogin(): void{
    if(this.authService.loggedIn){
      document.getElementById('userInfo').classList.remove('hidden');
      document.getElementById('login').classList.add('hidden');
      if(JSON.parse(localStorage.getItem('userInfo')).name){
        this.userInfo = JSON.parse(localStorage.getItem('userInfo')).name;
        //location.reload();
      }
      //location.reload();
    }else{
        document.getElementById('userInfo').classList.add('hidden');
        document.getElementById('login').classList.remove('hidden');
    }

  }

  logout() {
    this.authService.logout();
    console.log(this.authService.loggedIn);
    this.checkLogin()
  }
}
