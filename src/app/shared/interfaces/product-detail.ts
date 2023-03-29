export interface ProductDetail {
    id: number
    catalogname: string
    properties: ProductProperty[]
}

export interface ProductProperty {
    name: string
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
    LongText
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
    options: []
    minlength: number
    maxlength: number
}

