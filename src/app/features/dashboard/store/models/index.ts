import { Product } from "src/app/shared/interfaces/product";
import { ProductDetail } from "src/app/shared/interfaces/product-detail";

export interface DashboardModel {
    loading: boolean
    catalogs: Product[]
    currentCatalog: Product | undefined
    filteredCatalogs: Product[]
    products: Product[]
    currentProduct: Product | undefined
    currentProductDetail: ProductDetail | undefined
    propertiesLoading: boolean
    error: any
    navItems: Product[]
}
