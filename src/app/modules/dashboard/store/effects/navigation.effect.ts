import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { createEffect, ofType } from "@ngrx/effects";
import {
    catchError,
    map,
    mergeMap,
    of,
    withLatestFrom
} from "rxjs";
import {
    selectSearchResult,
} from '../actions/actions';
import { Store, select } from "@ngrx/store";
import {
    selectedCatalogName,
} from "../selectors";
import { NetworkService } from "src/app/shared/services/network.service";
import { ProductType } from "src/app/shared/enums/product-type";
import {
    getNavigationItemsFailure,
    getNavigationItemsFromProduct,
    getNavigationItemsSuccess,
    selectNavigationItem
} from "../actions/navigation.actions";

@Injectable()
export class NavigationEffects {

    constructor(
        private store: Store,
        private actions$: Actions,
        private networkService: NetworkService) { }

    /// GET NAV LIST
    /// ON SELECT PRODUCT
    getNavigationListFromSelectedProduct$ = createEffect(() => this.actions$.pipe(
        ofType(getNavigationItemsFromProduct),
        withLatestFrom(
            this.store.pipe(select(selectedCatalogName)),
        ),
        mergeMap(([
            action,
            catalogName,
        ]) => {
            const selectedProduct = action.product
            const selectedProductType = selectedProduct.type
            const isCatalog = selectedProductType === ProductType.Catalog
            const selectedProductId = isCatalog ? undefined : selectedProduct.id

            return this.navigationList$(catalogName, selectedProductId)
        }),
    ))

    /// GET NAV LIST
    /// ON SELECT NAVIGATION ITEM
    getNavigationListOnSelectNavigationItem$ = createEffect(() => this.actions$.pipe(
        ofType(selectNavigationItem),
        mergeMap((action) => {
            const selectedProduct = action.item
            const selectedProductType = selectedProduct.type
            const catalogName = selectedProduct.catalogname
            const isCatalog = selectedProductType === ProductType.Catalog
            const selectedProductId = isCatalog ? undefined : selectedProduct.oid

            return this.navigationList$(catalogName, selectedProductId)
        }),
    ))

    /// GET NAV LIST
    /// ON SELECT SEARCH RESULT ITEM
    getNavigationListOnSelectSearchResultItem$ = createEffect(() => this.actions$.pipe(
        ofType(selectSearchResult),
        mergeMap((action) => {
            const selectedProduct = action.searchDataResult
            const catalogName = selectedProduct.catalogname
            const selectedProductId = selectedProduct.oid

            return this.navigationList$(catalogName, selectedProductId)
        }),
    ))

    /// UTILS
    navigationList$ = (catalogName: string, productId?: number) => this.networkService
        .getNavigationList(catalogName, productId)
        .pipe(
            map((items) =>
                getNavigationItemsSuccess({ items: items })
            ),
            catchError((error) =>
                of(getNavigationItemsFailure({ error: error }))
            ))

}
