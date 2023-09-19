import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DashboardState } from "../states/dashboard";

const selectDashboardFeature = createFeatureSelector<DashboardState>("DASHBOARD_FEATURE");

export const searchState = createSelector(selectDashboardFeature, (state) => (state.searchDataState))

export const searchDataLoading = createSelector(searchState, (state) => (state.loading))
export const searchData = createSelector(searchState, (state) => (state.searchData))
export const searchDataResult = createSelector(searchState, (state) => (state.searchDataResult))
export const searchDataSelectedResult = createSelector(searchState, (state) => (state.searchDataSelectedResult))
