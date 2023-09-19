import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { createEffect, ofType } from "@ngrx/effects";
import {
    Observable,
    catchError,
    filter,
    map,
    mergeMap,
    of,
    tap,
    withLatestFrom
} from "rxjs";
import {
    getProductsFailure,
    getProductsSuccess,
    selectProduct,
} from '../actions/actions';
import { Store, select } from "@ngrx/store";
import { NetworkService } from "src/app/shared/services/network.service";
import { getNavigationItemsSuccess, selectNavigationItem } from "../actions/navigation.actions";
import { lastLavigationItem, lastLavigationItemId, secondLastLavigationItem, secondLastLavigationItemId, selectedCatalogName, selectedProductId, selectedProductIsFile, selectedProductType } from "../selectors";
import { addEntity, addEntitySuccess, deleteEntitySuccess } from "../actions/entity.action";
import { ProductType } from "src/app/shared/enums/product-type";


@Injectable()
export class ProductListEffects {

    constructor(
        private store: Store,
        private actions$: Actions,
        private networkService: NetworkService) { }

    /// GET PRODUCT LIST 
    /// ON NAVIGATION ITEM SUCCESS
    getProductList$ = createEffect(() => this.actions$.pipe(
        ofType(getNavigationItemsSuccess),
        withLatestFrom(
            this.store.pipe(select(selectedCatalogName)),
            this.store.pipe(select(selectedProductId)),
            this.store.pipe(select(selectedProductIsFile)),
        ),
        filter(([_, catalogName, productId, isFile]) => isFile !== true),
        mergeMap(([
            _,
            catalogName,
            productId,
            isFile,
        ]) => {
            return this.productList$(catalogName, productId)
        }),
    ))

    /// GET PRODUCT LIST 
    /// ON CREATED ENTITY SUCCESS
    getProductListOnCreatedEntity$ = createEffect(() => this.actions$.pipe(
        ofType(addEntitySuccess),
        withLatestFrom(
            this.store.pipe(select(selectedCatalogName)),
            this.store.pipe(select(selectedProductId)),
            this.store.pipe(select(selectedProductIsFile)),
        ),
        filter(([_, catalogName, productId, isFile]) => isFile !== true),
        mergeMap(([
            _,
            catalogName,
            productId,
            isFile,
        ]) => {
            return this.productList$(catalogName, productId)
        }),
    ))

    /// GET PRODUCT LIST 
    /// ON DELETED CATEGORY/PRODUCT ENTITY SUCCESS 
    getProductListOnDeleteEntitySuccess$ = createEffect(() => this.actions$.pipe(
        ofType(deleteEntitySuccess),
        withLatestFrom(
            this.store.pipe(select(selectedProductType)),
            this.store.pipe(select(lastLavigationItem)),
            this.store.pipe(select(secondLastLavigationItem)),
        ),
        tap(([
            _,
            selectedProductType,
            lastProduct,
            secondLastProduct,
        ]) => {
            if (selectedProductType === ProductType.File || selectedProductType === ProductType.FileVariant) {
                if (lastProduct !== undefined && lastProduct !== null) {
                    this.store.dispatch(selectNavigationItem({ item: lastProduct }))
                }
            }
            else if (selectedProductType === ProductType.Category || selectedProductType === ProductType.CategoryVariant) {
                if (secondLastProduct !== undefined && secondLastProduct !== null) {
                    this.store.dispatch(selectNavigationItem({ item: secondLastProduct }))
                }
            }
        }),
    ), {
        dispatch: false
    })

    /// UTILS
    productList$ = (catalogName: string, productId?: number) => this.networkService
        .getProducts(catalogName, productId)
        .pipe(
            map((products) =>
                getProductsSuccess({ products: products })
            ),
            catchError((error) =>
                of(getProductsFailure({ error: error }))
            )
        )
}

