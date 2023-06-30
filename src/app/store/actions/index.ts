import { createAction, props } from "@ngrx/store";
import { Product } from "src/app/shared/interfaces/product";
import { ProductAssociation } from "src/app/shared/interfaces/product-association";
import { ProductDetail, ProductProperty } from "src/app/shared/interfaces/product-detail";
import { SearchData } from "src/app/shared/interfaces/search-data";
import { SearchDataResult } from "src/app/shared/interfaces/search-data-result";

export enum DashboardActionTypes {
    TOGGLE_THEME = '[TOGGLETHEME][SET]',
    SET_API_ENV = '[SET_API_ENV][SET]',

    GET_CATALOGS = '[CATALOG][GET]',
    GET_CATALOGS_SUCCESS = '[CATALOG][GET] success',
    GET_CATALOGS_FAILURE = '[CATALOG][GET] failure',

    SELECT_PRODUCT = '[PRODUCT][SELECT]',

    /// PRODUCT DETAIL

    GET_PRODUCT_DETAIL = '[DETAIL][GET]',
    GET_PRODUCT_DETAIL_SUCCESS = '[DETAIL][GET] success',
    GET_PRODUCT_DETAIL_FAILURE = '[DETAIL][GET] failure',
    SET_PRODUCT_DETAIL_PROPERTIES = '[DETAIL][SET]',
    POST_PRODUCT_DETAIL = '[DETAIL][POST]',
    POST_PRODUCT_DETAIL_SUCCESS = '[DETAIL][POST] success',
    POST_PRODUCT_DETAIL_FAILURE = '[DETAIL][POST] failure',

    /// PRODUCT ASSOCIATION

    GET_PRODUCT_ASSOCIATION = '[ASSOCIATION][GET]',
    GET_PRODUCT_ASSOCIATION_SUCCESS = '[ASSOCIATION][GET] success',
    GET_PRODUCT_ASSOCIATION_FAILURE = '[ASSOCIATION][GET] failure',
    SET_PRODUCT_ASSOCIATION = '[ASSOCIATION][SET]',
    POST_PRODUCT_ASSOCIATION = '[ASSOCIATION][POST]',
    POST_PRODUCT_ASSOCIATION_SUCCESS = '[ASSOCIATION][POST] success',
    POST_PRODUCT_ASSOCIATION_FAILURE = '[ASSOCIATION][POST] failure',

    GET_PRODUCTS = '[PRODUCTS][GET]',
    GET_PRODUCTS_SUCCESS = '[PRODUCTS][GET] success',
    GET_PRODUCTS_FAILURE = '[PRODUCTS][GET] failure',

    UPDATE_BASE_PROPERTIES = '[BASEPROPERTIES][UPDATE]',
    UPDATE_CUSTOM_PROPERTIES = '[VARIANTPROPERTIES][UPDATE]',
    UPDATE_VARIANT_PROPERTIES = '[VARIANTPROPERTIES][UPDATE]',

    GET_API_ENVIRONMENTS = '[API_ENVIRONMENTS][GET]',
    GET_API_ENVIRONMENTS_SUCCESS = '[API_ENVIRONMENTS][GET] success',
    GET_API_ENVIRONMENTS_FAILURE = '[API_ENVIRONMENTS][GET] failure',

    SEARCH_FILTERS = '[SEARCHFILTERS][GET]',
    SEARCH_FILTERS_SUCCESS = '[SEARCHFILTERS][GET] success',
    SEARCH_FILTERS_FAILURE = '[SEARCHFILTERS][GET] failure',

    SEARCH_FILTERS_SELECTED_PRODUCT = '[SEARCHFILTERSSELECTEDPRODUCT][GET]',

    CATALOG_SEARCH_GET_RESULT = '[CATALOGSEARCHGETRESULT][POST]',
    CATALOG_SEARCH_GET_RESULT_SUCCESS = '[CATALOGSEARCHGETRESULT][POST] success',
    CATALOG_SEARCH_GET_RESULT_FAILURE = '[CATALOGSEARCHGETRESULT][POST] failure',

    TOGGLE_DASHBOARD_SIDE_MENU = '[TOGGLEDASHBOARDSIDEMENU][SET]',
    CLEAR_NAVITEMS = '[CLEARNAVITEMS][SET]',

}

// TOGGLE THEME
export const toggleTheme = createAction(
    DashboardActionTypes.TOGGLE_THEME)

