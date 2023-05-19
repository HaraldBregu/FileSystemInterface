import { ProductProperty } from "../../interfaces/product-detail";
import { Variant } from "../../interfaces/variant";

export interface SharedComponentsModel {
    baseProperties: ProductProperty[]
    customProperties: ProductProperty[]
    variantProperties: ProductProperty[]
    variants: Variant[]
}
