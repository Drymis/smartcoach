import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { FrontofficeComponent } from './frontoffice.component';

const routes: Routes = [
  {
    path: '',
    component: FrontofficeComponent,
    children: [
      {
        path: '',
        component: LandingComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontofficeRoutingModule { }
