import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DashboardModelState } from "../models";

export const DASHBOARD_SELECTOR = "DASHBOARD_SELECTOR_ID";
export const dashboardDataSelector = createSelector(
    createFeatureSelector<DashboardModelState>(DASHBOARD_SELECTOR), (dashboard: DashboardModelState) => {
        return dashboard;
    }
)

export const MAIN_SELECTOR = "MAIN_SELECTOR_ID";
export const mainDataSelector = createSelector(
    createFeatureSelector<DashboardModelState>(MAIN_SELECTOR), 
    (dashboard: DashboardModelState) => {
        return dashboard;
    }
)

/// SELECT FEATURE

/*
export const selectFeature = (state: DashboardModelState) => state.environments;
export const environmentSelector = createSelector(
    selectFeature,
    (environments: string[]) => environments
)*/
