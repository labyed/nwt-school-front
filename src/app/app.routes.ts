import { RouterModule, Routes } from '@angular/router';

// APP COMPONENTS
import { HomeComponent } from './home/home.component';
import { PeopleComponent } from './people/people.component';

const ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'people', component: PeopleComponent }
];

export const APP_ROUTES = RouterModule.forRoot(ROUTES, { useHash: true });
