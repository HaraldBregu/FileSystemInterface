import { createAction, props } from "@ngrx/store";
import { Product } from "src/app/shared/interfaces/product";
import { ProductDetail } from "src/app/shared/interfaces/product-detail";

export enum DashboardActionTypes {
    GET_CATALOGS = '[CATALOG][GET]',
    GET_CATALOGS_SUCCESS = '[CATALOG][GET] success',
    GET_CATALOGS_FAILURE = '[CATALOG][GET] failure',
    SELECT_CATALOG = '[CATALOG][SELECT]',
    SEARCH_CATALOG = '[CATALOG][SEARCH]',

    GET_CATALOG_PROPERTIES = '[CATALOGPROPERTIES][GET]',
    GET_CATALOG_PROPERTIES_SUCCESS = '[CATALOGPROPERTIES][GET] success',
    GET_CATALOG_PROPERTIES_FAILURE = '[CATALOGPROPERTIES][GET] failure',
    SAVE_CATALOG_PROPERTIES = '[CATALOGPROPERTIES][SAVE]',
    SAVE_CATALOG_PROPERTIES_SUCCESS = '[CATALOGPROPERTIES][SAVE] success',
    SAVE_CATALOG_PROPERTIES_FAILURE = '[CATALOGPROPERTIES][SAVE] failure',

    GET_CATEGORIES = '[CATEOGORIES][GET]',
    GET_CATEGORIES_SUCCESS = '[CATEOGORIES][GET] success',
    GET_CATEGORIES_FAILURE = '[CATEOGORIES][GET] failure',

    SELECT_CATEGORY = '[CATEOGORY][SELECT]',

    GET_CATEGORY_PROPERTIES = '[CATEGORYPROPERTIES][GET]',
    GET_CATEGORY_PROPERTIES_SUCCESS = '[CATEGORYPROPERTIES][GET] success',
    GET_CATEGORY_PROPERTIES_FAILURE = '[CATEGORYPROPERTIES][GET] failure',
    SAVE_CATEGORY_PROPERTIES = '[CATEGORYPROPERTIES][SAVE]',
    SAVE_CATEGORY_PROPERTIES_SUCCESS = '[CATEGORYPROPERTIES][SAVE] success',
    SAVE_CATEGORY_PROPERTIES_FAILURE = '[CATEGORYPROPERTIES][SAVE] failure',

}

/// CATALOGS
export const getCatalogs = createAction(
    DashboardActionTypes.GET_CATALOGS);

export const getCatalogsSuccess = createAction(
    DashboardActionTypes.GET_CATALOGS_SUCCESS,
    props<{ catalogs: Product[] }>());

export const getCatalogsFailure = createAction(
    DashboardActionTypes.GET_CATALOGS_FAILURE,
    props<{ error: any }>());

/// CATALOG SELECT
export const selectCatalog = createAction(
    DashboardActionTypes.SELECT_CATALOG,
    props<{ catalog: Product }>());

/// CATALOG SEARCH
export const searchCatalog = createAction(
    DashboardActionTypes.SEARCH_CATALOG,
    props<{ catalog_name: string }>());

/// CATALOG PROPERTIES GET
export const getCatalogProperties = createAction(
    DashboardActionTypes.GET_CATALOG_PROPERTIES,
    props<{ catalog: Product }>());

export const getCatalogPropertiesSuccess = createAction(
    DashboardActionTypes.GET_CATALOG_PROPERTIES_SUCCESS,
    props<{ catalog_properties: ProductDetail }>());

export const getCatalogPropertiesFailure = createAction(
    DashboardActionTypes.GET_CATALOG_PROPERTIES_FAILURE,
    props<{ error: any }>());

/// CATALOG PROPERTIES SAVE
export const saveCatalogProperties = createAction(
    DashboardActionTypes.SAVE_CATALOG_PROPERTIES,
    props<{ data: any }>());

export const saveCatalogPropertiesSuccess = createAction(
    DashboardActionTypes.SAVE_CATALOG_PROPERTIES_SUCCESS,
    props<{ success: boolean }>());

export const saveCatalogPropertiesFailure = createAction(
    DashboardActionTypes.SAVE_CATALOG_PROPERTIES_FAILURE,
    props<{ error: any }>());

/// CATEGORIES
export const getCategories = createAction(
    DashboardActionTypes.GET_CATEGORIES,
    props<{ catalog: Product, category?: Product }>());

export const getCategoriesSuccess = createAction(
    DashboardActionTypes.GET_CATEGORIES_SUCCESS,
    props<{ categories: Product[] }>());

export const getCategoriesFailure = createAction(
    DashboardActionTypes.GET_CATEGORIES_FAILURE,
    props<{ error: any }>());

/// CATEGORIES SELECT
export const selectCategory = createAction(
    DashboardActionTypes.SELECT_CATEGORY,
    props<{ category: Product }>());

/// GET CATEGORIES AND PRODUCT PROPERTIES
export const getCategoryProperties = createAction(
    DashboardActionTypes.GET_CATEGORY_PROPERTIES,
    props<{ catalog_name: string, category_id: number }>());

export const getCategoryPropertiesSuccess = createAction(
    DashboardActionTypes.GET_CATEGORY_PROPERTIES_SUCCESS,
    props<{ product_detail: ProductDetail }>());

export const getCategoryPropertiesFailure = createAction(
    DashboardActionTypes.GET_CATEGORY_PROPERTIES_FAILURE,
    props<{ error: any }>());

/// SAVE CATEGORIES AND PRODUCT PROPERTIES
export const saveCategoryProperties = createAction(
    DashboardActionTypes.SAVE_CATEGORY_PROPERTIES,
    props<{ data: any }>());

export const saveCategoryPropertiesSuccess = createAction(
    DashboardActionTypes.SAVE_CATEGORY_PROPERTIES_SUCCESS,
    props<{ success: boolean }>());

export const saveCategoryPropertiesFailure = createAction(
    DashboardActionTypes.SAVE_CATEGORY_PROPERTIES_FAILURE,
    props<{ error: any }>());
