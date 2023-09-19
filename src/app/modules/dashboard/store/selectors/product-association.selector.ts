import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DashboardState } from "../states/dashboard";

const selectDashboardFeature = createFeatureSelector<DashboardState>("DASHBOARD_FEATURE");

export const productAssociationState = createSelector(selectDashboardFeature, (state) => (state.productAssociationState))

export const updatedAssociationProduct = createSelector(productAssociationState, (state) => ({
    association: state.productAssociation,
}))

export const productAssociation = createSelector(productAssociationState, (state) => (state.productAssociation))
export const productAssociationPrimaryCategory = createSelector(productAssociationState, (state) => (state.productAssociation.primarycategory))

export const productAssociationParentCategories = createSelector(
    productAssociationState,
    (state) => ({
        productAssociation: state.productAssociation,
        parentCategories: state.productAssociation.parentcategories
    })
)

export const productAssociationChildCategories = createSelector(
    productAssociationState,
    (state) => ({
        productAssociation: state.productAssociation,
        parentCategories: state.productAssociation.childcategories
    })
)

export const currentProductAssociationPrimaryCategory = createSelector(productAssociationState, (state) => (state.productAssociation?.primarycategory))

export const currentProductAssociationLoading = createSelector(productAssociationState, (state) => (state.loading))

export const savingProductAssociation = createSelector(productAssociationState, (state) => (state.loading))

export const hasParentCategories = createSelector(productAssociation, (state) => (state.parentcategories.length > 0))
export const hasChildCategories = createSelector(productAssociation, (state) => (state.childcategories.length > 0))
export const hasProducts = createSelector(productAssociation, (state) => (state.products.length > 0))
