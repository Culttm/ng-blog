import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found.component';
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: NotFoundComponent
      }
    ]),
    MatButtonModule
  ]
})
export class NotFoundModule { }
