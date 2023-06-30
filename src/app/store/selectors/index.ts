import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DashboardModelState } from "../models";
import { ProductType } from "src/app/shared/enums/product-type";


export const DASHBOARD_SELECTOR = "DASHBOARD_SELECTOR_ID"

const dashboardFeature = createFeatureSelector<DashboardModelState>(DASHBOARD_SELECTOR)

export const dashboardDataSelector = createSelector(dashboardFeature, (dashboard: DashboardModelState) => {
    return dashboard
})

export const currentSelectedProduct = createSelector(
    dashboardFeature,
    (state: DashboardModelState) => ({
        isCatalog: (state.productState.selectedProductList.at(-1)?.type == ProductType.Catalog),
        catalog_name: (state.productState.selectedProduct) ? state.productState.selectedProduct.name : '',
        product_id: (state.productState.selectedProduct) ? state.productState.selectedProduct.id : 0
    })
)

export const updatedAssociationProduct = createSelector(
    dashboardFeature,
    (state: DashboardModelState) => ({
        association: state.productAssociationState.updatedProductAssociation!,
    })
)

export const selectedCatalog = createSelector(
    dashboardFeature,
    (state: DashboardModelState) => ({
        selectedProduct: state.productState.selectedProductList[0],
    })
)

export const selectedProductIsCatalog = createSelector(
    dashboardFeature,
    (state: DashboardModelState) => (state.productState.selectedProduct?.type === ProductType.Catalog)
)

export const selectedCatalogName = createSelector(
    dashboardFeature,
    (state: DashboardModelState) => {
        const list = state.productState.selectedProductList
        const firstProduct = list[0]
        return {
            catalogName: firstProduct?.name,
        }
    }
)

export const productList = createSelector(
    dashboardFeature,
    (state: DashboardModelState) => {
        return state.productState.productList
    }
)

export const productListCount = createSelector(
    dashboardFeature,
    (state: DashboardModelState) => {
        return state.productState.productList.length
    }
)

export const productListIsEmpty = createSelector(
    dashboardFeature,
    (state: DashboardModelState) => {
        return state.productState.productList.length === 0
    }
)


export const selectedProductList = createSelector(
    dashboardFeature,
    (state: DashboardModelState) => {
        return state.productState.selectedProductList
    }
)

export const productLoading = createSelector(
    dashboardFeature,
    (state: DashboardModelState) => {
        return state.productState.loading
    }
)

export const selectedProductId = createSelector(
    dashboardFeature,
    (state: DashboardModelState) => {
        const list = state.productState.selectedProductList

        //console.log(JSON.stringify(list))
        const lastProduct = list.at(-1)
        if (list.length > 1 && lastProduct !== null && lastProduct?.type !== ProductType.Catalog) {
            return {
                productId: lastProduct?.id,
            }
        }

        return { productId: undefined }
    }
)

export const isCatalogList = createSelector(
    dashboardFeature,
    (state: DashboardModelState) => (state.productState.selectedProductList.length === 0)
)

export const currentProduct = createSelector(
    dashboardFeature,
    (state: DashboardModelState) => (state.productState.selectedProduct)
)

export const currentProductDetail = createSelector(
    dashboardFeature,
    (state: DashboardModelState) => (state.productDetailState.currentProductDetail)
)

export const currentProductDetailLoading = createSelector(
    dashboardFeature,
    (state: DashboardModelState) => (state.productDetailState.loading)
)

export const updatedProductDetail = createSelector(
    dashboardFeature,
    (state: DashboardModelState) => (state.productDetailState.updatedProductDetail)
)

export const updatedProductAssociation = createSelector(
    dashboardFeature,
    (state: DashboardModelState) => (state.productAssociationState.updatedProductAssociation)
)


export const currentProductAssociation = createSelector(
    dashboardFeature,
    (state: DashboardModelState) => (state.productAssociationState.currentProductAssociation)
)

export const currentProductAssociationLoading = createSelector(
    dashboardFeature,
    (state: DashboardModelState) => (state.productAssociationState.loading)
)

export const currentProductDetailAssociation = createSelector(
    dashboardFeature,
    currentProductDetail,
    currentProductAssociation,
    (state, productDetail, productAssociation) => ({
        currentProductDetail: productDetail,
        currentProductAssociation: productAssociation
    })
)

export const currentProductIsCatalog = createSelector(
    dashboardFeature,
    (state: DashboardModelState) => (state.productState.selectedProduct?.type === ProductType.Catalog)
)


export const currentProductDetailAssociationLoading = createSelector(
    dashboardFeature,
    currentProductDetailLoading,
    currentProductAssociationLoading,
    currentProductIsCatalog,
    (state, productDetailLoading, productAssociationLoading, iscatalog) =>
        ((iscatalog && productDetailLoading) || (!iscatalog && (productDetailLoading && productAssociationLoading)))
)

export const currentProductDetailBaseProperties = createSelector(
    dashboardFeature,
    currentProductDetail,
    (state: DashboardModelState, productDetail) => ({
        properties: productDetail?.properties,
        baseProperties: productDetail?.properties?.filter(data => data.type === "Base") ?? [],
    })
)

export const currentProductDetailCustomProperties = createSelector(
    dashboardFeature,
    currentProductDetail,
    (state: DashboardModelState, productDetail) => ({
        properties: productDetail?.properties,
        customProperties: productDetail?.properties?.filter(data => data.type === "Custom") ?? [],
    })
)

export const currentProductDetailVariantProperties = createSelector(
    dashboardFeature,
    currentProductDetail,
    (state: DashboardModelState, productDetail) => ({
        properties: productDetail?.properties,
        variantProperties: productDetail?.properties?.filter(data => data.type === "Variant") ?? [],
    })
)

export const savingProductDetail = createSelector(dashboardFeature, (state: DashboardModelState) =>
    (state.productDetailState.loading))
    
export const savingProductAssociation = createSelector(dashboardFeature, (state: DashboardModelState) =>
    (state.productAssociationState.loading))
