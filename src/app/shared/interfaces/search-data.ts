export interface SearchData {
    id: number
    lookinselected?: string
    lookinoptions: SearchDataOption[]
    lookforselected?: string
    lookforoptions: SearchDataOption[]
    resultperpageselected?: string
    resultperpageoptions: SearchDataOption[]
    fields: SearchDataField[]
    postfields: SearchPostField[]
}

export interface SearchDataField {
    fieldvalue: string
    fieldtext: string
    fieldtype: SearchFieldType
    operators: SearchDataOption[]
    conditions: SearchDataOption[]
    values: SearchDataOption[]
}

export interface SearchDataOption {
    text: string
    value: string
}

export interface SearchPostField {
    logicaloperator: string
    field: string
    fieldtype: SearchFieldType
    condition: string
    value: string
}

export enum SearchFieldType {
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

export const SearchDataPostFieldInitial: SearchPostField = {
    logicaloperator: "",
    field: "",
    fieldtype: 0,
    condition: "",
    value: "",
}