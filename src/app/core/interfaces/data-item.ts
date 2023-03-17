import { DataItemType } from "../enums/data-item-type"

export interface DataItem {
    type: DataItemType
    title: string,
    subtitle?: string,
    childs?: number 
    data?: any
}
