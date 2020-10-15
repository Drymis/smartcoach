import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [

  ],

  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
  ],
  providers: [
  ]
})
export class SharedModule { }
