import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { createEffect, ofType } from "@ngrx/effects";
import {
    catchError,
    map,
    mergeMap,
    of,
} from "rxjs";
import {
    getCatalogs,
    getCatalogsFailure,
    getCatalogsSuccess,
} from '../actions/actions';
import { Store } from "@ngrx/store";
import { NetworkService } from "src/app/shared/services/network.service";
import { setApiEnv } from "src/app/store/actions";

@Injectable()
export class CatalogEffects {

    constructor(
        private store: Store,
        private actions$: Actions,
        private networkService: NetworkService) { }

    catalogList$ = createEffect(() => this.actions$.pipe(
        ofType(getCatalogs),
        mergeMap(() => this.getCatalogList$())))

    catalogListOnChangeEnv$ = createEffect(() => this.actions$.pipe(
        ofType(setApiEnv),
        mergeMap(() => this.getCatalogList$())))

    /// UTILS
    getCatalogList$ = () => this.networkService.getCatalogs().pipe(
        map(dataList => {
            return getCatalogsSuccess({ productList: dataList })
        }),
        catchError((error) =>
            of(getCatalogsFailure({ error: error })))
    )
}
