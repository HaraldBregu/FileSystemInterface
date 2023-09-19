import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { createEffect, ofType } from "@ngrx/effects";
import {
    catchError,
    map,
    mergeMap,
    of,
    withLatestFrom,
} from "rxjs";

import { Store, select } from "@ngrx/store";
import { NetworkService } from "src/app/shared/services/network.service";
import { createVariant, createVariantFailure, createVariantSuccess, deleteVariant, deleteVariantFailure, deleteVariantSuccess, getEmptyVariant, getEmptyVariantFailure, getEmptyVariantSuccess } from "../actions/variant.actions";
import { selectEmptyProductDetail, selectedCatalogName, selectedProductId } from "../selectors";
import { ProductDetail } from "src/app/shared/interfaces/product-detail";


@Injectable()
export class VariantEffects {

    constructor(
        private store: Store,
        private actions$: Actions,
        private networkService: NetworkService) { }

    /// ON GET EMPTY VARIANT
    getEmptyVariantEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getEmptyVariant),
            withLatestFrom(
                this.store.pipe(select(selectedCatalogName)),
                this.store.pipe(select(selectedProductId)),
            ),
            mergeMap(([
                _,
                catalogName,
                productId,
            ]) => this.getEmptyVariant$(catalogName, productId!)),
        ))

    createVariantEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createVariant),
            withLatestFrom(
                this.store.pipe(select(selectEmptyProductDetail)),
            ),
            mergeMap(([
                action,
                productDetail,
            ]) => this.createVariant$({
                ...productDetail,
                properties: action.properties,
            })),
        ))

    deleteVariantEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteVariant),
            withLatestFrom(
                this.store.pipe(select(selectedCatalogName)),
                this.store.pipe(select(selectEmptyProductDetail)),
            ),
            mergeMap(([
                action,
                catalogName,
            ]) => this.deleteVariant$(catalogName, action.variantId)),
        ))

    /// UTILS
    getEmptyVariant$ = (catalogName: string, id: number) => this.networkService
        .getEmptyVariant(catalogName, id).pipe(
            map(response =>
                getEmptyVariantSuccess({ emptyProductDetail: response })),
            catchError((error) =>
                of(getEmptyVariantFailure())))

    createVariant$ = (productDetail: ProductDetail) => this.networkService
        .createVariantProperties(productDetail).pipe(
            map(response =>
                createVariantSuccess()),
            catchError((error) =>
                of(createVariantFailure())))

    deleteVariant$ = (catalogName: string, variantId: string) => this.networkService
        .deleteVariant(catalogName, variantId).pipe(
            map(response =>
                deleteVariantSuccess()),
            catchError((error) =>
                of(deleteVariantFailure())))

}
