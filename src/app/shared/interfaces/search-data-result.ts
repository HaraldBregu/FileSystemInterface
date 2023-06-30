import { ProductType } from "../enums/product-type"

export interface SearchDataResult {
    oid: number
    parentoid: number // REMOVE IT
    displayname: string
    categoryname: string
    productid: string
    variantid: string
    type: ProductType
    catalogname: string
}
