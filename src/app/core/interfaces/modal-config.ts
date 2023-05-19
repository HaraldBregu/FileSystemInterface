
export enum ModalConfigSize {
    SMALL,
    MEDIUM,
    LARGE,
}

export interface ModalConfig {
    size: ModalConfigSize
    title: string
    description?: string
    
    /*
    dismissButtonLabel?: string
    closeButtonLabel?: string
    shouldClose?(): Promise<boolean> | boolean
    shouldDismiss?(): Promise<boolean> | boolean
    onClose?(): Promise<boolean> | boolean
    onDismiss?(): Promise<boolean> | boolean
    disableCloseButton?(): boolean
    disableDismissButton?(): boolean
    hideCloseButton?(): boolean
    hideDismissButton?(): boolean  
    */
}
