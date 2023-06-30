import { Component, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { distinctUntilChanged, map } from 'rxjs';
import {
  currentProduct,
  currentProductDetailAssociation,
  currentProductDetailAssociationLoading,
  postProductAssociation,
  postProductDetail,
  savingProductAssociation,
  savingProductDetail,
  updatedProductDetail
} from 'src/app/store';
import { CommonModule } from '@angular/common';
import { PropFormComponent } from '../prop-form/prop-form.component';
import { VariantsTableComponent } from '../variants-table/variants-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AssociationDataComponent } from '../association-data/association-data.component';
import { CoreUIModule } from 'src/app/core/components/core-ui.module';


@Component({
  selector: 'app-detail-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    PropFormComponent,
    VariantsTableComponent,
    AssociationDataComponent,
    CoreUIModule,
  ],
  templateUrl: './detail-form.component.html',
  styleUrls: ['./detail-form.component.scss']
})
export class DetailFormComponent implements OnDestroy {
  tabs: string[] = []
  currentTab: string = ""

  updatedProductDetail$ = this.store
    .pipe(select(updatedProductDetail))
    .pipe(distinctUntilChanged((prev, curr) => prev === curr))
    .pipe(map(data => data))

  selectedProduct$ = this.store
    .pipe(select(currentProduct))

  currentDetailLoading$ = this.store
    .pipe(select(currentProductDetailAssociationLoading))

  savingProductDetail$ = this.store
    .pipe(select(savingProductDetail))

  savingProductAssociation$ = this.store
    .pipe(select(savingProductAssociation))

  currentProductDetailAssociation$ = this.store
    .pipe(select(currentProductDetailAssociation))
    .pipe(distinctUntilChanged((prev, curr) =>
      prev.currentProductDetail === curr.currentProductDetail &&
      prev.currentProductAssociation === curr.currentProductAssociation
    ))

  productDetailAssociationSubscribtion = this.currentProductDetailAssociation$.subscribe((data) => {
    this.tabs = []

    const baseProperties = data.currentProductDetail?.properties.filter(data => data.type === "Base")
    if (baseProperties && baseProperties.length > 0)
      this.tabs.push("BaseProperties")


    const customProperties = data.currentProductDetail?.properties.filter(data => data.type === "Custom")
    if (customProperties && customProperties.length > 0)
      this.tabs.push("CustomProperties")

    const variantProperties = data.currentProductDetail?.properties.filter(data => data.type === "Variant")
    if (variantProperties && variantProperties.length > 0)
      this.tabs.push("Variants")

    if (data.currentProductAssociation !== undefined && data.currentProductAssociation !== null)
      this.tabs.push("Associations")

    this.currentTab = this.tabs[0]
  })

  constructor(private store: Store) {

  }

  ngOnDestroy(): void {
    this.productDetailAssociationSubscribtion.unsubscribe()
  }

  saveProperties() {
    this.store.dispatch(postProductDetail())
  }

  saveAssociation() {
    this.store.dispatch(postProductAssociation())
  }

}
