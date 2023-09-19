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
import { deleteRoleRegistryById, deleteRoleRegistryByIdFailure, deleteRoleRegistryByIdSuccess, getPartnerRoles, getRoleRegistry, getRoleRegistryById, getRoleRegistryByIdFailure, getRoleRegistryByIdSuccess, getRoleRegistryFailure, getRoleRegistrySuccess, getRolesFailure, getRolesSuccess, getSearchRoles, saveRoleRegistry, saveRoleRegistryFailure, saveRoleRegistrySuccess, updateRoleRegistry, updateRoleRegistryFailure, updateRoleRegistrySuccess } from "../actions";
import { PartnerRole } from "src/app/shared/interfaces/partner-role";

@Injectable()
export class RoleEffects {

    constructor(
        private store: Store,
        private actions$: Actions,
        private networkService: NetworkService) { }

    getSearchRolesEffect$ = createEffect(() => this.actions$.pipe(
        ofType(getSearchRoles),
        mergeMap(() => this.getPartnerRoles$('S'))
    ))

    getPartnerRolesEffect$ = createEffect(() => this.actions$.pipe( // D
        ofType(getPartnerRoles),
        mergeMap(() => this.getPartnerRoles$('D'))
    ))

    getRoleRegistryEffect$ = createEffect(() => this.actions$.pipe(
        ofType(getRoleRegistry),
        mergeMap(() => this.getRoleRegistry$())
    ))

    getRoleRegistryOnUpdateSuccessEffect$ = createEffect(() => this.actions$.pipe(
        ofType(updateRoleRegistrySuccess),
        mergeMap(() => this.getRoleRegistry$())
    ))

    getRoleRegistryOnSaveSuccessEffect$ = createEffect(() => this.actions$.pipe(
        ofType(saveRoleRegistrySuccess),
        mergeMap(() => this.getRoleRegistry$())
    ))

    getRoleRegistryOnDeleteSuccessEffect$ = createEffect(() => this.actions$.pipe(
        ofType(deleteRoleRegistryByIdSuccess),
        mergeMap(() => this.getRoleRegistry$())
    ))

    getRoleRegistryByIdEffect$ = createEffect(() => this.actions$.pipe(
        ofType(getRoleRegistryById),
        mergeMap((action) => this.getRoleRegistryById$(action.roleId))
    ))
    
    updateRoleRegistryEffect$ = createEffect(() => this.actions$.pipe(
        ofType(updateRoleRegistry),
        mergeMap((action) => this.updatePartnerRole$(action.role))
    ))

    saveRoleRegistryEffect$ = createEffect(() => this.actions$.pipe(
        ofType(saveRoleRegistry),
        mergeMap((action) => this.createPartnerRole$(action.role))
    ))
    
    deleteRoleRegistryByIdEffect$ = createEffect(() => this.actions$.pipe(
        ofType(deleteRoleRegistryById),
        mergeMap((action) => this.deleteRoleRegistryById$(action.roleId))
    ))

    /// UTILS

    getPartnerRoles$ = (type: string) => this.networkService.getPartnerRoles(type).pipe(
        map(result =>
            getRolesSuccess({ roles: result })),
        catchError((error) =>
            of(getRolesFailure())))

    getRoleRegistry$ = () => this.networkService.getRolesRegistry().pipe(
        map(result =>
            getRoleRegistrySuccess({ roles: result })),
        catchError((error) =>
            of(getRoleRegistryFailure())))

    getRoleRegistryById$ = (roleId: string) => this.networkService.getPartnerRoleById(roleId).pipe(
        map(result =>
            getRoleRegistryByIdSuccess({ role: result })),
        catchError((error) =>
            of(getRoleRegistryByIdFailure())))

    deleteRoleRegistryById$ = (roleId: string) => this.networkService.deleteRoleRegistryById(roleId).pipe(
        map(result =>
            deleteRoleRegistryByIdSuccess()),
        catchError((error) =>
            of(deleteRoleRegistryByIdFailure())))

    createPartnerRole$ = (role: PartnerRole) => this.networkService.createPartnerRole(role).pipe(
        map(result =>
            saveRoleRegistrySuccess()),
        catchError((error) =>
            of(saveRoleRegistryFailure())))

    updatePartnerRole$ = (role: PartnerRole) => this.networkService.updatePartnerRole(role).pipe(
        map(result =>
            updateRoleRegistrySuccess()),
        catchError((error) =>
            of(updateRoleRegistryFailure())))

}
