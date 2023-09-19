import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { createEffect, ofType } from "@ngrx/effects";
import {
    catchError,
    map,
    mergeMap,
    of,
} from "rxjs";
import { NetworkService } from "src/app/shared/services/network.service";
import { deletePartnerRoleOperationById, deletePartnerRoleOperationByIdFailure, deletePartnerRoleOperationByIdSuccess, getPartnerRoleOperations, getPartnerRoleOperationsById, getPartnerRoleOperationsByIdFailure, getPartnerRoleOperationsByIdSuccess, getPartnerRoleOperationsFailure, getPartnerRoleOperationsSuccess, savePartnerRoleOperation, savePartnerRoleOperationSuccess } from "../actions/role-operation";
import { PartnerRoleOperation } from "src/app/shared/interfaces/partner-role-operation";
import { savePartnerOperationFailure } from "../actions";

@Injectable()
export class RoleOperationsEffects {

    constructor(
        private actions$: Actions,
        private networkService: NetworkService) { }

    getPartnerRoleOperationsEffect$ = createEffect(() => this.actions$.pipe(
        ofType(getPartnerRoleOperations),
        mergeMap(() => this.getPartnerRoleOperation$())
    ))

    getPartnerRoleOperationsOnDeleteSuccessEffect$ = createEffect(() => this.actions$.pipe(
        ofType(deletePartnerRoleOperationByIdSuccess),
        mergeMap(() => this.getPartnerRoleOperation$())
    ))

    getPartnerRoleOperationsOnSaveSuccessEffect$ = createEffect(() => this.actions$.pipe(
        ofType(savePartnerRoleOperationSuccess),
        mergeMap(() => this.getPartnerRoleOperation$())
    ))

    getPartnerRoleOperationByIdEffect$ = createEffect(() => this.actions$.pipe(
        ofType(getPartnerRoleOperationsById),
        mergeMap((action) => this.getPartnerRoleOperationById$(action.id))
    ))

    savePartnerRoleOperationEffect$ = createEffect(() => this.actions$.pipe(
        ofType(savePartnerRoleOperation),
        mergeMap((action) => this.savePartnerRoleOperation$(action.roleOperation))
    ))

    deletePartnerRoleOperationByIdEffect$ = createEffect(() => this.actions$.pipe(
        ofType(deletePartnerRoleOperationById),
        mergeMap((action) => this.deletePartnerRoleOperationById$(action.id))
    ))

    /// UTILS

    getPartnerRoleOperation$ = () => this.networkService.getPartnerRoleOperations().pipe(
        map(result =>
            getPartnerRoleOperationsSuccess({ roleOperations: result })),
        catchError((_) =>
            of(getPartnerRoleOperationsFailure())))

    getPartnerRoleOperationById$ = (id: string) => this.networkService.getPartnerRoleOperationById(id).pipe(
        map(result =>
            getPartnerRoleOperationsByIdSuccess({ roleOperation: result })),
        catchError((error) =>
            of(getPartnerRoleOperationsByIdFailure())))

    savePartnerRoleOperation$ = (roleOperation: PartnerRoleOperation) => this.networkService.savePartnerRoleOperation(roleOperation).pipe(
        map(result =>
            savePartnerRoleOperationSuccess()),
        catchError((error) =>
            of(savePartnerOperationFailure())))

    deletePartnerRoleOperationById$ = (id: string) => this.networkService.deletePartnerRoleOperationById(id).pipe(
        map(_ =>
            deletePartnerRoleOperationByIdSuccess()),
        catchError((error) =>
            of(deletePartnerRoleOperationByIdFailure())))

}
