import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./products.component'),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./details/details.component'),
  }
];

export default routes;