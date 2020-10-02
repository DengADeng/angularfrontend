import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../services/product.service";
import {OrderService} from "../services/order.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  id: number;
  sub: any;
  item: any
  qty: any;
  itemInfo = [];
  orderInfo: any;
  numInfo: any;
  total: any;
  user: any;
  username: string;
  constructor(
    private el:ElementRef,
    private renderer2: Renderer2,
    private route: ActivatedRoute,
    public orderService: OrderService,
    public productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
      // In a real app: dispatch action to load the details here.
      console.log(this.id);
      this.orderService.getOrder(this.id).subscribe(res=>{
        //console.log("order"+ res.orderInfo,"info"+res.numInfo,"user");
        this.orderInfo = res.orderInfo;
        this.numInfo = res.numInfo;
        this.total = res.order_id.price;
        this.user = res.order_id.user_id;
        this.username = res.order_id.user_name;
        console.log(res.numInfo, res.orderInfo)
      });
    });


  }
  getData(){
    //console.log(this.orderInfo,this.numInfo,this.user);
    this.renderer2.removeClass(this.el.nativeElement.querySelector('#order-bd'),'hidden');
    for(let i in this.orderInfo){
      this.productService.getProduct(this.orderInfo[i]).subscribe(res=>{
          //console.log(this.numInfo,this.numInfo[i]);
          let temp = res;
          console.log(temp);
          temp['numInfo'] = this.numInfo[i];
          this.itemInfo.push(temp);
        }
      )
    }
    console.log(this.itemInfo);
  }
}
