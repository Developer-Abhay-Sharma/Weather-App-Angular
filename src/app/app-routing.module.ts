import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeadComponent } from './Weather/head/head.component';

const routes: Routes = [
  {path:'mainApplication', component:HeadComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
