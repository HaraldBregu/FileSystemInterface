import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DashboardState } from "../states/dashboard";
import { ProductType } from "src/app/shared/enums/product-type";

const selectDashboardFeature = createFeatureSelector<DashboardState>("DASHBOARD_FEATURE");

export const productState = createSelector(selectDashboardFeature, (state) => (state.productState))

export const isCatalogList = createSelector(productState, (state) => (state.navigationItems.length === 0))
export const selectedCatalogName = createSelector(productState, (state) => (state.catalogName))
export const productList = createSelector(productState, (state) => (state.productList))
export const productListIsEmpty = createSelector(productList, (list) => (list.length === 0))
export const productListCount = createSelector(productState, (state) => (state.productList.length))
export const selectedProductList = createSelector(productState, (state) => (state.navigationItems))
export const productLoading = createSelector(productState, (state) => (state.loading))
export const selectedProductType = createSelector(productState, (state) => (state.productType))
export const selectedProductIsCatalog = createSelector(selectedProductType, (productType) => (productType === ProductType.Catalog))
export const selectedProductIsNotCatalog = createSelector(selectedProductType, (productType) => (productType !== ProductType.Catalog))
export const selectedProductIsFile = createSelector(selectedProductType, (productType) => (productType === ProductType.File || productType === ProductType.FileVariant))
export const selectedProductName = createSelector(productState, (state) => (state.productName))
export const selectedProductId = createSelector(productState, (state) => (state.productId))

export const currentEntityIsProduct = createSelector(selectedProductType, (productType) => (productType === ProductType.File || productType === ProductType.FileVariant))
export const currentEntityIsCategory = createSelector(selectedProductType, (productType) => (productType === ProductType.Category || productType === ProductType.CategoryVariant))

export const currentSelectedProduct = createSelector(
    productState,
    (state) => ({
        isCatalog: (state.navigationItems.at(-1)?.type == ProductType.Catalog),
        catalog_name: state.catalogName,
        product_id: state.productId
    })
)

export const productDetailTabs = createSelector(productState, (state) => (state.productDetailTabs))

export const hasProductDetail = createSelector(productState, (state) => (state.navigationItems.length > 0))

export const definitionNames = createSelector(productState, (state) => (state.definitionNames))

export const lastLavigationItem = createSelector(productState, (state) => (state.navigationItems.at(-1)))
export const lastLavigationItemId = createSelector(lastLavigationItem, (state) => (state?.oid))

export const secondLastLavigationItem = createSelector(productState, (state) => (state.navigationItems.at(-2)))
export const secondLastLavigationItemId = createSelector(secondLastLavigationItem, (state) => (state?.oid))
