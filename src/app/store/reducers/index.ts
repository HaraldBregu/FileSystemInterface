import { createReducer, on } from "@ngrx/store";
import { ProductType } from "src/app/shared/enums/product-type";
import {
    clearNavItems,
    getApiEnvironments,
    getApiEnvironmentsFailure,
    getApiEnvironmentsSuccess,
    getCatalogs,
    getCatalogsFailure,
    getCatalogsSuccess,
    getProductAssociation,
    getProductAssociationFailure,
    getProductAssociationSuccess,
    getProductDetail,
    getProductDetailFailure,
    getProductDetailSuccess,
    getProducts,
    getProductsFailure,
    getProductsSuccess,
    getSearchFilters,
    getSearchFiltersFailure,
    getSearchFiltersOfSelectedProduct,
    getSearchFiltersSuccess,
    getSearchResult,
    getSearchResultFailure,
    getSearchResultSuccess,
    postProductAssociation,
    postProductAssociationFailure,
    postProductAssociationSuccess,
    postProductDetail,
    postProductDetailFailure,
    postProductDetailSuccess,
    selectProduct,
    setApiEnv,
    setProductAssociation,
    setProductDetailProperties,
    toggleDashboardSideMenu,
    toggleTheme,
} from "../actions";
import {
    DashboardModelState,
    productAssociationStateFail,
    productAssociationStateInitial,
    productAssociationStateStart,
    productDetailStateFail,
    productDetailStateInitial,
    productDetailStateStart,
    productStateFail,
    productStateInitial,
    productStateStart
} from "../models";
import Utils from "src/app/core/utils";
import { productDetailInitial } from "src/app/shared/interfaces/product-detail";

const initialState: DashboardModelState = {
    productState: productStateInitial,
    productDetailState: { ...productDetailStateInitial },
    productAssociationState: { ...productAssociationStateInitial },

    darkTheme: false,
    apiEnvironment: "",

    environments: [],
    searchData: undefined,
    searchDataResult: [],
    dashboardSideMenuOpened: false
}

