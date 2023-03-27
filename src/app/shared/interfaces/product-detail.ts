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
    Number,
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
    value?: string
    minlength: number
    maxlength: number
    languagesvalue: PropertyFieldLang[]
}

export interface PropertyFieldLang {
    language: string
    value: string
}