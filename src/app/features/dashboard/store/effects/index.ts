import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { CatalogService } from "src/app/shared/services/catalog.service";
import { CategoryService } from "src/app/shared/services/category.service";
import { getCatalogs, getCatalogsFailure, getCatalogsSuccess, getCategories, getCategoriesFailure, getCategoriesSuccess, getSubCategories, getSubCategoriesFailure, getSubCategoriesSuccess } from '../actions';

@Injectable()
export class DashboardEffects {

    constructor(
        private actions$: Actions,
        private catalogService: CatalogService,
        private categoryService: CategoryService) { }

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
    );

    categoryList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getCategories),
            mergeMap(({ catalog_name }) => this.categoryService.get(catalog_name).pipe(
                map(categories =>
                    getCategoriesSuccess({ categories: categories })),
                catchError((error) =>
                    of(getCategoriesFailure({ error: error })))
            ))
        )
    );

    subCategoryList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getSubCategories),
            mergeMap(({ catalog_name, category_name, category_id }) => this.categoryService.get(catalog_name, category_id).pipe(
                map(categories =>
                    getSubCategoriesSuccess({ category_name, categories })),
                catchError((error) =>
                    of(getSubCategoriesFailure({ error: error })))
            ))
        )
    );
}
