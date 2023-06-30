import { Product } from "src/app/shared/interfaces/product";
import { ProductAssociation } from "src/app/shared/interfaces/product-association";
import { ProductDetail, productDetailInitial } from "src/app/shared/interfaces/product-detail";
import { SearchData } from "src/app/shared/interfaces/search-data";
import { SearchDataResult } from "src/app/shared/interfaces/search-data-result";


export interface DashboardModelState {
    /// Product State
    productState: ProductState
    /// Product Detail State
    productDetailState: ProductDetailState
    /// Product Association State
    productAssociationState: ProductAssociationState

    darkTheme: boolean

    environments: string[]
    apiEnvironment?: string
    searchData?: SearchData
    searchDataResult: SearchDataResult[]
    dashboardSideMenuOpened: boolean
}

/// Product State
export interface ProductState {
    loading: boolean
    selectedProduct: Product | undefined
    productList: Product[]
    selectedProductList: Product[]
}

export const productStateInitial: ProductState = {
    loading: false,
    productList: [],
    selectedProduct: undefined,
    selectedProductList: [],
}

export const productStateStart: ProductState = {
    loading: true,
    productList: [],
    selectedProduct: undefined,
    selectedProductList: [],
}

export const productStateFail: ProductState = {
    loading: false,
    productList: [],
    selectedProduct: undefined,
    selectedProductList: [],
}


/// Product Detail State
export interface ProductDetailState {
    loading: boolean
    currentProductDetail?: ProductDetail
    updatedProductDetail: ProductDetail
}

export const productDetailStateInitial: ProductDetailState = {
    loading: false,
    currentProductDetail: undefined,
    updatedProductDetail: productDetailInitial,
}

export const productDetailStateStart: ProductDetailState = {
    ...productDetailStateInitial,
    loading: true
}

export const productDetailStateFail: ProductDetailState = {
    ...productDetailStateInitial,
    loading: false
}


/// Product Association State
export interface ProductAssociationState {
    loading: boolean
    currentProductAssociation?: ProductAssociation
    updatedProductAssociation?: ProductAssociation
}

export const productAssociationStateInitial: ProductAssociationState = {
    loading: false,
    currentProductAssociation: undefined,
    updatedProductAssociation: undefined
}

export const productAssociationStateStart: ProductAssociationState = {
    loading: true,
}

export const productAssociationStateFail: ProductAssociationState = {
    loading: false,
    currentProductAssociation: undefined,
    updatedProductAssociation: undefined
}
