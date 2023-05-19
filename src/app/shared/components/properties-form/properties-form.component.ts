import { Component, Input, SimpleChanges } from '@angular/core';
import { ProductProperty, PropertFieldType, PropertyField } from '../../interfaces/product-detail';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import Utils from 'src/app/core/utils';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-properties-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  templateUrl: './properties-form.component.html',
  styleUrls: ['./properties-form.component.scss']
})
export class PropertiesFormComponent {
  @Input() properties: ProductProperty[] = []
  propertiesFormGroup: FormGroup = new FormGroup({})
  PropertFieldType = PropertFieldType
  unfoldedProperties: string[] = []

  ngOnChanges(changes: SimpleChanges) {
    this.propertiesFormGroup = new FormGroup({})

    this.properties.forEach(property => {
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
  }

  controlKeyProperty(property: PropertyField) {
    return property.name + "%-%" + property.datatype.toString() + "%-%" + property.language
  }

  
  singleLangProperties(properties: ProductProperty[]) {
    return properties.map(data => {
      return {
        ...data,
        childs: data.childs.filter(data => !data.ismultilanguage)
      }
    })
  }

  multiLangProperties(properties: ProductProperty[]) {
    var newProperties: ProductProperty[] = []

    const result: ProductProperty[] = properties.map(data => {
      return {
        ...data,
        childs: data.childs.filter(data => data.ismultilanguage)
      }
    })


    result.forEach(element => {

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
        newProperties.push({
          ...element,
          childs: data
        })
      })
    });

    return newProperties
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
