import { PartnerOperation } from "src/app/shared/interfaces/partner-operation"

export interface OperationState {
    loading: boolean
    operations: PartnerOperation[]
    currentOperation: PartnerOperation | undefined
}

export const operationStateInitial: OperationState = {
    loading: false,
    operations: [],
    currentOperation: undefined,
}