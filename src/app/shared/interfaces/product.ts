import { ProductType } from "../enums/product-type"

export interface Product {
    type: ProductType
    id: number
    name: string
}
