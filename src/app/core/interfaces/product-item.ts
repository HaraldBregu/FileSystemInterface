import { ProductItemType } from "../enums/product-item-type"

export interface ProductItem {
    type: ProductItemType
    name: string
    color?: string
    childs?: number
    data?: any
}
