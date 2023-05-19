import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SharedComponentsModel } from "../models";

export const SHARED_COMPONENTS_SELECTOR = "SHARED_COMPONENTS_SELECTOR";

export const sharedComponentsDataSelector = createSelector(
    createFeatureSelector<SharedComponentsModel>(SHARED_COMPONENTS_SELECTOR), (model: SharedComponentsModel) => {
        return model;
    }
);