import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post.component';
import {RouterModule} from "@angular/router";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";



@NgModule({
  declarations: [
    PostComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PostComponent
      }
    ]),
    MatProgressSpinnerModule
  ]
})
export class PostModule { }
