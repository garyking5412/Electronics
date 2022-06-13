import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-r-management',
  templateUrl: './r-management.component.html',
  styleUrls: ['./r-management.component.css'],
})
export class RManagementComponent implements OnInit {
  constructor(private proSer: ProductService) {}

  role: any = {};
  roles: any[] = [];
  url: string = 'http://localhost:8089/';
  jwt: string = sessionStorage.getItem('token')
    ? JSON.parse(sessionStorage.getItem('token') || '')
    : '';
  loadData() {
    this.role = {};
    this.proSer
      .getFromApi(this.url + 'admin/getAllRoles', 'Bearer ' + this.jwt)
      .subscribe((res) => {
        this.roles = res;
        console.log(this.roles);
      });
  }
  loadDetail(id: number) {
    this.proSer
      .getFromApi(this.url + 'admin/getAllRoles/' + id, 'Bearer ' + this.jwt)
      .subscribe((res) => {
        this.role = res;
        console.log(this.role);
      });
  }
  add(entity: any) {
    let role: any = {
      name: entity.name,
    };
    this.proSer
      .post(this.url + 'admin/saveRole', role, 'Bearer ' + this.jwt)
      .subscribe((res) => {
        if (res != null) console.log(res);
        else console.log('failed!');
        this.loadData();
      });
  }
  remove(id: number) {
    if (confirm('this will reset all related User Role to USER. Proceed ?')) {
      this.proSer
        .deleteFromApi(
          this.url + 'admin/deleteRole/' + id,
          'Bearer ' + this.jwt
        )
        .subscribe((response) => {
          alert(response);
          // console.log(response);
          this.role = {
            id: 0,
            name: '',
          };
          // this.load(0);
          this.loadData();
        });
    }
  }
  update(entity: any) {
    this.proSer
      .putToApi(
        this.url + 'admin/updateRole/' + entity.id,
        entity,
        'Bearer ' + this.jwt
      )
      .subscribe((res) => {
        console.log(res);
        // this.load(0);
        this.loadData();
      });
  }
  ngOnInit(): void {
    this.loadData();
  }
}
