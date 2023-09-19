import { createReducer, on } from "@ngrx/store";
import {
    productAssociationStateFail,
    productAssociationStateInitial,
    productAssociationStateStart
} from "../states";
import { selectNavigationItem } from "../actions/navigation.actions";
import { ProductType } from "src/app/shared/enums/product-type";
import {
    getCatalogs,
    getProductAssociation,
    getProductAssociationFailure,
    getProductAssociationSuccess,
    postProductAssociation,
    postProductAssociationFailure,
    postProductAssociationSuccess,
    selectProduct,
    selectSearchResult,
    setProductAssociation,
    setProductAssociationPrimaryCategory
} from "../actions/actions";
import {
    ProductAssociation,
    productAssociationInitial
} from "src/app/shared/interfaces/product-association";

export const productAssociationReducer = createReducer(
    productAssociationStateInitial,

    on(selectNavigationItem, (state, data) => ({
        ...productAssociationStateStart,
        loading: data.item.type === ProductType.Catalog ? false : true
    })),

    on(getCatalogs, (state) => ({
        ...productAssociationStateInitial,
    })),

    on(selectProduct, (state, data) => ({
        ...productAssociationStateStart,
        loading: data.product.type === ProductType.Catalog ? false : true
    })),

    on(getProductAssociation, (state, data) => ({
        ...productAssociationStateStart,
    })),

    on(getProductAssociationSuccess, (state, data) => {

        return  {
            ...productAssociationStateInitial,
            
            productAssociation: data.productAssociation,
        }
    }),

    

    on(getProductAssociationFailure, (state, data) => ({
        ...productAssociationStateFail,
    })),

    on(setProductAssociation, (state, data) => ({
        ...state,
        productAssociation: data.productAssociation,
    })),

    on(setProductAssociationPrimaryCategory, (state, data) => ({
        ...state,
        productAssociation: {
            ...state.productAssociation,
            primarycategory: data.primaryCategory
        }
    })),

    on(postProductAssociation, (state, data) => ({
        ...state,
        loading: true,
    })),

    on(postProductAssociationSuccess, (state) => {

        const updatedData = state.productAssociation
        var newProductAssociation: ProductAssociation | undefined = undefined

        newProductAssociation = {
            ...updatedData,
            parentcategories: updatedData.parentcategories
                .filter(data => data.status !== 'D')
                .map(data => ({ ...data, status: "" })),
            childcategories: updatedData.childcategories
                .filter(data => data.status !== 'D')
                .map(data => ({ ...data, status: "" })),
            products: updatedData.products
                .filter(data => data.status !== 'D')
                .map(data => ({ ...data, status: "" }))
        }

        return {
            ...state,
            productAssociation: newProductAssociation,
            loading: false,
        }
    }),

    on(postProductAssociationFailure, (state, data) => ({
        ...state,
        loading: false,
    })),

    on(selectSearchResult, (state, data) => ({
        ...state,
        loading: true,
    })),

)