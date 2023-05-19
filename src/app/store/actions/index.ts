import { createAction, props } from "@ngrx/store";
import { Product } from "src/app/shared/interfaces/product";
import { ProductAssociation } from "src/app/shared/interfaces/product-association";
import { ProductDetail } from "src/app/shared/interfaces/product-detail";
import { SearchData } from "src/app/shared/interfaces/search-data";
import { SearchDataResult } from "src/app/shared/interfaces/search-data-result";

export enum DashboardActionTypes {
    SET_API_ENV = '[SET_API_ENV][SET]',

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

    GET_CATEGORY_ASSOCIATIONS = '[CATEGORYASSOCIATIONS][GET]',
    GET_CATEGORY_ASSOCIATIONS_SUCCESS = '[CATEGORYASSOCIATIONS][GET] success',
    GET_CATEGORY_ASSOCIATIONS_FAILURE = '[CATEGORYASSOCIATIONS][GET] failure',

    GET_API_ENVIRONMENTS = '[API_ENVIRONMENTS][GET]',
    GET_API_ENVIRONMENTS_SUCCESS = '[API_ENVIRONMENTS][GET] success',
    GET_API_ENVIRONMENTS_FAILURE = '[API_ENVIRONMENTS][GET] failure',

    SEARCH_FILTERS = '[SEARCHFILTERS][GET]',
    SEARCH_FILTERS_SUCCESS = '[SEARCHFILTERS][GET] success',
    SEARCH_FILTERS_FAILURE = '[SEARCHFILTERS][GET] failure',

    CATALOG_SEARCH_GET_RESULT = '[CATALOGSEARCHGETRESULT][POST]',
    CATALOG_SEARCH_GET_RESULT_SUCCESS = '[CATALOGSEARCHGETRESULT][POST] success',
    CATALOG_SEARCH_GET_RESULT_FAILURE = '[CATALOGSEARCHGETRESULT][POST] failure',

    TOGGLE_DASHBOARD_SIDE_MENU = '[TOGGLEDASHBOARDSIDEMENU][SET]',
    CLEAR_NAVITEMS = '[CLEARNAVITEMS][SET]',
}

// SET API ENV
export const setApiEnv = createAction(
    DashboardActionTypes.SET_API_ENV,
    props<{ environment: string }>())

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

/// GET CATEGORIES AND PRODUCT ASSOCIATIONS
export const getCategoryAssociations = createAction(
    DashboardActionTypes.GET_CATEGORY_ASSOCIATIONS,
    props<{ catalog_name: string, category_id: number }>());

export const getCategoryAssociationsSuccess = createAction(
    DashboardActionTypes.GET_CATEGORY_ASSOCIATIONS_SUCCESS,
    props<{ product_association: ProductAssociation }>());

export const getCategoryAssociationsFailure = createAction(
    DashboardActionTypes.GET_CATEGORY_ASSOCIATIONS_FAILURE,
    props<{ error: any }>());

/// GET API ENVIRONMENTS
export const getApiEnvironments = createAction(
    DashboardActionTypes.GET_API_ENVIRONMENTS);

export const getApiEnvironmentsSuccess = createAction(
    DashboardActionTypes.GET_API_ENVIRONMENTS_SUCCESS,
    props<{ environments: string[] }>());

export const getApiEnvironmentsFailure = createAction(
    DashboardActionTypes.GET_API_ENVIRONMENTS_FAILURE,
    props<{ error: any }>());

/// SEARCH
export const getSearchFilters = createAction(
    DashboardActionTypes.SEARCH_FILTERS,
    props<{ catalog_name?: string, category_id?: number }>());

export const getSearchFiltersSuccess = createAction(
    DashboardActionTypes.SEARCH_FILTERS_SUCCESS,
    props<{ searchData: SearchData }>());

export const getSearchFiltersFailure = createAction(
    DashboardActionTypes.SEARCH_FILTERS_FAILURE,
    props<{ error: any }>());

/// SEARCH RESULT
export const getSearchResult = createAction(
    DashboardActionTypes.CATALOG_SEARCH_GET_RESULT,
    props<{ searchData: SearchData }>());

export const getSearchResultSuccess = createAction(
    DashboardActionTypes.CATALOG_SEARCH_GET_RESULT_SUCCESS,
    props<{ resultList: SearchDataResult[] }>());

export const getSearchResultFailure = createAction(
    DashboardActionTypes.CATALOG_SEARCH_GET_RESULT_FAILURE,
    props<{ error: any }>());

/// UTILS
export const toggleDashboardSideMenu = createAction(
    DashboardActionTypes.TOGGLE_DASHBOARD_SIDE_MENU);
    
export const clearNavItems = createAction(
    DashboardActionTypes.CLEAR_NAVITEMS);