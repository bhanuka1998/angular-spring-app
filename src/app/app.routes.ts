import { Routes } from '@angular/router';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductListComponent } from './product-list/product-list.component';

export const appRoutes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'edit/:id', component: ProductFormComponent },
  { path: 'add', component: ProductFormComponent },
];
