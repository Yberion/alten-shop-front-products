import type { Routes } from '@angular/router';

export const adminProductsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full',
      },
      {
        path: 'products',
        loadComponent: () => import('./products/page/admin-products-page.component').then((c) => c.AdminProductsPageComponent),
      },
    ],
  },
];
