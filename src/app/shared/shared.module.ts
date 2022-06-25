import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

const modules: any[] = [
  CommonModule,
  MaterialModule,
  FlexLayoutModule,
  FormsModule,
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class SharedModule {}
