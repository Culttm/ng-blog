import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import {MatButtonModule} from "@angular/material/button";
import {RouterLinkWithHref} from "@angular/router";



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterLinkWithHref
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
