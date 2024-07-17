import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PrimeNGModule } from './utils/primeng/primeng.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    PrimeNGModule,
  ],
  exports: [CommonModule, ReactiveFormsModule, FormsModule, PrimeNGModule],
})
export class SharedModule {}
