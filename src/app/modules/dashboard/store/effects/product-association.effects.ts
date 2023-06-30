import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { createEffect, ofType } from "@ngrx/effects";
import {
    Observable,
    catchError,
    distinctUntilChanged,
    filter,
    forkJoin,
    map,
    mergeMap,
    of,
    withLatestFrom
} from "rxjs";
import {
    getProductAssociationFailure,
    getProductAssociationSuccess,
    getProductDetailFailure,
    getProductDetailSuccess,
    getProductsFailure,
    getProductsSuccess,
    postProductAssociation,
    postProductAssociationFailure,
    postProductAssociationSuccess,
    postProductDetail,
    postProductDetailFailure,
    postProductDetailSuccess,
} from '../actions/actions';
import { Store, select } from "@ngrx/store";
import {
    productAssociation,
    productDetail,
    selectedCatalogName,
    selectedProductId,
    selectedProductIsCatalog,
    selectedProductIsNotCatalog,
    selectedProductType
} from "../selectors";
import { NetworkService } from "src/app/shared/services/network.service";
import { ProductType } from "src/app/shared/enums/product-type";
import { getNavigationItemsSuccess } from "../actions/navigation.actions";


function allowWhen(decider$: Observable<boolean>) {
    return function <T>(source$: Observable<T>): Observable<T> {
        return source$.pipe(
            withLatestFrom(decider$),
            filter(([value, decider]) => decider),
            map(([value]) => value),
        )
    }
}

@Injectable()
export class ProductAssociationEffects {

    constructor(
        private store: Store,
        private actions$: Actions,
        private networkService: NetworkService) { }

    /// PRODUCT ASSOCIATION ON GET PRODUCT DETAIL SUCCESS
    /// (WHEN CURRENT PRODUCT IS NOT CATALOG)
    getProductAssociation = createEffect(() => this.actions$.pipe(
        ofType(getProductDetailSuccess),
        withLatestFrom(
            this.store.pipe(select(selectedProductType)),
            this.store.pipe(select(selectedCatalogName)),
            this.store.pipe(select(selectedProductId)),
            this.store.pipe(select(selectedProductIsNotCatalog)),
        ),
        filter(([
            _,
            selectedProductType,
            catalogName,
            productId,
            notCatalog,
        ]) => notCatalog && (productId !== undefined || productId !== null)),
        mergeMap(([
            _,
            selectedProductType,
            catalogName,
            productId,
            notCatalog,
        ]) => {
            return this.productAssociation$(catalogName, productId!)
        }),
    ))

    /// POST ASSOCIATION
    /// ON POST PRODUCT ASSOCIATION
    postProductAssociation$ = createEffect(() => this.actions$.pipe(
        ofType(postProductAssociation),
        withLatestFrom(
            this.store
                .pipe(select(productAssociation))
                .pipe(distinctUntilChanged((prev, curr) => prev === curr)),
        ),
        mergeMap(([
            _,
            productAssociation,
        ]) => this.networkService.postProductAssociation(productAssociation!)
            .pipe(
                map(() =>
                    postProductAssociationSuccess()
                ),
                catchError((error) =>
                    of(postProductAssociationFailure())
                ),
            ))
    ))

    /// UTILS
    productAssociation$ = (catalogName: string, productId: number) => this.networkService
        .getProductAssociation(catalogName, productId)
        .pipe(map((propertyDetail) =>
            getProductAssociationSuccess({ productAssociation: propertyDetail })
        ), catchError((error) =>
            of(getProductAssociationFailure({ error: error }))
        ))
}
