import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadScriptService } from 'src/app/service/lazy-load-script.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private lz: LazyLoadScriptService, private us: ProductService) {}
  user: any = {
    username: 'username',
    password: 'password',
  };
  displayname: string = 'Sign In/Register';
  checkLogin(): boolean {
    if (this.displayname == 'Sign In/Register') {
      return false;
    } else return true;
  }
  jwt: string = '';
  url: string = 'http://localhost:8089/api/validateUser';
  // roles: any = [];
  login() {
    this.us
      .postToApi('http://localhost:8089/api/token', this.user)
      .subscribe((response) => {
        this.jwt = 'Bearer ' + response;
        this.us.post(this.url, this.user, this.jwt).subscribe((res) => {
          console.log(res);
          // this.roles = Object.values(res);
          if (res == 1) {
            window.location.href = 'admin';
            sessionStorage.setItem('username', this.user.username);
            console.log(this.user);
            return;
          } else {
            window.location.href = 'user';
            sessionStorage.setItem('username', this.user.username);
          }
          // let roles: any = res;
          // roles.forEach((element: number) => {
          //   if (element == 1) {
          //     window.location.href = 'admin';
          //     sessionStorage.setItem('username', this.user.username);
          //     console.log(this.user);
          //     return;
          //   }
          // });
          // window.location.href = 'user';
          // sessionStorage.setItem('username', this.user.username);
        });
      });
  }
  navigate() {
    if (this.displayname == 'admin') {
      window.location.href = 'admin';
    }
  }
  ngOnInit(): void {
    let check = sessionStorage.getItem('username');
    console.log(check);
    if (check != null && check != '') {
      this.displayname = check;
      console.log(this.displayname);
    }
    // <!-- Plugins JS File -->
    this.lz.loadScript('assets/users/js/jquery.min.js').subscribe((_) => {
      console.log('jquery loaded!');
    });
    this.lz
      .loadScript('assets/users/js/bootstrap.bundle.min.js')
      .subscribe((_) => {
        console.log('bootstrap loaded!');
      });
    this.lz
      .loadScript('assets/users/js/jquery.hoverIntent.min.js')
      .subscribe((_) => {
        console.log('jquery.hoverIntent loaded!');
      });
    this.lz
      .loadScript('assets/users/js/jquery.waypoints.min.js')
      .subscribe((_) => {
        console.log('jquery.waypoints.min.js loaded!');
      });
    this.lz.loadScript('assets/users/js/superfish.min.js').subscribe((_) => {
      console.log('superfish.min.js loaded!');
    });
    this.lz.loadScript('assets/users/js/owl.carousel.min.js').subscribe((_) => {
      console.log('owl.carousel.min.js loaded!');
    });
    this.lz
      .loadScript('assets/users/js/bootstrap-input-spinner.js')
      .subscribe((_) => {
        console.log('bootstrap-input-spinner.js loaded!');
      });
    this.lz
      .loadScript('assets/users/js/jquery.plugin.min.js')
      .subscribe((_) => {
        console.log('jquery.plugin.min.js loaded!');
      });
    this.lz
      .loadScript('assets/users/js/jquery.magnific-popup.min.js')
      .subscribe((_) => {
        console.log('jquery.magnific-popup.min.js loaded!');
      });
    this.lz
      .loadScript('assets/users/js/jquery.countdown.min.js')
      .subscribe((_) => {
        console.log('jquery.countdown.min.js loaded!');
      });
    // <!-- Main JS File -->
    this.lz.loadScript('assets/users/js/main.js').subscribe((_) => {
      console.log('main.js loaded!');
    });
    this.lz.loadScript('assets/users/js/demos/demo-3.js').subscribe((_) => {
      console.log('demo-3.js loaded!');
    });
    // this.getUser();
  }
}
