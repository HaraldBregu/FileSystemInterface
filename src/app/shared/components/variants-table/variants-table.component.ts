import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Variant } from '../../interfaces/variant';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { ProductProperty } from '../../interfaces/product-detail';
import { DashboardModelState, dashboardDataSelector } from 'src/app/store';
import Utils from 'src/app/core/utils';
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
  @Input() type?: string
  @Output() onSave = new EventEmitter<ProductProperty[]>()
  properties: ProductProperty[] = []

  variants: Variant[] = []
  variantFormGroup: FormGroup = new FormGroup({})
  headerVariant: Variant | undefined
  dashboardObservable$: Observable<DashboardModelState> = new Observable()

  constructor(private store: Store) {
    this.dashboardObservable$ = this.store.select(dashboardDataSelector)
  }

  ngOnInit() {
    var propertiesObservable$ = this.dashboardObservable$.pipe(map(data => data.variantProperties))

    propertiesObservable$.subscribe(variants => {
      this.variants = Utils.variantsFromVariantProperties(variants)

      this.variants.forEach((variant, index) => {
        var tempFormGroup = new FormGroup({})
        variant.properties.forEach(property => {
          tempFormGroup.addControl(property.name, new FormControl(property.value, []))
        })
        this.variantFormGroup.addControl("variant" + index, tempFormGroup)
      })

      this.headerVariant = this.variants[0]
      this.variants = this.variants
    })
  }

  saveVariants() {
    var newVariants = this.variants.map((variant, index) => {
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
    
    this.onSave.emit(Utils.propertiesFromVariants(newVariants))
  }
}
