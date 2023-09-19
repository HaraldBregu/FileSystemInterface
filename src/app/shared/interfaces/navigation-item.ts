import { ProductType } from "../enums/product-type"

export interface NavigationItem {
    oid: number
    catalogname: string
    categoryname: string
    type: ProductType
    parentoid: number
    level: number
}

