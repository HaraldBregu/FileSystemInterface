import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, Self, SimpleChanges } from '@angular/core';
import { ProductProperty, PropertFieldType, PropertyField } from '../../interfaces/product-detail';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import Utils from 'src/app/core/utils';
import { Store } from '@ngrx/store';
import { Observable, Subscription, map, merge } from 'rxjs';
import { DashboardModelState, dashboardDataSelector } from 'src/app/store';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
export class PropFormComponent implements OnInit {
  @Input() type?: string
  @Output() onSave = new EventEmitter<ProductProperty[]>()

  properties: ProductProperty[] = []
  singleLanguageProperties: ProductProperty[] = []
  multiLanguageProperties: ProductProperty[] = []
  propertiesFormGroup: FormGroup = new FormGroup({})
  PropertFieldType = PropertFieldType
  unfoldedProperties: string[] = []
  dashboardObservable$: Observable<DashboardModelState> = new Observable()

  constructor(private store: Store) {
    this.dashboardObservable$ = this.store.select(dashboardDataSelector)
  }

  ngOnInit() {
    var propertiesObservable$: Observable<ProductProperty[]> = new Observable()

    if (this.type === "Base")
      propertiesObservable$ = this.dashboardObservable$.pipe(map(data => data.baseProperties))
    if (this.type === "Custom")
      propertiesObservable$ = this.dashboardObservable$.pipe(map(data => data.customProperties))

    propertiesObservable$.subscribe(properties => {
      this.properties = properties

      this.propertiesFormGroup = new FormGroup({})
      properties.forEach(property => {

        var tempFormGroup = new FormGroup({})

        // TEXT FORMS
        property.childs
          .filter(data => data.datatype === PropertFieldType.Text)
          .forEach(data => {
            tempFormGroup.addControl(this.controlKeyProperty(data), new FormControl(data.value, []))
          });

        // TEXTAREA FORMS
        property.childs
          .filter(data => data.datatype === PropertFieldType.LongText)
          .forEach(data => {
            tempFormGroup.addControl(this.controlKeyProperty(data), new FormControl(data.value, []))
          })

        // BOOLEAN FORM
        property.childs
          .filter(data => data.datatype === PropertFieldType.Boolean)
          .forEach(data => {
            tempFormGroup.addControl(this.controlKeyProperty(data), new FormControl(data.value, []))
          })

        // DATE FORMS
        property.childs
          .filter(data => data.datatype === PropertFieldType.DateTime)
          .forEach(data => {
            tempFormGroup.addControl(this.controlKeyProperty(data), new FormControl(data.value, []))
          })

        // MONEY CURRENCY FORMS
        property.childs
          .filter(data => data.datatype === PropertFieldType.MoneyCurrency)
          .forEach(data => {
            tempFormGroup.addControl(this.controlKeyProperty(data), new FormControl(data.value, []))
          })

        // FILENAME FORMS
        property.childs
          .filter(data => data.datatype === PropertFieldType.FileName)
          .forEach(data => {
            tempFormGroup.addControl(this.controlKeyProperty(data), new FormControl(data.value, []))
          })

        // MULTICHOICE FORMS
        property.childs
          .filter(data => data.datatype === PropertFieldType.MultipleChoice)
          .forEach(data => {
            tempFormGroup.addControl(this.controlKeyProperty(data), new FormControl(data.value, []))
          })

        // NUMBER FORMS
        property.childs
          .filter(data => (
            data.datatype === PropertFieldType.Number ||
            data.datatype === PropertFieldType.BigNumber ||
            data.datatype === PropertFieldType.Decimal ||
            data.datatype === PropertFieldType.Double))
          .forEach(data => {
            tempFormGroup.addControl(this.controlKeyProperty(data), new FormControl(data.value, []))
          })

        this.propertiesFormGroup.addControl(property.name, tempFormGroup)
      })

      this.setupSingleLanguageContent()
      this.setupMultiLanguageContent()
    })
  }

  saveProperties() {
    var newProperties = this.properties.map(property => {
      const nestedFormGroup = this.propertiesFormGroup?.get(property.name) as FormGroup
      return {
        ...property,
        childs: property.childs.map(data => {
          return {
            ...data,
            value: nestedFormGroup.get(this.controlKeyProperty(data))?.value
          }
        })
      }
    })

    this.onSave.emit(newProperties)
  }

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
    console.log(propertyName)
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
}
