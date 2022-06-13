import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  constructor(private proSer: ProductService, private route: ActivatedRoute) {}
  user: any = {};
  invoice: any[] = [];
  roleId: number = 0;
  roles: any[] = [];
  url: string = 'http://localhost:8089/';
  jwt: string = sessionStorage.getItem('token')
    ? JSON.parse(sessionStorage.getItem('token') || '')
    : '';
  loadData() {
    this.route.paramMap.subscribe((res) => {
      let id = res.get('id');
      this.proSer
        .getFromApi(this.url + 'admin/getAllUsers/' + id, 'Bearer ' + this.jwt)
        .subscribe((res) => {
          this.user = res;
          this.roleId = this.user.role.id;
          this.proSer
            .post(
              this.url + 'admin/getInvoiceByCustomer',
              this.user,
              'Bearer ' + this.jwt
            )
            .subscribe((res) => {
              console.log(this.user);
              this.invoice = JSON.parse(JSON.stringify(res));
              console.log(this.invoice);
            });
        });
    });
    this.proSer
      .getFromApi(this.url + 'admin/getAllRoles', 'Bearer ' + this.jwt)
      .subscribe((res) => {
        this.roles = res;
        console.log(this.roles);
      });
  }
  update() {
    this.user.role.id = this.roleId;
    this.proSer
      .putToApi(
        this.url + 'admin/updateUser/' + this.user.id,
        this.user,
        'Bearer ' + this.jwt
      )
      .subscribe((res) => {
        alert('update succeed!');
        this.loadData();
      });
  }
  ngOnInit(): void {
    this.loadData();
  }
}
