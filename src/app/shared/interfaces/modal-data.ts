export enum ModalButtonType {
    DEFAULT,
    DISMISS,
    DESCTRUCTIVE,
}

export interface ModalButton {
    type: ModalButtonType
    text: string
}

export interface ModalData {
    title: string
    description: string
    buttons: ModalButton[]
}

export const modalDataInitial = {
    title: '',
    description: '',
    buttons: [],
}