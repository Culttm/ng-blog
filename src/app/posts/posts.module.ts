import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts.component';
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatCardModule} from "@angular/material/card";



@NgModule({
  declarations: [
    PostsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PostsComponent
      }
    ]),
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule
  ]
})
export class PostsModule { }
