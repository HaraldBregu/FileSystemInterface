import { ProductItemType } from "../enums/product-item-type"

export interface ProductItem {
    type: ProductItemType
    name: string
    childs?: number
    data?: any
}