// SET API ENV
export const setApiEnv = createAction(
    DashboardActionTypes.SET_API_ENV,
    props<{ environment: string }>())

/// CATALOGS

export const getCatalogs = createAction(
    DashboardActionTypes.GET_CATALOGS);
export const getCatalogsSuccess = createAction(
    DashboardActionTypes.GET_CATALOGS_SUCCESS,
    props<{ productList: Product[] }>());
export const getCatalogsFailure = createAction(
    DashboardActionTypes.GET_CATALOGS_FAILURE,
    props<{ error: any }>());

/// PRODUCT SELECT

export const selectProduct = createAction(
    DashboardActionTypes.SELECT_PRODUCT,
    props<{ product: Product }>());

/// PRODUCT DETAIL

export const getProductDetail = createAction(DashboardActionTypes.GET_PRODUCT_DETAIL)
export const getProductDetailSuccess = createAction(
    DashboardActionTypes.GET_PRODUCT_DETAIL_SUCCESS,
    props<{ productDetail: ProductDetail }>())
export const getProductDetailFailure = createAction(
    DashboardActionTypes.GET_PRODUCT_DETAIL_FAILURE,
    props<{ error: any }>())

export const setProductDetailProperties = createAction(
    DashboardActionTypes.SET_PRODUCT_DETAIL_PROPERTIES,
    props<{ productDetailProperties: ProductProperty[] }>())

export const postProductDetail = createAction(DashboardActionTypes.POST_PRODUCT_DETAIL)
export const postProductDetailSuccess = createAction(
    DashboardActionTypes.POST_PRODUCT_DETAIL_SUCCESS)
export const postProductDetailFailure = createAction(
    DashboardActionTypes.POST_PRODUCT_DETAIL_FAILURE,
    props<{ error: any }>())

/// PRODUCT ASSOCIATION

export const getProductAssociation = createAction(DashboardActionTypes.GET_PRODUCT_ASSOCIATION)
export const getProductAssociationSuccess = createAction(
    DashboardActionTypes.GET_PRODUCT_ASSOCIATION_SUCCESS,
    props<{ productAssociation: ProductAssociation }>());
export const getProductAssociationFailure = createAction(
    DashboardActionTypes.GET_PRODUCT_ASSOCIATION_FAILURE,
    props<{ error: any }>());

export const setProductAssociation = createAction(
    DashboardActionTypes.SET_PRODUCT_ASSOCIATION,
    props<{ productAssociation: ProductAssociation }>())

export const postProductAssociation = createAction(DashboardActionTypes.POST_PRODUCT_ASSOCIATION)
export const postProductAssociationSuccess = createAction(DashboardActionTypes.POST_PRODUCT_ASSOCIATION_SUCCESS)
export const postProductAssociationFailure = createAction(DashboardActionTypes.POST_PRODUCT_ASSOCIATION_FAILURE)

/// PRODUCTS

export const getProducts = createAction(
    DashboardActionTypes.GET_PRODUCTS)
export const getProductsSuccess = createAction(
    DashboardActionTypes.GET_PRODUCTS_SUCCESS,
    props<{ products: Product[] }>())
export const getProductsFailure = createAction(
    DashboardActionTypes.GET_PRODUCTS_FAILURE,
    props<{ error: any }>())



/// UPDATE PROPERTIES

export const updateBaseProperties = createAction(
    DashboardActionTypes.UPDATE_BASE_PROPERTIES,
    props<{ properties: ProductProperty[] }>());
export const updateCustomProperties = createAction(
    DashboardActionTypes.UPDATE_CUSTOM_PROPERTIES,
    props<{ properties: ProductProperty[] }>());
export const updateVariantProperties = createAction(
    DashboardActionTypes.UPDATE_VARIANT_PROPERTIES,
    props<{ properties: ProductProperty[] }>());

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
    DashboardActionTypes.SEARCH_FILTERS);
export const getSearchFiltersSuccess = createAction(
    DashboardActionTypes.SEARCH_FILTERS_SUCCESS,
    props<{ searchData: SearchData }>());
export const getSearchFiltersFailure = createAction(
    DashboardActionTypes.SEARCH_FILTERS_FAILURE,
    props<{ error: any }>());
export const getSearchFiltersOfSelectedProduct = createAction(
    DashboardActionTypes.SEARCH_FILTERS_SELECTED_PRODUCT);

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