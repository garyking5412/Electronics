import { Component, OnInit } from '@angular/core';
import { LazyLoadScriptService } from 'src/app/service/lazy-load-script.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  constructor(private lzLoad: LazyLoadScriptService) {}

  ngOnInit(): void {
    this.lzLoad
      .loadScript('assets/plugins/jquery/jquery.min.js')
      .subscribe((_) => {
        console.log('Jquery is loaded!');
      });
    this.lzLoad
      .loadScript('assets/plugins/bootstrap/js/bootstrap.bundle.min.js')
      .subscribe((_) => {
        console.log('Bootstrap is loaded!');
      });
    this.lzLoad.loadScript('assets/dist/js/adminlte.min.js').subscribe((_) => {
      console.log('AdminLTE is loaded!');
    });
    // this.lzLoad.loadScript('assets/dist/js/demo.js').subscribe((_) => {
    //   console.log('DEMO is loaded!');
    // });
  }
}
