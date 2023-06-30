import { Partner } from "src/app/shared/interfaces/partner"

export interface PartnerState {
    loading: boolean
    selectedPartner: Partner | undefined
    partners: Partner[]
}

export const partnerStateInitial: PartnerState = {
    loading: false,
    selectedPartner: undefined,
    partners: [],
}