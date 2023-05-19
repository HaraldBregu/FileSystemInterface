import { createAction, props } from "@ngrx/store";
import { ProductProperty } from "../../interfaces/product-detail";
import { Variant } from "../../interfaces/variant";

export enum SharedComponentsActionTypes {

    BASE_PROPERTIES = '[PROPERTIES][UPDATE]',
    CUSTOM_PROPERTIES = '[PROPERTIES][UPDATE]',
    VARIANT_PROPERTIES = '[PROPERTIES][UPDATE]',

    UPDATE_BASE_PROPERTIES = '[BASEPROPERTIES][UPDATE]',
    UPDATE_CUSTOM_PROPERTIES = '[CUSTOMPROPERTIES][UPDATE]',
    UPDATE_VARIANT_PROPERTIES = '[VARIANTPROPERTIES][UPDATE]',
    UPDATE_VARIANTS = '[VARIANTS][UPDATE]',

}

export const baseProperties = createAction(
    SharedComponentsActionTypes.BASE_PROPERTIES,
    props<{ properties: ProductProperty[] }>()
)

export const customProperties = createAction(
    SharedComponentsActionTypes.CUSTOM_PROPERTIES,
    props<{ properties: ProductProperty[] }>()
)

export const variantProperties = createAction(
    SharedComponentsActionTypes.VARIANT_PROPERTIES,
    props<{ properties: ProductProperty[] }>()
)


export const updateBaseProperties = createAction(
    SharedComponentsActionTypes.UPDATE_BASE_PROPERTIES,
    props<{ properties: ProductProperty[] }>()
)

export const updateCustomProperties = createAction(
    SharedComponentsActionTypes.UPDATE_CUSTOM_PROPERTIES,
    props<{ properties: ProductProperty[] }>()
)

export const updateVariantProperties = createAction(
    SharedComponentsActionTypes.UPDATE_VARIANT_PROPERTIES,
    props<{ properties: ProductProperty[] }>()
)

export const updateVariants = createAction(
    SharedComponentsActionTypes.UPDATE_VARIANTS,
    props<{ variants: Variant[] }>()
)
