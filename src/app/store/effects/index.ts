import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { createEffect, ofType } from "@ngrx/effects";
import { Observable, catchError, concatMap, distinctUntilChanged, filter, first, forkJoin, map, mergeMap, of, retry, switchMap, take, takeLast, withLatestFrom } from "rxjs";
import {
    getApiEnvironments,
    getApiEnvironmentsFailure,
    getApiEnvironmentsSuccess,
    getCatalogs,
    getCatalogsFailure,
    getCatalogsSuccess,
    getProductAssociationFailure,
    getProductAssociationSuccess,
    getProductDetailFailure,
    getProductDetailSuccess,
    getProductsFailure,
    getProductsSuccess,
    getSearchFilters,
    getSearchFiltersFailure,
    getSearchFiltersOfSelectedProduct,
    getSearchFiltersSuccess,
    getSearchResult,
    getSearchResultFailure,
    getSearchResultSuccess,
    postProductAssociation,
    postProductAssociationFailure,
    postProductAssociationSuccess,
    postProductDetail,
    postProductDetailFailure,
    postProductDetailSuccess,
    selectProduct
} from '../actions';
import { Store, select } from "@ngrx/store";
import { selectedCatalogName, selectedProductId, selectedProductIsCatalog, updatedAssociationProduct, updatedProductAssociation } from "../selectors";
import { NetworkService } from "src/app/shared/services/network.service";
import { updatedProductDetail } from "../selectors";


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
export class DashboardEffects {

    constructor(
        private store: Store,
        private actions$: Actions,
        private networkService: NetworkService) { }

    catalogList$ = createEffect(() => this.actions$.pipe(
        ofType(getCatalogs),
        mergeMap(() => this.networkService.getCatalogs().pipe(
            map(dataList =>
                getCatalogsSuccess({ productList: dataList })),
            catchError((error) =>
                of(getCatalogsFailure({ error: error })))
        ))
    )
    )

    getProductList$ = createEffect(() => this.actions$.pipe(
        ofType(selectProduct),
        withLatestFrom(
            this.store.pipe(select(selectedCatalogName)),
            this.store.pipe(select(selectedProductId))
        ),
        map(action => action),
        mergeMap(([
            action,
            object1,
            object2
        ]) => forkJoin([
            this.networkService.getProducts(object1.catalogName, object2.productId),
        ]).pipe(
            map(([products]) =>
                getProductsSuccess({ products: products })
            ),
            catchError((error) =>
                of(getProductsFailure({ error: error }))
            )
        )),
    ))

    /// GET Product Detail
    getPropertyDetail = createEffect(() => this.actions$.pipe(
        ofType(selectProduct),
        withLatestFrom(
            this.store.pipe(select(selectedCatalogName)),
            this.store.pipe(select(selectedProductId))
        ),
        map(action => action),
        mergeMap(([
            action,
            object1,
            object2
        ]) => forkJoin([
            this.networkService.getProductDetail(object1.catalogName, object2.productId),
        ]).pipe(
            map(([propertyDetail]) =>
                getProductDetailSuccess({ productDetail: propertyDetail })
            ),
            catchError((error) =>
                of(getProductDetailFailure({ error: error }))
            )
        )),
    ))

    /// POST Product Detail
    postPropertyDetail$ = createEffect(() => this.actions$.pipe(
        ofType(postProductDetail),
        withLatestFrom(
            this.store
                .pipe(select(updatedProductDetail))
                .pipe(distinctUntilChanged((prev, curr) => prev === curr)),
            this.store
                .pipe(select(selectedProductIsCatalog))
                .pipe(distinctUntilChanged((prev, curr) => prev === curr)),
        ),
        mergeMap(([
            action,
            productDetail,
            iscatalog
        ]) => this.networkService.postProductDetail(productDetail, iscatalog)
            .pipe(
                map(() =>
                    postProductDetailSuccess()
                ),
                catchError((error) =>
                    of(postProductDetailFailure({ error: error }))
                ),
            ))
    ))

    /// GET Product Association
    getProductAssociation = createEffect(() => this.actions$.pipe(
        ofType(selectProduct),
        withLatestFrom(
            this.store
                .pipe(select(selectedCatalogName)),
            this.store
                .pipe(select(selectedProductId))
        ),
        allowWhen(
            this.store
                .pipe(select(selectedProductId))
                .pipe(map(data => data.productId !== null && data.productId !== undefined))
        ),
        map(action => action),
        mergeMap(([
            action,
            object1,
            object2
        ]) => forkJoin([
            this.networkService.getProductAssociation(object1.catalogName, object2.productId!),
        ]).pipe(
            map(([propertyDetail]) =>
                getProductAssociationSuccess({ productAssociation: propertyDetail })),
            catchError((error) =>
                of(getProductAssociationFailure({ error: error }))
            )
        )),
    ))

    /// POST Product Association
    postProductAssociation$ = createEffect(() => this.actions$.pipe(
        ofType(postProductAssociation),
        withLatestFrom(
            this.store
                .pipe(select(updatedProductAssociation))
                .pipe(distinctUntilChanged((prev, curr) => prev === curr)),
                //.pipe(filter(data => !!data)),
        ),
        mergeMap(([
            action,
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

    /*
        saveAssociation$ = createEffect(() =>
            this.actions$.pipe(
                ofType(saveAssociation),
                withLatestFrom(this.store.pipe(select(updatedAssociationProduct))),
                map(action => action),
                mergeMap(([action, object1]) => this.networkService.postProductAssociation(object1.association).pipe(
                    map(response =>
                        getProductAssociationSuccess({ productAssociation: response })),
                    catchError((error) =>
                        of(getProductAssociationFailure({ error: error })))
                ))
            )
        )*/

    getApiEnvironments$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getApiEnvironments),
            mergeMap(() => this.networkService.getEnvironmentVariables().pipe(
                map(response =>
                    getApiEnvironmentsSuccess({ environments: response })),
                catchError((error) =>
                    of(getApiEnvironmentsFailure({ error: error })))
            ))
        )
    )

    getCatalogSearch$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getSearchFilters),
            mergeMap(() => this.networkService.getSearchData().pipe(
                map(response =>
                    getSearchFiltersSuccess({ searchData: response })),
                catchError((error) =>
                    of(getSearchFiltersFailure({ error: error })))
            ))
        )
    )

    getCatalogSearchResult$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getSearchResult),
            mergeMap((data) => this.networkService.postSearchData(data.searchData).pipe(
                map(response =>
                    getSearchResultSuccess({ resultList: response })),
                catchError((error) =>
                    of(getSearchResultFailure({ error: error })))
            ))
        )
    )

    getFiltersOfSelectedProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getSearchFiltersOfSelectedProduct),
            withLatestFrom(
                this.store.pipe(select(selectedCatalogName)),
                this.store.pipe(select(selectedProductId))
            ),
            map(action => action),
            mergeMap(([
                action,
                object1,
                object2
            ]) => this.networkService.getSearchData(object1.catalogName, object2.productId).pipe(
                map(response =>
                    getSearchFiltersSuccess({ searchData: response })),
                catchError((error) =>
                    of(getSearchFiltersFailure({ error: error })))
            ))
        )
    )
}
