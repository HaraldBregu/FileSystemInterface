export interface ProductDetail {
    id: number
    catalogname: string
    properties: ProductProperty[]
}

export interface ProductProperty {
    name: string
    type: string
    childs: PropertyField[]
}

export enum PropertFieldType {
    Number = 0,
    BigNumber,
    Decimal,
    Double,
    Boolean,
    Text,
    DateTime,
    MoneyCurrency,
    FileName,
    MultipleChoice,
    LongText,
}

export interface PropertyFieldOption {
    text: string
    value: string
}

export interface PropertyField {
    name: string
    displayname: string
    datatype: PropertFieldType
    ismultilanguage: boolean
    isrequired: boolean
    isreadonly: boolean
    value: string | undefined
    language: string
    options: PropertyFieldOption[]
    maxlength: number
}

