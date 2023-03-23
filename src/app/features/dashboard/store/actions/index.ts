import { createAction, props } from "@ngrx/store";
import { Product } from "src/app/shared/interfaces/product";

export enum CatalogsTypes {
    
    GET_CATALOGS = '[CATALOG][GET]',
    GET_CATALOGS_SUCCESS = '[CATALOG][GET] success',
    GET_CATALOGS_FAILURE = '[CATALOG][GET] failure',
    SELECT_CATALOG = '[CATALOG][SELECT]',
    SEARCH_CATALOG = '[CATALOG][SEARCH]',

    GET_CATEGORIES = '[CATEOGORIES][GET]',
    GET_CATEGORIES_SUCCESS = '[CATEOGORIES][GET] success',
    GET_CATEGORIES_FAILURE = '[CATEOGORIES][GET] failure',

    GET_SUB_CATEGORIES = '[SUBCATEOGORIES][GET]',
    GET_SUB_CATEGORIES_SUCCESS = '[SUBCATEOGORIES][GET] success',
    GET_SUB_CATEGORIES_FAILURE = '[SUBCATEOGORIES][GET] failure',

}

export const getCatalogs = createAction(
    CatalogsTypes.GET_CATALOGS);

export const getCatalogsSuccess = createAction(
    CatalogsTypes.GET_CATALOGS_SUCCESS,
    props<{ catalogs: Product[] }>());

export const getCatalogsFailure = createAction(
    CatalogsTypes.GET_CATALOGS_FAILURE,
    props<{ error: any }>());

export const selectCatalog = createAction(
    CatalogsTypes.SELECT_CATALOG,
    props< { product: Product } >());

export const searchCatalog = createAction(
    CatalogsTypes.SEARCH_CATALOG,
    props<{ catalog_name: string }>());

export const getCategories = createAction(
    CatalogsTypes.GET_CATEGORIES,
    props<{ catalog_name: string }>());

export const getCategoriesSuccess = createAction(
    CatalogsTypes.GET_CATEGORIES_SUCCESS,
    props<{ categories: Product[] }>());

export const getCategoriesFailure = createAction(
    CatalogsTypes.GET_CATEGORIES_FAILURE,
    props<{ error: any }>());

export const getSubCategories = createAction(
    CatalogsTypes.GET_SUB_CATEGORIES,
    props<{ catalog_name: string, category_name: string, category_id: number }>());

export const getSubCategoriesSuccess = createAction(
    CatalogsTypes.GET_SUB_CATEGORIES_SUCCESS,
    props<{ category_name: string, categories: Product[] }>());

export const getSubCategoriesFailure = createAction(
    CatalogsTypes.GET_SUB_CATEGORIES_FAILURE,
    props<{ error: any }>());
