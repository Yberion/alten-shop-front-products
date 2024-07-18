import type { Routes } from '@angular/router';
import { ProductsPageComponent } from './page/products-page.component';

export const productsRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ProductsPageComponent,
  },
];
