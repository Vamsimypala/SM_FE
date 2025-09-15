import { Routes } from '@angular/router';
import { Stockmanagement } from './stockmanagement/stockmanagement';

export const routes: Routes = [
  {
    path: 'stockmanagement',
    component: Stockmanagement
  },
  {
    path: '',
    redirectTo: '/stockmanagement',
    pathMatch: 'full'
  }
];
