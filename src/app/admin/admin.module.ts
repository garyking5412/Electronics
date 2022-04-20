import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MainComponent } from './main/main.component';
import { PManagementComponent } from './main/p-management/p-management.component';
// import { ReportComponent } from './main/report/report.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LazyLoadScriptService } from '../service/lazy-load-script.service';
// import { CManagementComponent } from './main/c-management/c-management.component';
// import { PDetalComponent } from './main/p-detal/p-detal.component';
// import { CDetailComponent } from './main/c-detail/c-detail.component';
import { ProductService } from '../service/product.service';
import { AuthGuardService } from '../service/auth-guard.service';

const route: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  {
    path: 'main',
    component: MainComponent,
    children: [
      // { path: '', redirectTo: 'management', pathMatch: 'full' },
      { path: 'pmanagement', component: PManagementComponent },
    ],
    // canActivate: [AuthGuardService],
  },
];
@NgModule({
  declarations: [MainComponent, PManagementComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    RouterModule.forChild(route),
    HttpClientModule,
  ],
  providers: [
    LazyLoadScriptService,
    ProductService,
    DatePipe,
    AuthGuardService,
  ],
})
export class AdminModule {}
