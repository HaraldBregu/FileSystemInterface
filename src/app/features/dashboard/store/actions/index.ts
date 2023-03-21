import { createAction, props } from "@ngrx/store";
import { Catalog } from "src/app/shared/interfaces/catalog";
import { Category } from "src/app/shared/interfaces/category";

export enum CatalogsTypes {
    GET_CATALOGS = '[CATALOG][GET]',
    GET_CATALOGS_SUCCESS = '[CATALOG][GET] success',
    GET_CATALOGS_FAILURE = '[CATALOG][GET] failure',
    SELECT_CATALOG = '[CATALOG][SELECT]',

    GET_CATEGORIES = '[CATEOGORIES][GET]',
    GET_CATEGORIES_SUCCESS = '[CATEOGORIES][GET] success',
    GET_CATEGORIES_FAILURE = '[CATEOGORIES][GET] failure',

}

export const getCatalogs = createAction(
    CatalogsTypes.GET_CATALOGS);

export const getCatalogsSuccess = createAction(
    CatalogsTypes.GET_CATALOGS_SUCCESS,
    props<{ catalogs: Catalog[] }>());

export const getCatalogsFailure = createAction(
    CatalogsTypes.GET_CATALOGS_FAILURE,
    props<{ error: any }>());

export const selectCatalog = createAction(
    CatalogsTypes.SELECT_CATALOG,
    props<Catalog>());

export const getCategories = createAction(
    CatalogsTypes.GET_CATEGORIES,
    props<{ catalog_name: string }>());

export const getCategoriesSuccess = createAction(
    CatalogsTypes.GET_CATEGORIES_SUCCESS,
    props<{ categories: Category[] }>());

export const getCategoriesFailure = createAction(
    CatalogsTypes.GET_CATEGORIES_FAILURE,
    props<{ error: any }>());
