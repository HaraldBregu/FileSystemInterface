import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DashboardState } from "../states/dashboard";
import Utils from "src/app/core/utils";

const selectDashboardFeature = createFeatureSelector<DashboardState>("DASHBOARD_FEATURE");

export const productDetailState = createSelector(selectDashboardFeature, (state) => (state.productDetailState))


export const productDetail = createSelector(productDetailState, (state) => (state.productDetail))
export const currentProductDetailLoading = createSelector(productDetailState, (state) => (state.loading))

export const currentProductDetailBaseProperties = createSelector(
    productDetail,
    (data) => (data?.properties?.filter(data => data.type === "Base") ?? [])
)

export const currentProductDetailCustomProperties = createSelector(
    productDetail,
    (data) => (data?.properties?.filter(data => data.type === "Custom") ?? [])
)

export const currentProductDetailVariantProperties = createSelector(
    productDetail,
    (data) => (data?.properties?.filter(data => data.type === "Variant") ?? [])
)

export const currentProductDetailVariant = createSelector(
    currentProductDetailVariantProperties,
    (variantProperties) => (Utils.variantsFromVariantProperties(variantProperties))
)

export const savingProductDetail = createSelector(productDetailState, (state) =>
    (state.loading))

