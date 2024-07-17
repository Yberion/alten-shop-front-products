import type { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./features/home/home.routes').then((c) => c.homeRoutes),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
