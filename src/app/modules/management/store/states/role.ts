import { PartnerRole } from "src/app/shared/interfaces/partner-role"

export interface PartnerRoleState {
    loading: boolean
    partnerRoles: PartnerRole[]
}

export const partnerRoleStateInitial: PartnerRoleState = {
    loading: false,
    partnerRoles: [],
}