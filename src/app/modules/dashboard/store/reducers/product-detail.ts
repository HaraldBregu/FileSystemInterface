import { createReducer, on } from "@ngrx/store";
import {
    productDetailStateFail,
    productDetailStateInitial,
    productDetailStateStart
} from "../states";
import {
    selectNavigationItem
} from "../actions/navigation.actions";
import {
    getCatalogs,
    getProductDetailFailure,
    getProductDetailSuccess,
    postProductDetail,
    postProductDetailFailure,
    postProductDetailSuccess,
    selectProduct,
    selectSearchResult,
    setProductDetailProperties,
} from "../actions/actions";
import { createVariant, createVariantFailure, createVariantSuccess, deleteVariant, deleteVariantFailure, deleteVariantSuccess, getEmptyVariant, getEmptyVariantFailure, getEmptyVariantSuccess } from "../actions/variant.actions";

export const productDetailReducer = createReducer(
    productDetailStateInitial,

    on(getCatalogs, (state) => ({
        ...productDetailStateInitial,
    })),

    on(selectProduct, (state, data) => ({
        ...productDetailStateStart,
    })),

    on(getProductDetailSuccess, (state, data) => ({
        ...productDetailStateInitial,
        productDetail: {
            ...data.productDetail,
        },
    })),

    on(getProductDetailFailure, (state, data) => ({
        ...productDetailStateFail,
    })),

    on(setProductDetailProperties, (state, data) => ({
        ...state,
        productDetail: {
            ...state.productDetail,
            properties: state.productDetail.properties
                .map(prop => {
                    const matchingObject = data.productDetailProperties.find(updatedObj => updatedObj.name === prop.name)
                    return matchingObject ? matchingObject : prop;
                })
        },
    })),

    on(postProductDetail, (state, data) => ({
        ...state,
        loading: true,
    })),

    on(postProductDetailSuccess, (state, data) => ({
        ...state,
        loading: false,
    })),

    on(postProductDetailFailure, (state, data) => ({
        ...state,
        loading: false,
    })),

    on(selectSearchResult, (state, data) => ({
        ...state,
        loading: true,
    })),

    on(getEmptyVariant, (state, data) => ({
        ...state,
        emptyProductDetailLoading: true,
    })),

    on(getEmptyVariantSuccess, (state, data) => ({
        ...state,
        emptyProductDetailLoading: false,
        emptyProductDetail: data.emptyProductDetail
    })),

    on(getEmptyVariantFailure, (state, data) => ({
        ...state,
        emptyProductDetailLoading: false,
    })),

    on(createVariant, (state) => ({
        ...state,
        loading: true,
    })),

    on(createVariantSuccess, (state) => ({
        ...state,
    })),

    on(createVariantFailure, (state) => ({
        ...state,
        loading: false,
    })),

    on(deleteVariant, (state) => ({
        ...state,
        loading: true,
    })),

    on(deleteVariantSuccess, (state) => ({
        ...state,
    })),

    on(deleteVariantFailure, (state) => ({
        ...state,
        loading: false,
    })),

)