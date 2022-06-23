import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { GlobalModule } from '../global/global.module';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    GlobalModule,
    MatButtonModule
  ], exports: [
    MainComponent
  ]
})
export class MainModule { }
