import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { createEffect, ofType } from "@ngrx/effects";
import {
    catchError,
    filter,
    map,
    mergeMap,
    of,
    withLatestFrom
} from "rxjs";
import { Store, select } from "@ngrx/store";
import { NetworkService } from "src/app/shared/services/network.service";
import { selectedCatalogName, selectedProductId } from "../selectors";
import {
    addEntity,
    addEntityFailure,
    addEntitySuccess,
    deleteEntity,
    deleteEntityFailure,
    deleteEntitySuccess,
    getDefinitionNames,
    getDefinitionNamesFailure,
    getDefinitionNamesSuccess
} from "../actions/entity.action";


@Injectable()
export class ProductEffects {

    constructor(
        private store: Store,
        private actions$: Actions,
        private networkService: NetworkService) { }

    getDefinitionNamesEffect$ = createEffect(() => this.actions$.pipe(
        ofType(getDefinitionNames),
        withLatestFrom(
            this.store.pipe(select(selectedCatalogName)),
        ),
        mergeMap(([
            action,
            catalogName,
        ]) => {
            return this.getDefinitionNames$(catalogName, action.t)
        }),
    ))

    addEntityEffect$ = createEffect(() => this.actions$.pipe(
        ofType(addEntity),
        withLatestFrom(
            this.store.pipe(select(selectedCatalogName)),
            this.store.pipe(select(selectedProductId)),
        ),
        mergeMap(([
            action,
            catalogName,
            productId,
        ]) => {
            return this.addEntity$(
                catalogName,
                action.definitionname,
                action.classtype,
                productId ?? -1,
                action.displayname)
        }),
    ))

    deleteEntityEffect$ = createEffect(() => this.actions$.pipe(
        ofType(deleteEntity),
        withLatestFrom(
            this.store.pipe(select(selectedCatalogName)),
            this.store.pipe(select(selectedProductId)),
        ),
        filter(([
            _,
            catalogName,
            productId,
        ]) => (productId !== undefined && productId !== null)),
        mergeMap(([
            action,
            catalogName,
            productId,
        ]) => this.deleteEntity$(catalogName, productId!)),
    ))

    /// UTILS
    getDefinitionNames$ = (catalogName: string, type: string) => this.networkService
        .getDefinitionNames(catalogName, type)
        .pipe(
            map((data) => getDefinitionNamesSuccess({ data: data })),
            catchError((_) => of(getDefinitionNamesFailure())))

    addEntity$ = (catalogName: string, definitionName: string, classType: string, parentoId: number, displayName: string) => this.networkService
        .addEntity(catalogName, definitionName, classType, parentoId, displayName)
        .pipe(
            map((_) => addEntitySuccess()),
            catchError((_) => of(addEntityFailure())))

    deleteEntity$ = (catalogName: string, oid: number) => this.networkService
        .deleteEntity(catalogName, oid)
        .pipe(
            map((_) => deleteEntitySuccess()),
            catchError((_) => of(deleteEntityFailure())))
}

