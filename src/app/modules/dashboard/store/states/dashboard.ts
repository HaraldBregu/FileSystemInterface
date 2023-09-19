import {
    ProductAssociationState,
    ProductDetailState,
    ProductState,
    SearchDataState,
} from "./state"

export interface DashboardState {
    productState: ProductState
    productDetailState: ProductDetailState
    productAssociationState: ProductAssociationState
    searchDataState: SearchDataState
}
