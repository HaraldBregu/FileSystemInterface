import { Organization } from "src/app/shared/interfaces/organization"

export interface OrganizationState {
    loading: boolean
    associatedOrganizations: Organization[]
    allOrganizations: Organization[]
}

export const organizationStateInitial: OrganizationState = {
    loading: false,
    associatedOrganizations: [],
    allOrganizations: [],
}