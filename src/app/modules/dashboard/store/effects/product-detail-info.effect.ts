/*
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
    Store,
    select
} from "@ngrx/store";
import {
    selectedCatalogName,
    selectedProductId,
} from "../selectors";
import {
    NetworkService
} from "src/app/shared/services/network.service";
import {
    getNavigationItemsSuccess
} from "../actions/navigation.actions";
import {
    getProductDetailInfoFailure,
    getProductDetailInfoSuccess
} from "../actions/product-detail-info.actions";


@Injectable()
export class ProductDetailInfoEffects {

    constructor(
        private store: Store,
        private actions$: Actions,
        private networkService: NetworkService) { }

    /// GET PRODUCT DETAILS 
    /// ON GET NAV ITEMS SUCCESS
    getProductDetailInfo = createEffect(() => this.actions$.pipe(
        ofType(getNavigationItemsSuccess),
        withLatestFrom(
            this.store.pipe(select(selectedCatalogName)),
            this.store.pipe(select(selectedProductId))
        ),
        mergeMap(([
            _,
            catalogName,
            selectedProductId,
        ]) => this.productDetailInfo$(catalogName, selectedProductId)),
    ))

    /// UTILS
    productDetailInfo$ = (catalogName: string, productId?: number) => this.networkService
        .getProductDetailInfo(catalogName, productId).pipe(
            map(([
                properties,
                association
            ]) =>
                getProductDetailInfoSuccess({
                    productDetail: properties,
                    productAssociation: association
                })
            ),
            catchError((error) =>
                of(getProductDetailInfoFailure({ error: error }))
            ))
}

*/
