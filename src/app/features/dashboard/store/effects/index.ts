import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { createEffect, ofType } from "@ngrx/effects";
import { catchError, EMPTY, exhaustMap, map, mergeMap, of } from "rxjs";
import { CatalogService } from "src/app/shared/services/catalog.service";
import { getCatalogs, getCatalogsFailure, getCatalogsSuccess } from '../actions';


@Injectable()
export class MenuEffects {

    constructor(private actions$: Actions, private catalogService: CatalogService) {}

    catalogList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getCatalogs),
            mergeMap(() => this.catalogService.getAll().pipe(
                map(catalogs => getCatalogsSuccess({ items: catalogs })),
                catchError(async () => getCatalogsFailure)
            ))
        )
    );

}
