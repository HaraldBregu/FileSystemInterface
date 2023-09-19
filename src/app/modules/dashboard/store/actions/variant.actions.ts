import { createAction, props } from "@ngrx/store";
import { ProductDetail, ProductProperty } from "src/app/shared/interfaces/product-detail";

export enum VariantActionTypes {
    GET_EMPTY_VARIANT = '[EMPTYVARIANT][GET]',
    GET_EMPTY_VARIANT_SUCCESS = '[EMPTYVARIANT][GET] success',
    GET_EMPTY_VARIANT_FAILURE = '[EMPTYVARIANT][GET] failure',

    CREATE_VARIANT = '[CREATEVARIANT][POST]',
    CREATE_VARIANT_SUCCESS = '[CREATEVARIANT][POST] success',
    CREATE_VARIANT_FAILURE = '[CREATEVARIANT][POST] failure',

    DELETE_VARIANT = '[DELETEVARIANT][GET]',
    DELETE_VARIANT_SUCCESS = '[DELETEVARIANT][GET] success',
    DELETE_VARIANT_FAILURE = '[DELETEVARIANT][GET] failure',

}

export const getEmptyVariant = createAction(VariantActionTypes.GET_EMPTY_VARIANT)
export const getEmptyVariantSuccess = createAction(VariantActionTypes.GET_EMPTY_VARIANT_SUCCESS, props<{
    emptyProductDetail: ProductDetail
}>())
export const getEmptyVariantFailure = createAction(VariantActionTypes.GET_EMPTY_VARIANT_FAILURE)

export const createVariant = createAction(VariantActionTypes.CREATE_VARIANT, props<{
    properties: ProductProperty[]
}>())
export const createVariantSuccess = createAction(VariantActionTypes.CREATE_VARIANT_SUCCESS)
export const createVariantFailure = createAction(VariantActionTypes.CREATE_VARIANT_FAILURE)

export const deleteVariant = createAction(VariantActionTypes.DELETE_VARIANT, props<{
    variantId: string
}>())
export const deleteVariantSuccess = createAction(VariantActionTypes.DELETE_VARIANT_SUCCESS)
export const deleteVariantFailure = createAction(VariantActionTypes.DELETE_VARIANT_FAILURE)
