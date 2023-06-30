import { 
    PartnerRoleState, 
    PartnerState, 
    OrganizationState 
} from "./index"

export interface ManagementState {
    partnerState: PartnerState
    partnerRoleState: PartnerRoleState
    organizationState: OrganizationState
}
