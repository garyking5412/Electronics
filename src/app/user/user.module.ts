import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { Route, RouterModule, Routes } from '@angular/router';
import { LazyLoadScriptService } from '../service/lazy-load-script.service';
import { FormsModule } from '@angular/forms';

const route: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: 'user', component: UserComponent },
  { path: 'home', component: HomeComponent, children: [{ path: '' }] },
];

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, RouterModule.forChild(route), FormsModule],
  providers: [LazyLoadScriptService],
})
export class UserModule {}
