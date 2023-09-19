import { Injectable } from "@angular/core";
import { Actions, act } from "@ngrx/effects";
import { createEffect, ofType } from "@ngrx/effects";
import {
    catchError,
    map,
    mergeMap,
    of,
} from "rxjs";
import { NetworkService } from "src/app/shared/services/network.service";
import {
    deletePartnerOperationById,
    deletePartnerOperationByIdFailure,
    deletePartnerOperationByIdSuccess,
    getPartnerOperationById,
    getPartnerOperationByIdFailure,
    getPartnerOperationByIdSuccess,
    getPartnerOperations,
    getPartnerOperationsFailure,
    getPartnerOperationsSuccess,
    savePartnerOperation,
    savePartnerOperationFailure,
    savePartnerOperationSuccess,
} from "../actions";
import { PartnerOperation } from "src/app/shared/interfaces/partner-operation";

@Injectable()
export class OperationsEffects {

    constructor(
        private actions$: Actions,
        private networkService: NetworkService) { }
        
    getPartnerOperationsEffect$ = createEffect(() => this.actions$.pipe(
        ofType(getPartnerOperations),
        mergeMap((action) => this.getPartnerOperations$())
    ))

    getPartnerOperationsOnSavePartnerSuccessEffect$ = createEffect(() => this.actions$.pipe(
        ofType(savePartnerOperationSuccess),
        mergeMap((action) => this.getPartnerOperations$())
    ))

    getPartnerOperationsOnDeletePartnerSuccessEffect$ = createEffect(() => this.actions$.pipe(
        ofType(deletePartnerOperationByIdSuccess),
        mergeMap((action) => this.getPartnerOperations$())
    ))

    getPartnerOperationByIdEffect$ = createEffect(() => this.actions$.pipe(
        ofType(getPartnerOperationById),
        mergeMap((action) => this.getPartnerOperationById$(action.operationId))
    ))

    deletePartnerOperationByIdEffect$ = createEffect(() => this.actions$.pipe(
        ofType(deletePartnerOperationById),
        mergeMap((action) => this.deletePartnerOperationById$(action.operationId))
    ))

    savePartnerOperationEffect$ = createEffect(() => this.actions$.pipe(
        ofType(savePartnerOperation),
        mergeMap((action) => this.savePartnerOperation$(action.operation))
    ))

    /// UTILS

    getPartnerOperations$ = () => this.networkService.getPartnerOperations().pipe(
        map(result =>
            getPartnerOperationsSuccess({ operations: result })),
        catchError((error) =>
            of(getPartnerOperationsFailure())))

    getPartnerOperationById$ = (operationId: string) => this.networkService.getPartnerOperationById(operationId).pipe(
        map(result =>
            getPartnerOperationByIdSuccess({ operation: result })),
        catchError((error) =>
            of(getPartnerOperationByIdFailure())))

    deletePartnerOperationById$ = (operationId: string) => this.networkService.deletePartnerOperationById(operationId).pipe(
        map(result =>
            deletePartnerOperationByIdSuccess()),
        catchError((error) =>
            of(deletePartnerOperationByIdFailure())))

    savePartnerOperation$ = (operation: PartnerOperation) => this.networkService.savePartnerOperation(operation).pipe(
        map(result =>
            savePartnerOperationSuccess()),
        catchError((error) =>
            of(savePartnerOperationFailure())))
}
