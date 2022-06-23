import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalModule } from '../global/global.module';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  {path: '', component: AdminComponent}
];


@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    GlobalModule,
    RouterModule.forChild(routes),
    MatButtonModule
  ],
  exports: [RouterModule]
})
export class AdminModule { }
