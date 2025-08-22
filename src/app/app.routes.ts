import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard';
import { ProductListComponent } from './components/product-list/product-list';
import { ProductDetailComponent } from './components/product-detail/product-detail';
import { ProductFormComponent } from './components/product-form/product-form';
import { ProductEditComponent } from './components/product-edit/product-edit';
import { ProductAddComponent } from './components/product-add/product-add';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/new', component: ProductAddComponent },
  { path: 'products/edit/:id', component: ProductEditComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: '**', redirectTo: '/dashboard' }
];