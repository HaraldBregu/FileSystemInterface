import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DashboardState } from "../states/dashboard";

const selectDashboardFeature = createFeatureSelector<DashboardState>("DASHBOARD_FEATURE");

const selectProductDetailState = createSelector(selectDashboardFeature, (state) => (state.productDetailState))

export const selectEmptyProductDetail = createSelector(selectProductDetailState, (state) => (state.emptyProductDetail))
export const selectEmptyProductDetailLoading = createSelector(selectProductDetailState, (state) => (state.emptyProductDetailLoading))
export const canShowCreateVariantModal = createSelector(selectProductDetailState, (state) =>
    (state.emptyProductDetailLoading === false && state.emptyProductDetail.catalogname.length > 0))

export const selectEmptyProductDetailProperties = createSelector(selectEmptyProductDetail, (state) => (state.properties))
export const selectEmptyProductDetailVariants =
    createSelector(selectEmptyProductDetail, (state) =>
        (state.properties.filter(data => data.type === "Variant")))
