import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { createEffect, ofType } from "@ngrx/effects";
import {
    catchError,
    map,
    mergeMap,
    of,
} from "rxjs";
import { Store } from "@ngrx/store";
import { NetworkService } from "src/app/shared/services/network.service";
import { getPartnerRoles, getRolesFailure, getRolesSuccess, getSearchRoles } from "../actions";

@Injectable()
export class RoleEffects {

    constructor(
        private store: Store,
        private actions$: Actions,
        private networkService: NetworkService) { }

    getSearchRoles$ = createEffect(() => this.actions$.pipe(
        ofType(getSearchRoles),
        mergeMap(() => this.networkService.getPartnerRoles("S").pipe(
            map(result =>
                getRolesSuccess({ roles: result })),
            catchError((error) =>
                of(getRolesFailure()))
        ))))

    getPartnerRoles$ = createEffect(() => this.actions$.pipe(
        ofType(getPartnerRoles),
        mergeMap(() => this.networkService.getPartnerRoles("D").pipe(
            map(result =>
                getRolesSuccess({ roles: result })),
            catchError((error) =>
                of(getRolesFailure()))
        ))))
}
