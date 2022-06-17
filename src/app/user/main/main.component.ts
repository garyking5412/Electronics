import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  @Output() addToCart: EventEmitter<any> = new EventEmitter<any>();
  constructor(private proSer: ProductService) {}

  url: string = 'http://localhost:8089/';
  headerContents: any[] = [];
  featContent: any[] = [];
  onSaleContent: any[] = [];
  topRatedContent: any[] = [];
  trendingContent: any[] = [];
  topSellingContent: any[] = [];
  loadData() {
    this.proSer
      .getFromApi(this.url + 'user/getTrending/0', '')
      .subscribe((res) => {
        this.topRatedContent = res.content;
        console.log(res);
      });
    this.proSer
      .getFromApi(this.url + 'user/getTrending/1', '')
      .subscribe((res) => {
        this.trendingContent = res.content;
      });
    this.proSer
      .getFromApi(this.url + 'user/getTrending/2', '')
      .subscribe((res) => {
        this.headerContents = res.content;
      });
    this.proSer
      .getFromApi(this.url + 'user/getTopSelling', '')
      .subscribe((res) => {
        this.topSellingContent = res;
        console.log(this.topSellingContent);
      });
    this.proSer
      .getFromApi(this.url + 'user/getTrending/2', '')
      .subscribe((res) => {
        this.onSaleContent = res.content;
      });
    this.proSer
      .getFromApi(this.url + 'user/getTrending/2', '')
      .subscribe((res) => {
        this.featContent = res.content;
      });
  }
  clickBuy(Product: any) {
    const item = {
      product: Product,
      quantity: 1,
    };
    let flag = true;
    let carts = sessionStorage.getItem('carts')
      ? JSON.parse(sessionStorage.getItem('carts') || '{}')
      : [];
    carts = carts.map((x: { product: { id: number }; quantity: number }) => {
      if (x.product.id == Product.id) {
        x.quantity += 1;
        flag = false;
      }
      return x;
    });
    if (flag) {
      carts.push(item);
    }
    sessionStorage.setItem('carts', JSON.stringify(carts));
    this.addToCart.emit();
  }
  ngOnInit(): void {
    this.loadData();
  }
}
