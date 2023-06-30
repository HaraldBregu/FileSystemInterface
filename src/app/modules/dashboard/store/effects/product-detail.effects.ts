import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { createEffect, ofType } from "@ngrx/effects";
import {
    Observable,
    catchError,
    distinctUntilChanged,
    filter,
    map,
    mergeMap,
    of,
    withLatestFrom
} from "rxjs";
import {
    getProductDetailFailure,
    getProductDetailSuccess,
    postProductDetail,
    postProductDetailFailure,
    postProductDetailSuccess,
} from '../actions/actions';
import { Store, select } from "@ngrx/store";
import {
    productDetail,
    selectedCatalogName,
    selectedProductId,
    selectedProductIsCatalog,
} from "../selectors";
import { NetworkService } from "src/app/shared/services/network.service";
import { getNavigationItemsSuccess } from "../actions/navigation.actions";
import { ProductDetail } from "src/app/shared/interfaces/product-detail";


@Injectable()
export class ProductDetailEffects {

    constructor(
        private store: Store,
        private actions$: Actions,
        private networkService: NetworkService) { }

    /// GET PRODUCT DETAILS 
    /// ON GET NAV ITEMS SUCCESS
    getProductDetail = createEffect(() => this.actions$.pipe(
        ofType(getNavigationItemsSuccess),
        withLatestFrom(
            this.store.pipe(select(selectedCatalogName)),
            this.store.pipe(select(selectedProductId))
        ),
        mergeMap(([
            _,
            catalogName,
            selectedProductId,
        ]) => this.productDetail$(catalogName, selectedProductId)),
    ))

    /// GET PRODUCT DETAILS 
    /// ON POST DETAIL SUCCESS
    getProductDetailOnPostDetailSuccess = createEffect(() => this.actions$.pipe(
        ofType(postProductDetailSuccess),
        withLatestFrom(
            this.store.pipe(select(selectedCatalogName)),
            this.store.pipe(select(selectedProductId))
        ),
        mergeMap(([
            _,
            catalogName,
            selectedProductId,
        ]) => this.productDetail$(catalogName, selectedProductId)),
    ))

    /// POST DETAILS
    /// ON POST PRODUCT DETAIL
    postPropertyDetail$ = createEffect(() => this.actions$.pipe(
        ofType(postProductDetail),
        withLatestFrom(
            this.store
                .pipe(select(productDetail))
                .pipe(distinctUntilChanged((prev, curr) => prev === curr)),
            this.store
                .pipe(select(selectedProductIsCatalog))
                .pipe(distinctUntilChanged((prev, curr) => prev === curr)),
        ),
        mergeMap(([
            _,
            productDetail,
            iscatalog
        ]) => this.postProductDetail$(productDetail, iscatalog)
        )
    ))

    /// UTILS
    productDetail$ = (catalogName: string, productId?: number) => this.networkService
        .getProductDetail(catalogName, productId).pipe(
            map((propertyDetail) =>
                getProductDetailSuccess({ productDetail: propertyDetail })
            ),
            catchError((error) =>
                of(getProductDetailFailure({ error: error }))
            ))

    postProductDetail$ = (productDetail: ProductDetail, iscatalog: boolean) => this.networkService
        .postProductDetail(productDetail, iscatalog)
        .pipe(
            map(() =>
                postProductDetailSuccess()
            ),
            catchError((error) =>
                of(postProductDetailFailure({ error: error }))
            ))
}
