import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { CreateToDoComponent } from './create-to-do/create-to-do.component';
import { ToDoListComponent } from './create-to-do/to-do-list/to-do-list.component';
import { DoneListComponent } from './create-to-do/done-list/done-list.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [  
    CreateToDoComponent,
    ToDoListComponent,
    DoneListComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
