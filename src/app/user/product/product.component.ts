import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  constructor(private proSer: ProductService) {}

  totalPages: number = 0;
  pages: any[] = [];
  currentPage: number = 0;
  state: any = {
    pageNumber: 1,
    pageSize: 4,
    pageLimit: 5,
  };
  loadData(pageNumber: number) {
    this.proSer
      .getFromApi(
        'http://localhost:8089/api/emps/paginate/' + pageNumber + '',
        'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjUxNTc1NDAwLCJleHAiOjE2NTIxODAyMDB9.UYOGSWmJWyOqex-YrG-VSXoohdt98YzUoKZih6Y68bZYw2ENFjocZHQrV3rkiKwwrluxCHOWyuv1pwO6sKJ5WQ'
      )
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
        this.state.pageNumber = pageNumber;
        this.totalPages = res.totalPages;
        this.pages.splice(0, this.pages.length);
        var maxLeft =
          this.state.pageNumber - Math.floor(this.state.pageLimit / 2);
        var maxRight =
          this.state.pageNumber + Math.floor(this.state.pageLimit / 2);
        if (maxLeft < 1) {
          maxLeft = 1;
          maxRight = this.state.pageLimit;
        }
        if (maxRight > this.totalPages) {
          maxLeft = this.totalPages - (this.state.pageLimit - 1);
          if (maxLeft < 1) {
            maxLeft = 1;
          }
          maxRight = this.totalPages;
        }
        for (let p = maxLeft; p < maxRight; p++) {
          this.pages.push(p);
        }
        return this.pages;
      });
  }
  ngOnInit(): void {
    // this.initPager();
    this.loadData(9);
    console.log(this.pages);
  }
}
