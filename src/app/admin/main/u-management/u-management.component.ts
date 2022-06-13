import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-u-management',
  templateUrl: './u-management.component.html',
  styleUrls: ['./u-management.component.css'],
})
export class UManagementComponent implements OnInit {
  constructor(private proSer: ProductService) {}
  jwt: string = '';
  url: string = 'http://localhost:8089/';
  users: any[] = [];
  user: any = {};
  roleId: number = 0;
  roles: any[] = [];
  loadData() {
    this.user = {};
    this.roleId = 0;
    this.jwt = sessionStorage.getItem('token')
      ? JSON.parse(sessionStorage.getItem('token') || '')
      : '';
    this.proSer
      .getFromApi(this.url + 'admin/getAllUsers', 'Bearer ' + this.jwt)
      .subscribe((res) => {
        this.users = res;
        console.log(this.users);
      });
    this.proSer
      .getFromApi(this.url + 'admin/getAllRoles', 'Bearer ' + this.jwt)
      .subscribe((res) => {
        this.roles = res;
        console.log(this.roles);
      });
  }
  loadDetail(id: number) {
    this.proSer
      .getFromApi(this.url + 'admin/getAllUsers/' + id, 'Bearer ' + this.jwt)
      .subscribe((res) => {
        this.user = res;
        this.roleId = this.user.role.id;
      });
  }
  add(entity: any) {
    // this.user = entity;
    entity.role.id = this.roleId;
    this.proSer
      .post(this.url + 'admin/saveUser', entity, 'Bearer ' + this.jwt)
      .subscribe((res) => {
        console.log(res);
        this.loadData();
      });
  }
  update(entity: any) {
    entity.role.id = this.roleId;
    this.proSer
      .putToApi(
        this.url + 'admin/updateUser/' + entity.id,
        entity,
        'Bearer ' + this.jwt
      )
      .subscribe((res) => {
        console.log(res);
        this.loadData();
      });
  }
  remove(id: number) {
    if (
      confirm(
        'Remove this user will delete all the invoice records related to this user, this action cannot be rollback. Proceed?'
      )
    ) {
      this.proSer
        .deleteFromApi(
          this.url + 'admin/deleteUser/' + id,
          'Bearer ' + this.jwt
        )
        .subscribe((res) => {
          console.log(res);
          this.loadData();
        });
    }
  }
  ngOnInit(): void {
    this.loadData();
  }
}
