import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { ProductProperty, PropertFieldType } from '../../interfaces/product-detail';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-detail-form',
  templateUrl: './detail-form.component.html',
  styleUrls: ['./detail-form.component.scss']
})
export class DetailFormComponent {
  @Input() title: string | undefined;
  @Output() onToggleAccordion = new EventEmitter();

  propertyType: PropertFieldType | undefined

  prop: ProductProperty[] | undefined;

  @Input() set properties(properties: ProductProperty[] | undefined) {
    this.prop = properties;

    //this.detailFormGroup.reset();

    if (this.prop != null) {
      for (var property of this.prop) {
        for (var form of property.childs) {
          this.detailFormGroup.addControl(
            form.name,
            new FormControl(
              form.value, [
              Validators.required,
              Validators.minLength(form.minlength),
              Validators.maxLength(form.maxlength),
            ]));
          //console.log(property.name)
          console.log(this.detailFormGroup)
        }
      }
    }

  }

  get properties(): ProductProperty[] | undefined {
    return this.prop;
  }

  detailFormGroup = new FormGroup({})

  collapse = true;

  constructor() { }

  toggleAccordion() {
    this.onToggleAccordion.emit();
  }

  onSubmit() {
    console.log(this.detailFormGroup)
  }

  ngOnChanges(changes: SimpleChanges) {

  }

}
