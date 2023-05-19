import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DatepickerComponent } from './datepicker/datepicker.component';


@NgModule({
  declarations: [
    InputComponent,
    DatepickerComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
  exports: [
    InputComponent,
    DatepickerComponent,
  ]
})
export class BaseComponentsModule { }
