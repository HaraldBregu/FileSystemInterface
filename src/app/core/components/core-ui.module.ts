import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalComponent } from './modal/modal.component';
import { PageLoaderComponent } from './page-loader/page-loader.component';
import { InputDateComponent } from './input-date/input-date.component';

@NgModule({
  declarations: [
    InputComponent,
    ModalComponent,
    PageLoaderComponent,
    InputDateComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
  exports: [
    InputComponent,
    ModalComponent,
    PageLoaderComponent,
    InputDateComponent,
  ]
})
export class CoreUIModule { }
