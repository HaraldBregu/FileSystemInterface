import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Catalog } from "src/app/shared/interfaces/catalog";

export const MENU_STATE_ITEM = "MENU_STATE_ITEM";

export const selectIdProductName = createSelector(
    createFeatureSelector(MENU_STATE_ITEM), 
    (state: Catalog) => {
        return state.name
    }
)