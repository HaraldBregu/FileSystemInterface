import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ProductProperty, PropertFieldType, PropertyField } from '../../interfaces/product-detail';
import { selectEmptyProductDetailLoading, selectEmptyProductDetailVariants } from 'src/app/modules/dashboard/store/selectors';
import Utils from 'src/app/core/utils';
import { distinctUntilChanged } from 'rxjs';
import { createVariant } from 'src/app/modules/dashboard/store/actions/variant.actions';

@Component({
  selector: 'app-modal-variant-create',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  templateUrl: './modal-variant-create.component.html',
  styleUrls: ['./modal-variant-create.component.scss']
})
export class ModalVariantCreateComponent {
  propertiesObservable = this.store.select(selectEmptyProductDetailVariants);
  propertiesLoadingObservable = this.store.select(selectEmptyProductDetailLoading);

  propertiesFormGroup: FormGroup = new FormGroup({})
  PropertFieldType = PropertFieldType
  newProperties: ProductProperty[] = []

  constructor(
    private store: Store,
    private dialogRef: MatDialogRef<ModalVariantCreateComponent>) {

  }

  productPropertyStart(properties: ProductProperty[]) {

    properties.forEach(property => {
      var tempFormGroup = new FormGroup({})

      function validatorFromPropertyField(propertyField: PropertyField) {
        var validators: ValidatorFn[] = []

        if (propertyField.isrequired)
          validators.push(Validators.required)

        switch (propertyField.datatype) {
          case PropertFieldType.Number:
          case PropertFieldType.BigNumber:
          case PropertFieldType.Decimal:
          case PropertFieldType.Double:
          case PropertFieldType.MoneyCurrency:
            //validators.push(Validators.pattern("-?\\d+(?:\\.\\d+)?"))
            //validators.push(Validators.pattern("^[0-9]*$"))
            break
          case PropertFieldType.Boolean:
            break
          case PropertFieldType.DateTime:
          case PropertFieldType.MultipleChoice:
            break
          case PropertFieldType.FileName:
          case PropertFieldType.Text:
          case PropertFieldType.LongText:
            if (propertyField.maxlength || propertyField.maxlength > 0)
              validators.push(Validators.maxLength(propertyField.maxlength))

        }
        return validators
      }

      tempFormGroup.addControl("VARIANTID",new FormControl(property.name))

      property.childs
        .filter(data => data.datatype === PropertFieldType.Text)
        .forEach(data => tempFormGroup.addControl(
          this.controlKeyProperty(data),
          new FormControl(data.value, validatorFromPropertyField(data))))

      property.childs
        .filter(data => data.datatype === PropertFieldType.LongText)
        .forEach(data => tempFormGroup.addControl(
          this.controlKeyProperty(data),
          new FormControl(data.value, validatorFromPropertyField(data))))

      property.childs
        .filter(data => data.datatype === PropertFieldType.Boolean)
        .forEach(data => tempFormGroup.addControl(
          this.controlKeyProperty(data),
          new FormControl(Boolean(JSON.parse(data.value ?? '0')), validatorFromPropertyField(data))))

      property.childs
        .filter(data => data.datatype === PropertFieldType.DateTime)
        .forEach(data => tempFormGroup.addControl(
          this.controlKeyProperty(data),
          new FormControl(data.value, validatorFromPropertyField(data))))

      property.childs
        .filter(data => data.datatype === PropertFieldType.MoneyCurrency)
        .forEach(data => tempFormGroup.addControl(
          this.controlKeyProperty(data),
          new FormControl(data.value, validatorFromPropertyField(data))))

      property.childs
        .filter(data => data.datatype === PropertFieldType.FileName)
        .forEach(data => tempFormGroup.addControl(
          this.controlKeyProperty(data),
          new FormControl(data.value, validatorFromPropertyField(data))))

      property.childs
        .filter(data => data.datatype === PropertFieldType.MultipleChoice)
        .forEach(data => tempFormGroup.addControl(
          this.controlKeyProperty(data),
          new FormControl(data.value, validatorFromPropertyField(data))))

      property.childs
        .filter(data => (
          data.datatype === PropertFieldType.Number ||
          data.datatype === PropertFieldType.BigNumber ||
          data.datatype === PropertFieldType.Decimal ||
          data.datatype === PropertFieldType.Double))
        .forEach(data => tempFormGroup.addControl(
          this.controlKeyProperty(data),
          new FormControl(data.value, validatorFromPropertyField(data))))

      this.propertiesFormGroup.addControl(property.name, tempFormGroup)
    })

    this.newProperties = properties.map(property => ({
      ...property,
      name: this.propertiesFormGroup?.get(property.name)?.get("VARIANTID")?.value,
      childs: property.childs.map(data => ({
        ...data,
        value: (this.propertiesFormGroup?.get(property.name) as FormGroup)
          .get(this.controlKeyProperty(data))?.value
      }))
    }))

    this.newProperties.forEach(data => {
      console.log(data.name);
    })

    return properties
  }

  close() {
    this.dialogRef.close()
  }

  createVariant() {
    this.close()
    this.store.dispatch(createVariant({ properties: this.newProperties }));
  }

  childsDataType(productProperty: ProductProperty, type: PropertFieldType, multiLanguage: boolean = false) {
    productProperty.type
    return productProperty.childs.filter(data => {
      return data.datatype === type && data.ismultilanguage === multiLanguage
    })
  }

  isPropertType(productProperty: ProductProperty, type: PropertFieldType, multiLanguage: boolean = false) {
    return productProperty.childs.filter(data => {
      return data.datatype === type && data.ismultilanguage === multiLanguage
    }).length > 0
  }

  controlKeyProperty(property: PropertyField) {
    return property.name + "%-%" + property.datatype.toString() + "%-%" + property.language
  }

  // VALIDATION

  fieldInValid(property: string, field: PropertyField) {
    const formGroupProperties = this.propertiesFormGroup.controls[property] as FormGroup
    const formControl = formGroupProperties.controls[this.controlKeyProperty(field)]
    return !formControl.valid //&& formControl.touched
  }

  formControl(property: string, field: PropertyField) {
    const formGroupProperties = this.propertiesFormGroup.controls[property] as FormGroup
    const formControl = formGroupProperties.controls[this.controlKeyProperty(field)]
    return formControl
  }

  errors(property: string, field: PropertyField) {
    const formControl = this.formControl(property, field)
    return formControl.errors
  }

  fieldHaveValue(field: PropertyField) {
    if (field.value === null) {
    }

    if (!field.value)
      return false

    return field.value.length > 0
  }


  flagFromLang(lang: string) {
    return "fi fi-" + Utils.codeLanguagesToCountryCode(lang)
  }
}
