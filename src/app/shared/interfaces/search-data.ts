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

export const searchDataInitial: SearchData = {
    id: 0,
    lookinselected: "",
    lookinoptions: [],
    lookforselected: "",
    lookforoptions: [],
    resultperpageselected: "",
    resultperpageoptions: [],
    fields: [],
    postfields: [],
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

    NoType = 999,
}

export const searchDataPostFieldEmpty: SearchPostField = {
    logicaloperator: "AND",
    field: "",
    fieldtype: SearchFieldType.NoType,
    condition: "",
    value: "",
}