export const dashboardReducer = createReducer(
    initialState,

    on(toggleTheme, (state: DashboardModelState) => ({
        ...state,
        darkTheme: !state.darkTheme,
    })),
    on(setApiEnv, (state: DashboardModelState, data) => ({
        ...state,
        apiEnvironment: data.environment,
    })),

    
    /// CATALOGS 
    
    on(getCatalogs, (state: DashboardModelState) => {
        console.log("getCatalogs")

        return {
            ...state,
            productState: { ...productStateStart },
            productDetailState: { ...productDetailStateInitial },
            productAssociationState: { ...productAssociationStateInitial },
        }
    }),

    on(getCatalogsSuccess, (state: DashboardModelState, data) => {
        console.log("getCatalogsSuccess")

        return {
            ...state,
            productState: {
                ...productStateInitial,
                loading: false,
                productList: data.productList.map((v) => ({ ...v, type: ProductType.Catalog })),
            }
        }
    }),

    on(getCatalogsFailure, (state: DashboardModelState, data) => {
        console.log("getCatalogsFailure")

        return {
            ...state,
            productState: productStateFail,
        }
    }),

    /// Select Product

    on(selectProduct, (state: DashboardModelState, data) => ({
        ...state,
        productState: {
            ...productStateStart,
            selectedProduct: data.product,
            selectedProductList: Utils.updateCategoryNavItems(state, data.product),
            productList: [],
        },
        productDetailState: { ...productDetailStateStart },
        productAssociationState: { ...productAssociationStateStart },
    })),

    on(getProducts, (state: DashboardModelState) => ({
        ...state,
    })),

    on(getProductsSuccess, (state: DashboardModelState, data) => {
console.log("getProductsSuccess")
        return {
            ...state,
            productState: {
                ...state.productState,
                productList: data.products,
                loading: false,
            },
        }
    }),

    on(getProductsFailure, (state: DashboardModelState, data) => {
        console.log("getProductsFailure")

        return {
            ...state,
            productState: {
                ...productStateFail,
            },
        }
    }),

    /// PRODUCT DETAIL

    on(getProductDetail, (state: DashboardModelState, data) => ({
        ...state,
        productDetailState: { ...productDetailStateStart },
    })),

    on(getProductDetailSuccess, (state: DashboardModelState, data) => ({
        ...state,
        productDetailState: {
            ...productDetailStateInitial,
            currentProductDetail: {
                ...data.productDetail
            },
            updatedProductDetail: {
                ...data.productDetail
            },
        },
    })),

    on(getProductDetailFailure, (state: DashboardModelState, data) => ({
        ...state,
        productDetailState: { ...productDetailStateFail },
    })),

    on(setProductDetailProperties, (state: DashboardModelState, data) => ({
        ...state,
        productDetailState: {
            ...state.productDetailState,
            updatedProductDetail: {
                ...state.productDetailState.updatedProductDetail,
                properties: state.productDetailState.updatedProductDetail.properties
                    .map(prop => {
                        const matchingObject = data.productDetailProperties.find(updatedObj => updatedObj.name === prop.name)
                        return matchingObject ? matchingObject : prop;
                    })
            }
        }
    })),

    on(postProductDetail, (state: DashboardModelState, data) => {
        console.log("postProductDetail")

        return {
            ...state,
            productDetailState: {
                ...state.productDetailState,
                loading: true,
            },
        }    
    }),

    on(postProductDetailSuccess, (state: DashboardModelState, data) => {
        console.log("postProductDetailSuccess")

        return {
            ...state,
            
            productDetailState: {
                ...state.productDetailState,
                loading: false,
                currentProductDetail: state.productDetailState.updatedProductDetail,
            },  
        }
    }),

    on(postProductDetailFailure, (state: DashboardModelState, data) => {
console.log("postProductDetailFailure")
        return {
            ...state,
            productDetailState: {
                ...state.productDetailState,
                loading: false,
            },
        }
    }),

    /// ASSOCIATION 

    on(getProductAssociation, (state: DashboardModelState, data) => ({
        ...state,
        productAssociationState: productAssociationStateStart,
    })),

    on(getProductAssociationSuccess, (state: DashboardModelState, data) => ({
        ...state,
        productAssociationState: {
            ...productAssociationStateInitial,
            currentProductAssociation: data.productAssociation,
            updatedProductAssociation: data.productAssociation
        }
    })),

    on(getProductAssociationFailure, (state: DashboardModelState, data) => ({
        ...state,
        productAssociationState: productAssociationStateFail
    })),

    on(setProductAssociation, (state: DashboardModelState, data) => ({
        ...state,
        productAssociationState: {
            ...state.productAssociationState,
            //currentProductAssociation: state.productAssociationState.currentProductAssociation,
            updatedProductAssociation: data.productAssociation
        }
    })),

    on(postProductAssociation, (state: DashboardModelState, data) => ({
        ...state,
        productAssociationState: {
            ...state.productAssociationState,
            loading: true,
        },
    })),

    on(postProductAssociationSuccess, (state: DashboardModelState, data) => ({
        ...state,
        productAssociationState: {
            ...state.productAssociationState,
            currentProductAssociation: state.productAssociationState.updatedProductAssociation,
            loading: false,
        },
    })),

    on(postProductAssociationFailure, (state: DashboardModelState, data) => ({
        ...state,
        productAssociationState: {
            ...state.productAssociationState,
            loading: false,
        },
    })),

    /*
    on(updateAssociation, (state: DashboardModelState, data) => ({
        ...state,
        productAssociationState: {
            ...state.productAssociationState,
            currentProductAssociation: state.productAssociationState.currentProductAssociation,
            updatedProductAssociation: data.productAssociation
        }
    })),*/



    /// UPDATE PROPERTIES




    /// API ENV

    on(getApiEnvironments, (state: DashboardModelState) => ({
        ...state,
        darkTheme: state.darkTheme
    })),

    on(getApiEnvironmentsSuccess, (state: DashboardModelState, data) => ({
        ...state,
        environments: data.environments
    })),

    on(getApiEnvironmentsFailure, (state: DashboardModelState, data) => ({
        ...state,
        environments: []
    })),

    on(getSearchFilters, (state: DashboardModelState) => ({
        ...state,
        searchData: undefined,
        searchDataResult: []
    })),

    on(getSearchFiltersSuccess, (state: DashboardModelState, data) => ({
        ...state,
        searchData: data.searchData,
    })),

    on(getSearchFiltersFailure, (state: DashboardModelState, data) => ({
        ...state,
        searchData: undefined
    })),

    on(getSearchFiltersOfSelectedProduct, (state: DashboardModelState) => ({
        ...state,
        searchData: undefined,
        searchDataResult: []
    })),

    on(getSearchResult, (state: DashboardModelState, data) => ({
        ...state,
        searchData: data.searchData,
        searchDataResult: []
    })),

    on(getSearchResultSuccess, (state: DashboardModelState, data) => ({
        ...state,
        searchDataResult: data.resultList
    })),

    on(getSearchResultFailure, (state: DashboardModelState, data) => ({
        ...state,
        searchDataResult: []
    })),

    on(toggleDashboardSideMenu, (state: DashboardModelState) => ({
        ...state,
        dashboardSideMenuOpened: !state.dashboardSideMenuOpened
    })),

    on(clearNavItems, (state: DashboardModelState) => ({
        ...state,
        selectedProductList: [],
        currentCatalog: undefined,
        products: [],
        currentProduct: undefined
    })),

)