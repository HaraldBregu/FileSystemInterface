export interface VariantPropertyFieldOption {
    text: string
    value: string
}

export interface VariantPropertyField {
    name: string
    displayname: string
    value: string
    options: VariantPropertyFieldOption[]
    readonly: boolean
}

export interface Variant {
    properties: VariantPropertyField[]
}