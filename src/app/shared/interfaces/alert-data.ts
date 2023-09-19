export enum AlertButtonType {
    DEFAULT,
    DISMISS,
    DESCTRUCTIVE,
}

export interface AlertButton {
    type: AlertButtonType
    text: string
}

export interface AlertData {
    title: string
    description: string
    buttons: AlertButton[]
}

export const alertDataInitial = {
    title: '',
    description: '',
    buttons: [],
}