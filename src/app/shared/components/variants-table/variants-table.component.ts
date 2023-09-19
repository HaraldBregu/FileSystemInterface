import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Variant, VariantPropertyField } from '../../interfaces/variant';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Subscription, distinctUntilChanged } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Store } from '@ngrx/store';
import { selectEmptyProductDetailLoading } from 'src/app/modules/dashboard/store/selectors';

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
  @Input() loading: boolean = false
  @Output() isValidForm = new EventEmitter<boolean>();
  @Output() onChange = new EventEmitter<Variant[]>();
  @Output() onCreateNewVariant = new EventEmitter();
  @Output() onDeleteVariant = new EventEmitter<Variant>();

  //loadingForm$ = this.store.select(selectEmptyProductDetailLoading);

  variantFormGroup: FormGroup = new FormGroup({})
  headerVariant: Variant | undefined

  constructor(private store: Store) { }

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

  orderCodChannel = false
  toggleOrderCodChannel: boolean = true

  toggleOrderByCodChannel() {
    this.orderCodChannel = true
    this.orderCodMercato = false
    this.toggleOrderCodChannel = !this.toggleOrderCodChannel

    this.variants = this.variants.sort((a, b) => {
      const dataA = a.properties.find(data => data.name === 'CCN_COD_CHANNEL')
      const dataB = b.properties.find(data => data.name === 'CCN_COD_CHANNEL')

      if (this.toggleOrderCodChannel) {
        return dataB?.value.toLowerCase().localeCompare(dataA?.value.toLowerCase() ?? '') ?? 0
      } else {
        return dataA?.value.toLowerCase().localeCompare(dataB?.value.toLowerCase() ?? '') ?? 0
      }
    })
  }

  orderCodMercato = false
  toggleOrderCodMercato: boolean = true

  toggleOrderByCodMercato() {
    this.orderCodMercato = true
    this.orderCodChannel = false
    this.toggleOrderCodMercato = !this.toggleOrderCodMercato

    this.variants = this.variants.sort((a, b) => {
      const dataA = a.properties.find(data => data.name === 'CCN_COD_MERCATO')
      const dataB = b.properties.find(data => data.name === 'CCN_COD_MERCATO')

      if (this.toggleOrderCodMercato) {
        return dataB?.value.toLowerCase().localeCompare(dataA?.value.toLowerCase() ?? '') ?? 0
      } else {
        return dataA?.value.toLowerCase().localeCompare(dataB?.value.toLowerCase() ?? '') ?? 0
      }
    })
  }

  createNewVariant() {   
    this.onCreateNewVariant.emit()
  }

  deleteVariant(event: Variant) {
    this.onDeleteVariant.emit(event)
  }

}
