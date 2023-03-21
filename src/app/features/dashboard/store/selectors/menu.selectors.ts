import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Catalog } from "src/app/shared/interfaces/catalog";
import { DashboardModel } from "../models";

export const DASHBOARD_SELECTOR = "MENU_STATE_GET_ITEMS";

export const selectMenuItems = createSelector(
    createFeatureSelector<DashboardModel>(DASHBOARD_SELECTOR), (dashboard: DashboardModel) => {
        console.log(dashboard)
        return dashboard;
    }
);

export const selectItemName = createSelector(
    createFeatureSelector(DASHBOARD_SELECTOR), (item: Catalog) => {
        return item.name
    }
)
