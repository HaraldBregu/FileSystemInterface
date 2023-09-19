import { 
    PartnerRoleState, 
    PartnerState, 
    OrganizationState, 
    OperationState
} from "./index"
import { PartnerRoleOperationState } from "./role-operation"

export interface ManagementState {
    partnerState: PartnerState
    partnerRoleState: PartnerRoleState
    organizationState: OrganizationState
    operationState: OperationState,
    roleOperationState: PartnerRoleOperationState
}
