import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-p-management',
  templateUrl: './p-management.component.html',
  styleUrls: ['./p-management.component.css'],
})
export class PManagementComponent implements OnInit {
  constructor(private proSer: ProductService, private datepipe: DatePipe) {}
  employees: any[] = [];
  emp: any = {
    id: 0,
    gender: 0,
    sal: 0,
    name: '',
    ad: '',
    pos: '',
    birth: '',
  };
  url: string = 'http://localhost:8089/api/emps';
  // products: any[] = [];
  // url: string = 'http://localhost:8089/api/products';
  // load() {
  //   this.cateSer.getFromApi(this.url).subscribe((res) => {
  //     this.products = res;
  //     console.log(this.products);
  //   });
  // }
  // cate = {
  //   name: '',
  //   status: 0,
  //   parentId: 0,
  // };
  // add(cate: any) {
  //   this.cateSer.postToApi(this.url, cate).subscribe((res) => {
  //     if (res != null) {
  //       console.log('success!');
  //     } else {
  //       console.log('false!');
  //     }
  //     this.load();
  //   });
  // }
  load() {
    this.proSer.getFromApi(this.url + '/getAll').subscribe((res) => {
      this.employees = res;
    });
  }
  convertDate(json: any): String {
    // const j = JSON.stringify(json);
    const d = new Date(JSON.parse(json));
    return d.toISOString();
  }
  loadDetail(id: any) {
    this.proSer.getFromApi(this.url + '/' + id).subscribe((res) => {
      this.emp = res;
      // // this.emp.birth = JSON.stringify(this.emp.birth);
      // this.emp.birth = moment('2014-27-11', 'yyyy--MM--dd');
      this.emp.birth = this.datepipe.transform(
        new Date(this.emp.birth),
        'yyyy-MM-dd'
      );
      console.log(this.emp.birth);
      if (this.emp.gender == 1) {
        // document.getElementById("male")?.style.checked = true;
      }
      console.log(this.emp.gender);
    });
  }
  add(entity: any) {
    let emp = {
      name: entity.name,
      gender: entity.gender,
      sal: entity.sal,
      ad: entity.ad,
      pos: entity.pos,
      birth: entity.birth,
    };
    this.proSer.postToApi(this.url, emp).subscribe((res) => {
      console.log(res);
      this.load();
    });
  }
  remove(id: any) {
    this.proSer.deleteFromApi(this.url + '/' + id).subscribe((res) => {
      console.log(JSON.parse(res));
      this.emp = {
        id: 0,
        gender: 0,
        sal: 0,
        name: '',
        ad: '',
        pos: '',
        birth: '',
      };
      this.load();
    });
  }
  update(entity: any) {
    this.proSer
      .putToApi(this.url + '/' + entity.id, entity)
      .subscribe((res) => {
        console.log(res);
        this.load();
      });
  }
  ngOnInit(): void {
    this.load();
  }
}
