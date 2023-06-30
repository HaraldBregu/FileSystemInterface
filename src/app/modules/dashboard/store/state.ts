import { ProductType } from "src/app/shared/enums/product-type";
import { NavigationItem } from "src/app/shared/interfaces/navigation-item";
import { Product } from "src/app/shared/interfaces/product";
import { ProductAssociation, productAssociationInitial } from "src/app/shared/interfaces/product-association";
import { ProductDetail, productDetailInitial } from "src/app/shared/interfaces/product-detail";
import { SearchData, searchDataInitial } from "src/app/shared/interfaces/search-data";
import { SearchDataResult } from "src/app/shared/interfaces/search-data-result";

export interface DashboardState {
    dashboardSideMenuOpened: boolean

    /// Product State
    productState: ProductState
    /// Product Detail State
    productDetailState: ProductDetailState
    /// Product Association State
    productAssociationState: ProductAssociationState
    /// Search Data State
    searchDataState: SearchDataState
}

/// Product State
export interface ProductState {
    loading: boolean
    //selectedProduct: Product | undefined
    catalogName: string
    productId?: number 
    productName: string 
    productType: ProductType
    productList: Product[]
    //selectedProductList: Product[] // Nav items
    navigationItems: NavigationItem[]
    productDetailTabs: string[]
}

export const productStateInitial: ProductState = {
    loading: false,
    productList: [],
    catalogName: "",
    productId: undefined,
    productName: "",
    productType: ProductType.Catalog,
    navigationItems: [],
    productDetailTabs: [],
}

export const productStateStart: ProductState = {
    loading: true,
    productList: [],
    catalogName: "",
    productId: undefined,
    productName: "",
    productType: ProductType.Catalog,
    navigationItems: [],
    productDetailTabs: [],
}

export const productStateFail: ProductState = {
    loading: false,
    productList: [],
    catalogName: "",
    productId: undefined,
    productName: "",
    productType: ProductType.Catalog,
    navigationItems: [],
    productDetailTabs: [],
}

/// Product Detail State
export interface ProductDetailState {
    loading: boolean
    productDetail: ProductDetail
}

export const productDetailStateInitial: ProductDetailState = {
    loading: false,
    productDetail: productDetailInitial,
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
    productAssociation: ProductAssociation
}

export const productAssociationStateInitial: ProductAssociationState = {
    loading: false,
    productAssociation: productAssociationInitial
}

export const productAssociationStateStart: ProductAssociationState = {
    loading: true,
    productAssociation: productAssociationInitial
}

export const productAssociationStateFail: ProductAssociationState = {
    loading: false,
    productAssociation: productAssociationInitial
}

/// Search Data State

export interface SearchDataState {
    loading: boolean
    searchData: SearchData
    searchDataResult: SearchDataResult[]
    searchDataSelectedResult: SearchDataResult | undefined
}

export const searchDataStateInitial: SearchDataState = {
    loading: false,
    searchData: searchDataInitial,
    searchDataResult: [],
    searchDataSelectedResult: undefined,
}