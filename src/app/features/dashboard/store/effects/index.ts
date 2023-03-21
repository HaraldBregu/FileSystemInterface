import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { createEffect, ofType } from "@ngrx/effects";
import { catchError, EMPTY, exhaustMap, map, mergeMap, of } from "rxjs";
import { CatalogService } from "src/app/shared/services/catalog.service";
import { CategoryService } from "src/app/shared/services/category.service";
import { getCatalogs, getCatalogsFailure, getCatalogsSuccess, getCategories, getCategoriesFailure, getCategoriesSuccess } from '../actions';


@Injectable()
export class MenuEffects {

    constructor(
        private actions$: Actions,
        private catalogService: CatalogService,
        private categoryService: CategoryService) { }

    catalogList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getCatalogs),
            mergeMap(() => this.catalogService.getAll().pipe(
                map(catalogs => getCatalogsSuccess({ catalogs: catalogs })),
                catchError(async () => getCatalogsFailure)
            ))
        )
    );

    categoryList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getCategories),
            mergeMap(({catalog_name}) => this.categoryService.get(catalog_name).pipe(
                map(categories => getCategoriesSuccess({ categories: categories })),
                catchError(async () => getCategoriesFailure)
            ))
        )
    );

}
