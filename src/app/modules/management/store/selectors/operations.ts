import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ManagementState } from "../states";


const selectManagementFeature = createFeatureSelector<ManagementState>("MANAGEMENT_FEATURE");

export const selectOperationState = createSelector(selectManagementFeature, (state) => (state.operationState))

export const operationLoading = createSelector(selectOperationState, (state) => (state.loading))
export const operations = createSelector(selectOperationState, (state) => (state.operations))
export const currentOperation = createSelector(selectOperationState, (state) => (state.currentOperation))
