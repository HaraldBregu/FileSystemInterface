import { createReducer, on } from "@ngrx/store";
import { SharedComponentsModel } from "../models";
import {
    baseProperties,
    customProperties,
    variantProperties,
    updateBaseProperties,
    updateCustomProperties,
    updateVariantProperties,
    updateVariants,
} from "../actions";
import Utils from "src/app/core/utils";

const initialState: SharedComponentsModel = {
    baseProperties: [],
    customProperties: [],
    variantProperties: [],
    variants: [],
}

export const sharedComponentsReducer = createReducer(
    initialState,

    on(baseProperties, (state: SharedComponentsModel, data) => ({
        ...state,
        baseProperties: data.properties
    })),

    on(customProperties, (state: SharedComponentsModel, data) => ({
        ...state,
        customProperties: data.properties
    })),

    on(variantProperties, (state: SharedComponentsModel, data) => ({
        ...state,
        variantProperties: data.properties,
        variants: Utils.variantsFromVariantProperties(data.properties)
    })),

    on(updateBaseProperties, (state: SharedComponentsModel, data) => ({
        ...state,
        baseProperties: data.properties
    })),

    on(updateCustomProperties, (state: SharedComponentsModel, data) => ({
        ...state,
        customProperties: data.properties
    })),

    on(updateVariantProperties, (state: SharedComponentsModel, data) => ({
        ...state,
        variantProperties: data.properties
    })),    
    
    on(updateVariants, (state: SharedComponentsModel, data) => ({
        ...state,
        variantProperties: Utils.propertiesFromVariants(data.variants),
        variants: data.variants
    })),

)