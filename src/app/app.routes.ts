import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductListComponent } from './product-list/product-list.component';

export const appRoutes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'view-products', component: ProductListComponent },
  { path: 'edit/:id', component: ProductFormComponent },
  { path: 'add', component: ProductFormComponent },
];
