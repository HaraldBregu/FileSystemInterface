import { createAction, props } from "@ngrx/store";
import { ProductAssociation } from "src/app/shared/interfaces/product-association";
import { ProductDetail } from "src/app/shared/interfaces/product-detail";

export enum ProductDetailInfoActionTypes {
    GET_PRODUCT_DETAIL_INFO = '[PRODUCTDETAILINFO][GET]',
    GET_PRODUCT_DETAIL_INFO_SUCCESS = '[PRODUCTDETAILINFO][GET] success',
    GET_PRODUCT_DETAIL_INFO_FAILURE = '[PRODUCTDETAILINFO][GET] failure',
}

export const getProductDetailInfo = createAction(
    ProductDetailInfoActionTypes.GET_PRODUCT_DETAIL_INFO)

export const getProductDetailInfoSuccess = createAction(
    ProductDetailInfoActionTypes.GET_PRODUCT_DETAIL_INFO_SUCCESS,
    props<{
        productDetail: ProductDetail,
        productAssociation?: ProductAssociation
    }>())

export const getProductDetailInfoFailure = createAction(
    ProductDetailInfoActionTypes.GET_PRODUCT_DETAIL_INFO_FAILURE,
    props<{
        error: any
    }>())
