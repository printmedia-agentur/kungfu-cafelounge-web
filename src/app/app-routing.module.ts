import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './templates/main/main.component';
import { HomeComponent } from './templates/home/home.component';

const routes: Routes = [{
  path: 'app',
  component: MainComponent,
  children: [
    {
      path: 'home',
      component: HomeComponent
    }]
  },
{
    path: '',
    component: HomeComponent
},
{
    path: '**',
    component: HomeComponent
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
