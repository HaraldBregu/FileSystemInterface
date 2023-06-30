import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { createEffect, ofType } from "@ngrx/effects";
import {
    catchError,
    filter,
    map,
    mergeMap,
    of,
    withLatestFrom
} from "rxjs";
import {
    getProductsFailure,
    getProductsSuccess,
} from '../actions/actions';
import { Store, select } from "@ngrx/store";
import {
    selectedCatalogName,
    selectedProductId,
    selectedProductIsFile,
} from "../selectors";
import { NetworkService } from "src/app/shared/services/network.service";
import { getNavigationItemsSuccess } from "../actions/navigation.actions";


@Injectable()
export class ProductEffects {

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

