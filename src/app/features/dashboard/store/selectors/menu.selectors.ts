import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Catalog } from "src/app/shared/interfaces/catalog";
import { DashboardModel } from "../models";

export const DASHBOARD_SELECTOR = "MENU_STATE_GET_ITEMS";

export const dashboardDataSelector = createSelector(
    createFeatureSelector<DashboardModel>(DASHBOARD_SELECTOR), (dashboard: DashboardModel) => {
        return dashboard;
    }
);
