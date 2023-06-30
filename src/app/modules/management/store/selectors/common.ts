import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ManagementState } from "../states";

const selectManagementFeature = createFeatureSelector<ManagementState>("MANAGEMENT_FEATURE");

export const selectDetailTabs = createSelector(selectManagementFeature, (state) => {
    var tabs = []

    if (state.partnerState.selectedPartner)
        tabs.push("Details")

   // if (state.organizationState.associatedOrganizations.length > 0)
        tabs.push("Agencies")

    return tabs
})
