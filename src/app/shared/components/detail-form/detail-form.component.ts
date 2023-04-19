import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ProductDetail, ProductProperty, PropertFieldType, PropertyField } from '../../interfaces/product-detail';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import Utils from 'src/app/core/utils';
import { Product } from '../../interfaces/product';
import { formatDate } from '@angular/common';
import { text } from '@fortawesome/fontawesome-svg-core';
import { Variant, VariantPropertyField } from '../../interfaces/variant';

@Component({
  selector: 'app-detail-form',
  templateUrl: './detail-form.component.html',
  styleUrls: ['./detail-form.component.scss']
})
export class DetailFormComponent implements OnChanges {
  @Input() currentProduct: Product | undefined
  @Input() productDetail: ProductDetail | undefined
  @Input() loading: boolean = false
  @Output() onToggleAccordion = new EventEmitter<ProductDetail>()
  @Output() onSaveProductDetail = new EventEmitter<ProductDetail>()
  @Input() collapsed: boolean = true

  baseProperties: ProductProperty[] = []
  customProperties: ProductProperty[] = []
  variants: Variant[] = []

  tabs: string[] = []
  currentTab: string = ""

  constructor(private datePipe: DatePipe) { }

  ngOnChanges(changes: SimpleChanges) {
    this.tabs = []

    this.baseProperties = this.productDetail?.properties.filter(data => data.type === "Base") ?? [];
    this.addTab("BaseProperties", (this.baseProperties.length > 0))

    this.customProperties = this.productDetail?.properties.filter(data => data.type === "Custom") ?? []
    this.addTab("CustomProperties", (this.customProperties.length > 0))

    this.variants = Utils.variantsFromProductDetail(this.productDetail)
    this.addTab("Variants", (this.variants.length > 0))
  }

  onSave(productDetail: ProductDetail) {
    /*
    this.productDetail = {
      ...productDetail,
      properties: productDetail.properties.map(property => {
        const nestedFormGroup = this.detailFormGroup?.get(property.name) as FormGroup
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
    }

    this.onSaveProductDetail.emit(this.productDetail)
    */
  }

  addTab(tabName: string, condition: boolean = true) {
    if (!condition)
      return

    const index = this.tabs.indexOf(tabName)
    if (index === -1) {
      this.tabs.push(tabName);
    }
  }

  selectTab(name: string) {
    this.currentTab = name
  }

  toggleAccordion(product: ProductDetail | undefined) {
    this.collapsed = !this.collapsed
    this.onToggleAccordion.emit(product);

    if (this.collapsed) {
      this.selectTab("")
    } else if (!this.collapsed && this.tabs.length > 0) {
      this.selectTab(this.tabs[0])
    }
  }

}
