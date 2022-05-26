import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  constructor(private proSer: ProductService, private route: ActivatedRoute) {}

  product: any = {};
  // starRate: any[] = [];
  url: string = 'http://localhost:8089/';
  ngOnInit(): void {
    this.route.paramMap.subscribe((response) => {
      let id = response.get('id');
      console.log(id);
      this.proSer
        .getFromApi(this.url + 'user/getProduct/' + id, '')
        .subscribe((res) => {
          this.product = res;
          // this.starRate = new Array(this.product.rate);
          console.log(this.product);
          // console.log(this.displayItem);
          // console.log(this.starRate);
        });
    });
  }
}
