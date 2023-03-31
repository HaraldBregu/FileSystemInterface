import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ProductDetail, ProductProperty, PropertFieldType } from '../../interfaces/product-detail';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Utils from 'src/app/core/utils';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-detail-form',
  templateUrl: './detail-form.component.html',
  styleUrls: ['./detail-form.component.scss']
})
export class DetailFormComponent implements OnChanges {
  @Input() currentProduct: Product | undefined
  @Input() productDetail: ProductDetail | undefined
  @Output() onToggleAccordion = new EventEmitter<ProductDetail>()
  @Input() collapsed: boolean = true

  detailFormGroup: FormGroup | undefined
  propertyType: PropertFieldType | undefined
  PropertFieldType = PropertFieldType
  type: PropertFieldType = PropertFieldType.Text
  unfoldedProperties: string[] = []

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    this.detailFormGroup = new FormGroup({});
    this.unfoldedProperties = []

    this.productDetail?.properties?.forEach(property => {
      var tempFormGroup = new FormGroup({})

      property.childs.forEach(form => {
        var formControl = new FormControl(form.value)
        var controlKey = form.name
        if (form.ismultilanguage) {
          controlKey = form.name + form.language
        } else {
          controlKey = form.name
        }

        tempFormGroup.addControl(controlKey, formControl);
      })

      this.detailFormGroup?.addControl(property.name, tempFormGroup)
    })

  }

  toggleAccordion(product: ProductDetail | undefined) {
    this.collapsed = !this.collapsed
    this.onToggleAccordion.emit(product);
    this.detailFormGroup = undefined
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

  onSubmit() {
    console.log(this.detailFormGroup)
  }

  onSubmitForm(myform: any) {
    console.log(myform)

  }

  flagFromLang(lang: string) {
    return "fi fi-" + Utils.codeLanguagesToCountryCode(lang)
  }

}
