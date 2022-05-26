import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  @Output() addToCart: EventEmitter<any> = new EventEmitter<any>();
  constructor(private proSer: ProductService) {}

  totalPages: number = 0;
  pages: any[] = [];
  pageData: any[] = [];
  state: any = {
    pageNumber: 0,
    pageSize: 0,
    pageLimit: 0,
    totalProducts: 0,
  };
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
  url: string = 'http://localhost:8089/';
  loadData(pageNumber: number) {
    this.proSer
      .getFromApi(this.url + 'user/getAllProducts/' + pageNumber, '')
      .subscribe((res) => {
        // this.totalPages = res.totalPages;
        // this.currentPage = res.number;
        // if (pageNumber == this.totalPages) {
        //   let start = pageNumber - 3;
        //   let end = pageNumber;
        //   this.pages = new Array(this.totalPages).slice(start, end);
        // }
        // if (pageNumber == 0) {
        //   let start = pageNumber;
        //   let end = pageNumber + 3;
        //   this.pages = new Array(this.totalPages).slice(start, end);
        // } else {
        //   let start = pageNumber - 1;
        //   let end = pageNumber + 2;
        //   this.pages = new Array(this.totalPages).slice(start, end);
        // }
        // console.log(this.pages);
        this.pageData = res.content;
        this.state = {
          pageNumber: res.number,
          pageSize: res.size,
          pageLimit: 3,
          totalProducts: res.totalElements,
        };
        this.totalPages = res.totalPages;
        this.pages.splice(0, this.pages.length);
        var maxLeft =
          this.state.pageNumber - Math.floor(this.state.pageLimit / 2);
        var maxRight =
          this.state.pageNumber + Math.floor(this.state.pageLimit / 2);
        if (maxLeft < 0) {
          maxLeft = 0;
          maxRight = this.state.pageLimit;
        }
        if (maxRight > this.totalPages) {
          maxLeft = this.totalPages - (this.state.pageLimit - 1);
          if (maxLeft < 0) {
            maxLeft = 0;
          }
          maxRight = this.totalPages;
        }
        for (let p = maxLeft; p <= maxRight; p++) {
          this.pages.push(p);
        }
        return this.pages;
      });
  }
  ngOnInit(): void {
    // this.initPager();
    this.loadData(0);
    console.log(this.pages);
    console.log(this.pageData);
  }
}
