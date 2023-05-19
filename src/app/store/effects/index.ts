import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { CatalogService } from "src/app/shared/services/catalog.service";
import { CategoryService } from "src/app/shared/services/category.service";
import {
    getApiEnvironments,
    getApiEnvironmentsFailure,
    getApiEnvironmentsSuccess,
    getCatalogProperties,
    getCatalogPropertiesFailure,
    getCatalogPropertiesSuccess,
    getCatalogs,
    getCatalogsFailure,
    getCatalogsSuccess,
    getCategories,
    getCategoriesFailure,
    getCategoriesSuccess,
    getCategoryAssociations,
    getCategoryAssociationsFailure,
    getCategoryAssociationsSuccess,
    getCategoryProperties,
    getCategoryPropertiesFailure,
    getCategoryPropertiesSuccess,
    getSearchFilters,
    getSearchFiltersFailure,
    getSearchFiltersSuccess,
    getSearchResult,
    getSearchResultFailure,
    getSearchResultSuccess,
    saveCatalogProperties,
    saveCatalogPropertiesFailure,
    saveCatalogPropertiesSuccess,
    saveCategoryProperties,
    saveCategoryPropertiesFailure,
    saveCategoryPropertiesSuccess
} from '../actions';
import { EnvironmentService } from "src/app/shared/services/environment.service";
import { SearchService } from "src/app/shared/services/search.service";

@Injectable()
export class DashboardEffects {

    constructor(
        private actions$: Actions,
        private catalogService: CatalogService,
        private categoryService: CategoryService,
        private environmentService: EnvironmentService,
        private searchService: SearchService) { }

    catalogList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getCatalogs),
            mergeMap(() => this.catalogService.getAll().pipe(
                map(catalogs =>
                    getCatalogsSuccess({ catalogs: catalogs })),
                catchError((error) =>
                    of(getCatalogsFailure({ error: error })))
            ))
        )
    )

    getCatalogProperties$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getCatalogProperties),
            mergeMap(({ catalog }) => this.catalogService.getProperties(catalog.name).pipe(
                map(response =>
                    getCatalogPropertiesSuccess({ catalog_properties: response })),
                catchError((error) =>
                    of(getCatalogPropertiesFailure({ error: error })))
            ))
        )
    )

    saveCatalogProperties$ = createEffect(() =>
        this.actions$.pipe(
            ofType(saveCatalogProperties),
            mergeMap(({ data }) => this.catalogService.saveProperties(data).pipe(
                map(response =>
                    saveCatalogPropertiesSuccess({ success: true })),
                catchError((error) =>
                    of(saveCatalogPropertiesFailure({ error: error })))
            ))
        )
    )

    categoryList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getCategories),
            mergeMap(({ catalog, category }) => this.categoryService.get(catalog.name, category?.id).pipe(
                map(categories =>
                    getCategoriesSuccess({ categories: categories })),
                catchError((error) =>
                    of(getCategoriesFailure({ error: error })))
            ))
        )
    )

    getCategoryProperties$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getCategoryProperties),
            mergeMap(({ catalog_name, category_id }) => this.categoryService.getProperties(catalog_name, category_id).pipe(
                map(response =>
                    getCategoryPropertiesSuccess({ product_detail: response })),
                catchError((error) =>
                    of(getCategoryPropertiesFailure({ error: error })))
            ))
        )
    )

    saveCategoryProperties$ = createEffect(() =>
        this.actions$.pipe(
            ofType(saveCategoryProperties),
            mergeMap(({ data }) => this.categoryService.saveProperties(data).pipe(
                map(response =>
                    saveCategoryPropertiesSuccess({ success: true })),
                catchError((error) =>
                    of(saveCategoryPropertiesFailure({ error: error })))
            ))
        )
    )

    getCategoryAssociations$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getCategoryAssociations),
            mergeMap(({ catalog_name, category_id }) => this.categoryService.getAssociations(catalog_name, category_id).pipe(
                map(response =>
                    getCategoryAssociationsSuccess({ product_association: response })),
                catchError((error) =>
                    of(getCategoryAssociationsFailure({ error: error })))
            ))
        )
    )

    getApiEnvironments$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getApiEnvironments),
            mergeMap(() => this.environmentService.getEnvVariables().pipe(
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
            mergeMap((data) => this.searchService.get(data.catalog_name, data.category_id).pipe(
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
            mergeMap((data) => this.searchService.getResult(data.searchData).pipe(
                map(response =>
                    getSearchResultSuccess({ resultList: response })),
                catchError((error) =>
                    of(getSearchResultFailure({ error: error })))
            ))
        )
    )
}
