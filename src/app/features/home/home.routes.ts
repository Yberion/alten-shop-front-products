import type { Routes } from '@angular/router';
import { HomePageComponent } from './page/home-page.component';

export const homeRoutes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
];
