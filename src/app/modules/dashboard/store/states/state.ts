import { ProductType } from "src/app/shared/enums/product-type";
import { DefinitionName } from "src/app/shared/interfaces/definition-name";
import { NavigationItem } from "src/app/shared/interfaces/navigation-item";
import { Product } from "src/app/shared/interfaces/product";
import { ProductAssociation, productAssociationInitial } from "src/app/shared/interfaces/product-association";
import { ProductDetail, productDetailInitial } from "src/app/shared/interfaces/product-detail";
import { SearchData, searchDataInitial } from "src/app/shared/interfaces/search-data";
import { SearchDataResult } from "src/app/shared/interfaces/search-data-result";


export interface ProductState {
    loading: boolean
    catalogName: string
    productId?: number
    productName: string
    productType: ProductType
    productList: Product[]
    navigationItems: NavigationItem[]
    productDetailTabs: string[]
    definitionNames: DefinitionName[]
}

export const productStateInitial: ProductState = {
    loading: false,
    productList: [],
    catalogName: "",
    productId: undefined,
    productName: "",
    productType: ProductType.None,
    navigationItems: [],
    productDetailTabs: [],
    definitionNames: [],
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
    definitionNames: [],
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
    definitionNames: [],
}

/// Product Detail State
export interface ProductDetailState {
    loading: boolean
    productDetail: ProductDetail,
    emptyProductDetailLoading: boolean
    emptyProductDetail: ProductDetail,
}

export const productDetailStateInitial: ProductDetailState = {
    loading: false,
    productDetail: productDetailInitial,
    emptyProductDetailLoading: false,
    emptyProductDetail: productDetailInitial,
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