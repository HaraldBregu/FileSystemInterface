import { Product } from "src/app/shared/interfaces/product";
import { ProductAssociation } from "src/app/shared/interfaces/product-association";
import { ProductDetail, ProductProperty } from "src/app/shared/interfaces/product-detail";
import { SearchData } from "src/app/shared/interfaces/search-data";
import { SearchDataResult } from "src/app/shared/interfaces/search-data-result";

export interface DashboardModelState {
    loading: boolean
    catalogs: Product[]
    currentCatalog?: Product
    filteredCatalogs: Product[]
    products: Product[]
    currentProduct?: Product
    currentProductDetail?: ProductDetail
    getCurrentProductDetailLoading: boolean
    saveCurrentProductDetailLoading: boolean
    currentProductAssociation?: ProductAssociation
    error: any
    navItems: Product[]
    baseProperties: ProductProperty[]
    customProperties: ProductProperty[]
    variantProperties: ProductProperty[]
    environments: string[]
    apiEnvironment?: string
    searchData?: SearchData
    searchDataResult: SearchDataResult[]
    dashboardSideMenuOpened: boolean 
}