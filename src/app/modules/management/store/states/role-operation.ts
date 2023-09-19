import { PartnerRoleOperation } from "src/app/shared/interfaces/partner-role-operation"

export interface PartnerRoleOperationState {
    loading: boolean
    partnerRoleOperations: PartnerRoleOperation[]
    selectedRoleOperation: PartnerRoleOperation | undefined
}

export const partnerRoleOperationStateInitial: PartnerRoleOperationState = {
    loading: false,
    partnerRoleOperations: [],
    selectedRoleOperation: undefined,
}