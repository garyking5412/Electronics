import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { Route, RouterModule, Routes } from '@angular/router';
import { LazyLoadScriptService } from '../service/lazy-load-script.service';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../service/product.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './product/product.component';
import { DetailComponent } from './detail/detail.component';
import { MainComponent } from './main/main.component';

const route: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: 'user', component: UserComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'main', component: MainComponent },
      { path: 'product', component: ProductComponent },
      { path: 'detail', component: DetailComponent },
      { path: '', redirectTo: 'main', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  declarations: [
    HomeComponent,
    ProductComponent,
    DetailComponent,
    MainComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    FormsModule,
    HttpClientModule,
  ],
  providers: [LazyLoadScriptService, ProductService],
})
export class UserModule {}
