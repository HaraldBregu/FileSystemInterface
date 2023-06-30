import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ProductProperty, PropertFieldType, PropertyField } from '../../interfaces/product-detail';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import Utils from 'src/app/core/utils';

@Component({
  selector: 'app-prop-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  templateUrl: './prop-form.component.html',
  styleUrls: ['./prop-form.component.scss']
})
export class PropFormComponent implements OnInit, OnChanges {
  @Input() properties: ProductProperty[] = []
  @Output() isValidForm = new EventEmitter<boolean>();
  @Output() onChange = new EventEmitter<ProductProperty[]>();

  singleLanguageProperties: ProductProperty[] = []
  multiLanguageProperties: ProductProperty[] = []

  propertiesFormGroup: FormGroup = new FormGroup({})
  PropertFieldType = PropertFieldType
  unfoldedProperties: string[] = []

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    const props = changes['properties']

    if (props.currentValue !== props.previousValue) {
    }

    if (props.firstChange) {
    }
  }

  ngOnInit() {
    this.setupInitialData()
  }

  setupInitialData() {
    this.propertiesFormGroup = new FormGroup({})

    this.properties.forEach(property => {
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

      // TEXT FORMS

      property.childs
        .filter(data => data.datatype === PropertFieldType.Text)
        .forEach(data => tempFormGroup.addControl(
          this.controlKeyProperty(data),
          new FormControl(data.value, validatorFromPropertyField(data))))

      // TEXTAREA FORMS

      property.childs
        .filter(data => data.datatype === PropertFieldType.LongText)
        .forEach(data => tempFormGroup.addControl(
          this.controlKeyProperty(data),
          new FormControl(data.value, validatorFromPropertyField(data))))

      // BOOLEAN FORM

      property.childs
        .filter(data => data.datatype === PropertFieldType.Boolean)
        .forEach(data => tempFormGroup.addControl(
          this.controlKeyProperty(data),
          new FormControl(Boolean(JSON.parse(data.value ?? '0')), validatorFromPropertyField(data))))

      // DATE FORMS

      property.childs
        .filter(data => data.datatype === PropertFieldType.DateTime)
        .forEach(data => tempFormGroup.addControl(
          this.controlKeyProperty(data),
          new FormControl(data.value, validatorFromPropertyField(data))))

      // MONEY CURRENCY FORMS

      property.childs
        .filter(data => data.datatype === PropertFieldType.MoneyCurrency)
        .forEach(data => tempFormGroup.addControl(
          this.controlKeyProperty(data),
          new FormControl(data.value, validatorFromPropertyField(data))))

      // FILENAME FORMS

      property.childs
        .filter(data => data.datatype === PropertFieldType.FileName)
        .forEach(data => tempFormGroup.addControl(
          this.controlKeyProperty(data),
          new FormControl(data.value, validatorFromPropertyField(data))))

      // MULTICHOICE FORMS

      property.childs
        .filter(data => data.datatype === PropertFieldType.MultipleChoice)
        .forEach(data => tempFormGroup.addControl(
          this.controlKeyProperty(data),
          new FormControl(data.value, validatorFromPropertyField(data))))

      // NUMBER FORMS

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

    setTimeout(() => {
      this.isValidForm.emit(this.propertiesFormGroup.valid)
    }, 0);

    this.setupSingleLanguageContent()
    this.setupMultiLanguageContent()

    this.propertiesFormGroup.valueChanges
      .pipe(distinctUntilChanged((prev, curr) => prev === curr))
      .subscribe(data => {

        const newProperties = this.properties.map(property => ({
          ...property,
          childs: property.childs.map(data => ({
            ...data,
            value: (this.propertiesFormGroup?.get(property.name) as FormGroup)
              .get(this.controlKeyProperty(data))?.value
          }))
        }))

        setTimeout(() => {
          this.isValidForm.emit(this.propertiesFormGroup.valid)
        }, 0);
        this.onChange.emit(newProperties)

      })
  }

  /// HELPERS

  setupSingleLanguageContent() {
    this.singleLanguageProperties = this.properties.map(data => {
      return {
        ...data,
        childs: data.childs.filter(data => data.ismultilanguage === false)
      }
    })
  }

  setupMultiLanguageContent() {
    this.multiLanguageProperties = []

    // Multi Language Properties
    var mlprop = this.properties.map(data => {
      return {
        ...data,
        childs: data.childs.filter(data => data.ismultilanguage === true)
      }
    })

    mlprop.forEach(element => {
      const result: PropertyField[][] = element.childs.reduce((acc: PropertyField[][], cur: PropertyField) => {
        const lastGroup = acc[acc.length - 1];
        if (lastGroup && lastGroup[0].name === cur.name) {
          lastGroup.push(cur);
        } else {
          acc.push([cur]);
        }
        return acc;
      }, [])

      result.forEach(data => {
        this.multiLanguageProperties.push({
          ...element,
          childs: data
        })
      })
    })
  }

  controlKeyProperty(property: PropertyField) {
    return property.name + "%-%" + property.datatype.toString() + "%-%" + property.language
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

  flagFromLang(lang: string) {
    return "fi fi-" + Utils.codeLanguagesToCountryCode(lang)
  }

  toggleProperty(propertyName: string) {
    const index = this.unfoldedProperties.indexOf(propertyName)

    if (index === -1) {
      this.unfoldedProperties.push(propertyName);
    } else {
      this.unfoldedProperties.splice(index, 1);
    }
  }

  isUnfolded(propertyName: string) {
    const index = this.unfoldedProperties.indexOf(propertyName)
    return index !== -1
  }

  hasUnfoldedSections() {
    return this.unfoldedProperties.length > 0
  }

  getNameOfProperty(productProperty: ProductProperty) {
    if (productProperty.childs.length > 0) {
      return productProperty.childs[0].displayname
    }
    return "-"
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
}