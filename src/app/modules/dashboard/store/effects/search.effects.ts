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
    getSearchData,
    getSearchDataFailure,
    getSearchDataForCatalog,
    getSearchDataForSelectedProduct,
    getSearchDataResult,
    getSearchDataResultFailure,
    getSearchDataResultSuccess,
    getSearchDataSuccess,
} from '../actions/actions';
import { Store, select } from "@ngrx/store";
import {
    searchData,
    selectedCatalogName,
    selectedProductId,
} from "../selectors";
import { NetworkService } from "src/app/shared/services/network.service";
import { SearchData } from "src/app/shared/interfaces/search-data";


@Injectable()
export class SearchEffects {

    constructor(
        private store: Store,
        private actions$: Actions,
        private networkService: NetworkService) { }

    /// ON GET SEARCH DATA
    getSearchDataList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getSearchData),
            mergeMap(() => this.getSearchData$())))

    /// ON GET SEARCH DATA FOR CATALOG
    getSearchDataForCatalog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getSearchDataForCatalog),
            mergeMap((data) => this.getSearchData$(data.catalogName))))

    /// ON GET SEARCH DATA FOR SELECTED PRODUCT
    getSearchFiltersOfSelectedProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getSearchDataForSelectedProduct),
            withLatestFrom(
                this.store.pipe(select(selectedCatalogName)),
                this.store.pipe(select(selectedProductId))
            ),
            map(action => action),
            mergeMap(([
                action,
                catalogName,
                selectedProductId
            ]) => this.getSearchData$(catalogName, selectedProductId, action.searchType))))

    /// ON GET SEARCH DATA REDULT
    getSearchDataResultList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getSearchDataResult),
            withLatestFrom(
                this.store.pipe(select(searchData)),
            ),
            mergeMap(([
                _,
                searchData,
            ]) => this.getSearchDataResult$(searchData))))

    /// UTILS
    getSearchData$ = (catalogName?: string, categoryId?: number, type?: string) => this.networkService
        .getSearchData(catalogName, categoryId, type).pipe(
            map(response =>
                getSearchDataSuccess({ searchData: response })),
            catchError((error) =>
                of(getSearchDataFailure({ error: error }))))

    getSearchDataResult$ = (searchData: SearchData) => this.networkService
        .postSearchData(searchData).pipe(
            map(response =>
                getSearchDataResultSuccess({ resultList: response })),
            catchError((error) =>
                of(getSearchDataResultFailure({ error: error }))))

}
