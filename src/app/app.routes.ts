import type { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./features/home/home.routes').then((c) => c.homeRoutes),
  },
  {
    path: 'products',
    pathMatch: 'full',
    loadChildren: () => import('./features/products/products.routes').then((c) => c.productsRoutes),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
