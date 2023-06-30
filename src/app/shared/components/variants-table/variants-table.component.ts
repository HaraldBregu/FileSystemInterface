import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Variant, VariantPropertyField } from '../../interfaces/variant';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-variants-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  templateUrl: './variants-table.component.html',
  styleUrls: ['./variants-table.component.scss']
})
export class VariantsTableComponent implements OnInit {
  @Input() variants: Variant[] = []
  @Output() isValidForm = new EventEmitter<boolean>();
  @Output() onChange = new EventEmitter<Variant[]>();

  variantFormGroup: FormGroup = new FormGroup({})
  headerVariant: Variant | undefined

  constructor() { }

  ngOnInit() {

    this.variants.forEach((variant, index) => {

      var tempFormGroup = new FormGroup({})

      variant.properties.forEach(property => {
        function validatorFromPropertyField(propertyField: VariantPropertyField) {
          const validators: ValidatorFn[] = []

          if (propertyField.required)
            validators.push(Validators.required)

          return validators
        }

        tempFormGroup.addControl(property.name, new FormControl(property.value, validatorFromPropertyField(property)))

      })

      this.variantFormGroup.addControl("variant" + index, tempFormGroup)

      setTimeout(() => {
        this.isValidForm.emit(this.variantFormGroup.valid)
      }, 0)

      
    })

    this.headerVariant = this.variants[0]

    this.variantFormGroup.valueChanges
      .pipe(distinctUntilChanged((prev, curr) => prev === curr))
      .subscribe(_ => {

        const newVariantProperties = this.variants.map((variant, index) => {
          const nestedFormGroup = this.variantFormGroup?.get("variant" + index) as FormGroup
          return {
            ...variant,
            properties: variant.properties.map(property => {
              return {
                ...property,
                value: nestedFormGroup.get(property.name)?.value
              }
            })
          }
        })

        setTimeout(() => {
          this.isValidForm.emit(this.variantFormGroup.valid)
        }, 0)

        this.onChange.emit(newVariantProperties)
        
      })

  }

  valid(field: VariantPropertyField, index: number) {
    const formGroupBase = this.variantFormGroup.controls["variant" + index] as FormGroup
    return formGroupBase.controls[field.name].valid
  }

  touched(field: VariantPropertyField, index: number) {
    const formGroupBase = this.variantFormGroup.controls["variant" + index] as FormGroup
    return formGroupBase.controls[field.name].touched
  }

  fieldInValid(field: VariantPropertyField, index: number) {
    const isValid = this.valid(field, index)
    const isTouched = this.touched(field, index)
    const inValid = !isValid && isTouched && field.required
    //this.onValidation.emit(inValid === false)
    return inValid
  }

}