import { createAction, props } from "@ngrx/store";
import { Catalog } from "src/app/shared/interfaces/catalog";

export enum CatalogsTypes {
    GET_CATALOGS = '[CATALOG][GET]',
    GET_CATALOGS_SUCCESS = '[CATALOG][GET] success',
    GET_CATALOGS_FAILURE = '[CATALOG][GET] failure',
    SELECT_CATALOG = '[CATALOG][SELECT]',
}

export const getCatalogs = createAction(
    CatalogsTypes.GET_CATALOGS);

export const getCatalogsSuccess = createAction(
    CatalogsTypes.GET_CATALOGS_SUCCESS,
    props<{ items: Catalog[] }>());

export const getCatalogsFailure = createAction(
    CatalogsTypes.GET_CATALOGS_FAILURE,
    props<{ error: any }>());

export const selectCatalog = createAction(
    CatalogsTypes.SELECT_CATALOG, 
    props<Catalog>());
