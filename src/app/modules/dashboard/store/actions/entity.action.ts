import { createAction, props } from "@ngrx/store";
import { ProductType } from "src/app/shared/enums/product-type";
import { DefinitionName } from "src/app/shared/interfaces/definition-name";

export enum EntityActionTypes {
    ADD_ENTITY = '[ENTITY][GET] add entity',
    ADD_ENTITY_SUCCESS = '[ENTITY][GET] add entity success',
    ADD_ENTITY_FAILURE = '[ENTITY][GET] add entity failure',

    DELETE_ENTITY = '[ENTITY][GET] delete entity',
    DELETE_ENTITY_SUCCESS = '[ENTITY][GET] delete entity success',
    DELETE_ENTITY_FAILURE = '[ENTITY][GET] delete entity failure',

    GET_DEFINITION_NAMES = '[DEFINITIONNAMES][GET]',
    GET_DEFINITION_NAMES_SUCCESS = '[DEFINITIONNAMES][GET] success',
    GET_DEFINITION_NAMES_FAILURE = '[DEFINITIONNAMES][GET] failure',
}

export const addEntity = createAction(EntityActionTypes.ADD_ENTITY, props<{
    definitionname: string,
    classtype: string,
    displayname: string,
}>())
export const addEntitySuccess = createAction(EntityActionTypes.ADD_ENTITY_SUCCESS)
export const addEntityFailure = createAction(EntityActionTypes.ADD_ENTITY_FAILURE)

export const deleteEntity = createAction(EntityActionTypes.DELETE_ENTITY)
export const deleteEntitySuccess = createAction(EntityActionTypes.DELETE_ENTITY_SUCCESS)
export const deleteEntityFailure = createAction(EntityActionTypes.DELETE_ENTITY_FAILURE)

export const getDefinitionNames = createAction(EntityActionTypes.GET_DEFINITION_NAMES, props<{
    t: string,
}>())
export const getDefinitionNamesSuccess = createAction(EntityActionTypes.GET_DEFINITION_NAMES_SUCCESS, props<{
    data: DefinitionName[],
}>())
export const getDefinitionNamesFailure = createAction(EntityActionTypes.GET_DEFINITION_NAMES_FAILURE)
