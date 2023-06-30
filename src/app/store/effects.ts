import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { NetworkService } from "src/app/shared/services/network.service";
import { getApiEnvironments, getApiEnvironmentsFailure, getApiEnvironmentsSuccess } from "./actions";
import { catchError, map, mergeMap, of } from "rxjs";


@Injectable()
export class AppEffects {

    constructor(
        private actions$: Actions,
        private networkService: NetworkService) { }

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

}
