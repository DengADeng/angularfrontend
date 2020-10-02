import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-change',
  templateUrl: './product-change.component.html',
  styleUrls: ['./product-change.component.css']
})
export class ProductChangeComponent implements OnInit {
  
  productsInfo:any;
  constructor() { }

  ngOnInit(): void {
  }
  update():void{

  }
}
