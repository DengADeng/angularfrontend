import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {ItemStorage} from "../../utils/itemCart";
import {OrderService} from "../../services/order.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  id: number;
  private sub: any;
  item: any
  qty: any;
  constructor(
    public orderService: OrderService,
    private route: ActivatedRoute,
    public productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
    });
    this.productService.getProduct(this.id).subscribe(
      res=>{
        this.item = res;
      }
    )
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  addToCart(i): void{
    const qty = +this.qty
    const product = {
      "goodsid": i._id,
      "count": qty
    }
    ItemStorage.setItem(product);
    console.log(ItemStorage.getGoodsObj());
    this.orderService.changeNum();
  }

  changeQty(event: any) {
    this.qty = event.target.value;
  }
  goBack(){
    window.history.back();
  }
}
