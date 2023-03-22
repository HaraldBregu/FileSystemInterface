import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Catalog } from "src/app/shared/interfaces/catalog";
import { DashboardModel } from "../models";

export const DASHBOARD_SELECTOR = "DASHBOARD_SELECTOR_ID";

export const dashboardDataSelector = createSelector(
    createFeatureSelector<DashboardModel>(DASHBOARD_SELECTOR), (dashboard: DashboardModel) => {
        return dashboard;
    }
);
