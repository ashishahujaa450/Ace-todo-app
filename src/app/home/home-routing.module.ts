import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateToDoComponent } from './create-to-do/create-to-do.component';

const routes: Routes = [
  {
    path: '',
    component: CreateToDoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
