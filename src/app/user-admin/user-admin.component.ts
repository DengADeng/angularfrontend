import {
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef, NgZone,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {ProductService} from "../services/product.service";
import{ Renderer2 } from '@angular/core';
import {ChangeDetectorRef } from '@angular/core';
import {OrderService} from "../services/order.service";
@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.css']
})
export class UserAdminComponent implements OnInit{
  @ViewChild('d1') d1:ElementRef;
  userINFO;
  productsInfo;
  tabList: [string, string, string] = [
    "userInfo", "productList", "orderList"
  ]
  ordersInfo;
  constructor(
              private orderService: OrderService,
              private userService: UserService,
              private productService: ProductService,
              private router: Router,
              private privaterenderer: Renderer2,
              private elementRef: ElementRef,
              public changeDetectorRef:ChangeDetectorRef,
  ) {
  }


  ngOnInit(): void {
    this.userService.getUser().subscribe(
      res => { this.userINFO = res;});
    this.productService.getProducts().subscribe(
      res=> {
        this.productsInfo = res;
        }
    )
    this.orderService.getOrders().subscribe(
      res=>{
        this.ordersInfo = res;
      }
    )
  }

  addProduct(value: any) {
    this.productService.addProduct(value).subscribe(res => {
        alert("New item adds successfully");
    });
    this.productService.getProducts().subscribe(
      res=> {
        this.productsInfo = res;
        this.ngOnInit();
      }
    )

  }
  tab(number: any) {
    switch (number) {
      case 0:
        document.getElementById('myTab').getElementsByTagName('li')[0].classList.add('active');
        document.getElementById('myTab').getElementsByTagName('li')[1].classList.remove('active');
        document.getElementById('myTab').getElementsByTagName('li')[2].classList.remove('active');
        document.getElementById('userInf').classList.remove('hidden');
        document.getElementById('userList').classList.add('hidden');
        document.getElementById('productList').classList.add('hidden');
        break;
      case 1:
        document.getElementById('myTab').getElementsByTagName('li')[1].classList.add('active');
        document.getElementById('myTab').getElementsByTagName('li')[0].classList.remove('active');
        document.getElementById('myTab').getElementsByTagName('li')[2].classList.remove('active');
        document.getElementById('userInf').classList.add('hidden');
        document.getElementById('userList').classList.remove('hidden');
        document.getElementById('productList').classList.add('hidden');
        break;
      case 2:
        document.getElementById('myTab').getElementsByTagName('li')[2].classList.add('active');
        document.getElementById('myTab').getElementsByTagName('li')[1].classList.remove('active');
        document.getElementById('myTab').getElementsByTagName('li')[0].classList.remove('active');
        document.getElementById('userInf').classList.add('hidden');
        document.getElementById('userList').classList.add('hidden');
        document.getElementById('productList').classList.remove('hidden');
        break;
    }
  }


  change(idx) :void{
    const temp = this.elementRef.nativeElement.querySelectorAll(".hidden-product")[idx];
    //alert(temp);
    this.privaterenderer.removeClass(temp,'hidden');
  
  }


  update(i): void {
    console.log(this.productsInfo[i]);
    this.productService.updateProduct(this.productsInfo[i]).subscribe(
      res => {
        alert("update successfully");
        this.ngOnInit();
        const temp = this.elementRef.nativeElement.querySelectorAll(".hidden-product")[i];
        this.privaterenderer.addClass(temp,'hidden');
      }
    );
  };

  delete(i): void{
    this.productService.deleteProduct(this.productsInfo[i]).subscribe(
      res=>{
        alert("delete successfully");
        this.ngOnInit();
      }
    );
    

  }


}
