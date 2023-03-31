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

    GET_CATEGORIES = '[CATEOGORIES][GET]',
    GET_CATEGORIES_SUCCESS = '[CATEOGORIES][GET] success',
    GET_CATEGORIES_FAILURE = '[CATEOGORIES][GET] failure',

    SELECT_CATEGORY = '[CATEOGORY][SELECT]',

    GET_PRODUCT_DETAIL = '[PRODUCTDETAIL][GET]',
    GET_PRODUCT_DETAIL_SUCCESS = '[PRODUCTDETAIL][GET] success',
    GET_PRODUCT_DETAIL_FAILURE = '[PRODUCTDETAIL][GET] failure',

    SELECT_PRODUCT = '[PRODUCT][SELECT]',
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

/// CATALOG PROPERTIES
export const getCatalogProperties = createAction(
    DashboardActionTypes.GET_CATALOG_PROPERTIES,
    props<{ catalog: Product }>());

export const getCatalogPropertiesSuccess = createAction(
    DashboardActionTypes.GET_CATALOG_PROPERTIES_SUCCESS,
    props<{ catalog_properties: ProductDetail }>());

export const getCatalogPropertiesFailure = createAction(
    DashboardActionTypes.GET_CATALOG_PROPERTIES_FAILURE,
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

/// CATEGORIES AND PRODUCT PROPERTIES
export const getProductDetail = createAction(
    DashboardActionTypes.GET_PRODUCT_DETAIL,
    props<{ catalog: Product, category: Product }>());

export const getProductDetailSuccess = createAction(
    DashboardActionTypes.GET_PRODUCT_DETAIL_SUCCESS,
    props<{ product_detail: ProductDetail }>());

export const getProductDetailFailure = createAction(
    DashboardActionTypes.GET_PRODUCT_DETAIL_FAILURE,
    props<{ error: any }>());

/**
 * PRODUCT SELECT
 */
export const selectProduct = createAction(
    DashboardActionTypes.SELECT_PRODUCT,
    props<{ product: Product }>());
