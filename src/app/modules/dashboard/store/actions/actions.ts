import { createAction, props } from "@ngrx/store";
import { Product } from "src/app/shared/interfaces/product";
import { ProductAssociation } from "src/app/shared/interfaces/product-association";
import { ProductDetail, ProductProperty } from "src/app/shared/interfaces/product-detail";
import { SearchData, SearchFieldType, SearchPostField } from "src/app/shared/interfaces/search-data";
import { SearchDataResult } from "src/app/shared/interfaces/search-data-result";

export enum ActionTypes {

    /// CATALOGS
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
    SET_PRODUCT_ASSOCIATION_PRIMARY_CATEGORY = '[ASSOCIATION][SET] primary category',
    POST_PRODUCT_ASSOCIATION = '[ASSOCIATION][POST]',
    POST_PRODUCT_ASSOCIATION_SUCCESS = '[ASSOCIATION][POST] success',
    POST_PRODUCT_ASSOCIATION_FAILURE = '[ASSOCIATION][POST] failure',

    GET_PRODUCTS = '[PRODUCTS][GET]',
    GET_PRODUCTS_SUCCESS = '[PRODUCTS][GET] success',
    GET_PRODUCTS_FAILURE = '[PRODUCTS][GET] failure',

    UPDATE_BASE_PROPERTIES = '[BASEPROPERTIES][UPDATE]',
    UPDATE_CUSTOM_PROPERTIES = '[VARIANTPROPERTIES][UPDATE]',
    UPDATE_VARIANT_PROPERTIES = '[VARIANTPROPERTIES][UPDATE]',

    /// SEARCH
    GET_SEARCH_DATA = '[SEARCHDATA][GET]',
    GET_SEARCH_DATA_FOR_CATALOG = '[SEARCHDATA][GET] for catalog',
    GET_SEARCH_DATA_FOR_SELECTED_PRODUCT = '[SEARCHDATA][GET] for selected product',
    GET_SEARCH_DATA_SUCCESS = '[SEARCHDATA][GET] success',
    GET_SEARCH_DATA_FAILURE = '[SEARCHDATA][GET] failure',
    SET_SEARCH_DATA_LOOK_FOR = '[SEARCHDATA][SET] look for',
    SET_SEARCH_DATA_POST_FIELD = '[SEARCHDATA][SET] post field',
    SET_SEARCH_DATA_POST_FIELD_NAME_AT_INDEX = '[SEARCHDATA][SET] post field name at index',
    SET_SEARCH_DATA_POST_FIELD_CONDITION_AT_INDEX = '[SEARCHDATA][SET] post field condition at index',
    SET_SEARCH_DATA_POST_FIELD_OPERATOR_AT_INDEX = '[SEARCHDATA][SET] post field operator at index',
    SET_SEARCH_DATA_POST_FIELD_VALUE_AT_INDEX = '[SEARCHDATA][SET] post field value at index',
    ADD_SEARCH_DATA_POST_FIELD_EMPTY_CONDITION = '[SEARCHDATA][SET] post field add empty condition',
    SEARCH_DATA_POST_FIELD_REMOVE_CONDITION_AT_INDEX = '[SEARCHDATA][REMOVE] post field remove condition at index',
    GET_SEARCH_DATA_RESULT = '[SEARCHDATARESULT][POST]',
    GET_SEARCH_DATA_RESULT_SUCCESS = '[SEARCHDATARESULT][POST] success',
    GET_SEARCH_DATA_RESULT_FAILURE = '[SEARCHDATARESULT][POST] failure',

    SELECT_SEARCH_RESULT = '[SEARCHRESULT][SELECT]',

    TOGGLE_DASHBOARD_SIDE_MENU = '[TOGGLEDASHBOARDSIDEMENU][SET]',
    
    CLEAR_DASHBOARD_DATA = '[DASHBOARDDATA][CLEAR]',
}

/// CATALOGS

export const getCatalogs = createAction(ActionTypes.GET_CATALOGS)
export const getCatalogsSuccess = createAction(
    ActionTypes.GET_CATALOGS_SUCCESS,
    props<{ productList: Product[] }>())
export const getCatalogsFailure = createAction(
    ActionTypes.GET_CATALOGS_FAILURE,
    props<{ error: any }>())

/// PRODUCT SELECT

export const selectProduct = createAction(
    ActionTypes.SELECT_PRODUCT,
    props<{ product: Product }>())

export const selectSearchResult = createAction(
    ActionTypes.SELECT_SEARCH_RESULT,
    props<{ searchDataResult: SearchDataResult }>())

/// PRODUCT DETAIL

export const getProductDetail = createAction(ActionTypes.GET_PRODUCT_DETAIL)
export const getProductDetailSuccess = createAction(
    ActionTypes.GET_PRODUCT_DETAIL_SUCCESS,
    props<{ productDetail: ProductDetail }>())
export const getProductDetailFailure = createAction(
    ActionTypes.GET_PRODUCT_DETAIL_FAILURE,
    props<{ error: any }>())

export const setProductDetailProperties = createAction(
    ActionTypes.SET_PRODUCT_DETAIL_PROPERTIES,
    props<{ productDetailProperties: ProductProperty[] }>())

export const postProductDetail = createAction(ActionTypes.POST_PRODUCT_DETAIL)
export const postProductDetailSuccess = createAction(
    ActionTypes.POST_PRODUCT_DETAIL_SUCCESS)
export const postProductDetailFailure = createAction(
    ActionTypes.POST_PRODUCT_DETAIL_FAILURE,
    props<{ error: any }>())

/// PRODUCT ASSOCIATION

export const getProductAssociation = createAction(ActionTypes.GET_PRODUCT_ASSOCIATION)
export const getProductAssociationSuccess = createAction(
    ActionTypes.GET_PRODUCT_ASSOCIATION_SUCCESS,
    props<{ productAssociation: ProductAssociation }>());
export const getProductAssociationFailure = createAction(
    ActionTypes.GET_PRODUCT_ASSOCIATION_FAILURE,
    props<{ error: any }>());

export const setProductAssociation = createAction(
    ActionTypes.SET_PRODUCT_ASSOCIATION,
    props<{ productAssociation: ProductAssociation }>())
export const setProductAssociationPrimaryCategory = createAction(
    ActionTypes.SET_PRODUCT_ASSOCIATION_PRIMARY_CATEGORY,
    props<{ primaryCategory: string }>())

export const postProductAssociation = createAction(ActionTypes.POST_PRODUCT_ASSOCIATION)
export const postProductAssociationSuccess = createAction(ActionTypes.POST_PRODUCT_ASSOCIATION_SUCCESS)
export const postProductAssociationFailure = createAction(ActionTypes.POST_PRODUCT_ASSOCIATION_FAILURE)

/// PRODUCTS

export const getProducts = createAction(
    ActionTypes.GET_PRODUCTS)
export const getProductsSuccess = createAction(
    ActionTypes.GET_PRODUCTS_SUCCESS,
    props<{ products: Product[] }>())
export const getProductsFailure = createAction(
    ActionTypes.GET_PRODUCTS_FAILURE,
    props<{ error: any }>())

/// UPDATE PROPERTIES

export const updateBaseProperties = createAction(
    ActionTypes.UPDATE_BASE_PROPERTIES,
    props<{ properties: ProductProperty[] }>());
export const updateCustomProperties = createAction(
    ActionTypes.UPDATE_CUSTOM_PROPERTIES,
    props<{ properties: ProductProperty[] }>());
export const updateVariantProperties = createAction(
    ActionTypes.UPDATE_VARIANT_PROPERTIES,
    props<{ properties: ProductProperty[] }>());

/// SEARCH FILTERS AND RESULTS

export const getSearchData = createAction(ActionTypes.GET_SEARCH_DATA)
export const getSearchDataForCatalog = createAction(
    ActionTypes.GET_SEARCH_DATA_FOR_CATALOG,
    props<{ catalogName: string }>())
export const getSearchDataForSelectedProduct = createAction(
    ActionTypes.GET_SEARCH_DATA_FOR_SELECTED_PRODUCT,
    props<{ searchType: string }>())
export const getSearchDataSuccess = createAction(
    ActionTypes.GET_SEARCH_DATA_SUCCESS,
    props<{ searchData: SearchData }>())
export const getSearchDataFailure = createAction(
    ActionTypes.GET_SEARCH_DATA_FAILURE,
    props<{ error: any }>())
export const setSearchDataLookFor = createAction(
    ActionTypes.SET_SEARCH_DATA_LOOK_FOR,
    props<{ value: string }>())
export const setSearchDataPostField = createAction(
    ActionTypes.SET_SEARCH_DATA_POST_FIELD,
    props<{ searcPostField: SearchPostField }>())
export const setSearchDataPostFieldNameAtIndex = createAction(
    ActionTypes.SET_SEARCH_DATA_POST_FIELD_NAME_AT_INDEX,
    props<{ fieldName: string, fieldType: SearchFieldType, index: number }>())
export const setSearchDataPostFieldConditionAtIndex = createAction(
    ActionTypes.SET_SEARCH_DATA_POST_FIELD_CONDITION_AT_INDEX,
    props<{ condition: string, index: number }>())
export const setSearchDataPostFieldOperatorAtIndex = createAction(
    ActionTypes.SET_SEARCH_DATA_POST_FIELD_OPERATOR_AT_INDEX,
    props<{ operator: string, index: number }>())
export const setSearchDataPostFieldValueAtIndex = createAction(
    ActionTypes.SET_SEARCH_DATA_POST_FIELD_VALUE_AT_INDEX,
    props<{ fieldValue: string, index: number }>())
export const addSearchDataPostFieldEmptyCondition = createAction(
    ActionTypes.ADD_SEARCH_DATA_POST_FIELD_EMPTY_CONDITION)
export const searchDataPostFieldRemoveConditionAtIndex = createAction(
    ActionTypes.SEARCH_DATA_POST_FIELD_REMOVE_CONDITION_AT_INDEX,
    props<{ index: number }>())
export const getSearchDataResult = createAction(ActionTypes.GET_SEARCH_DATA_RESULT)
export const getSearchDataResultSuccess = createAction(
    ActionTypes.GET_SEARCH_DATA_RESULT_SUCCESS,
    props<{ resultList: SearchDataResult[] }>())
export const getSearchDataResultFailure = createAction(
    ActionTypes.GET_SEARCH_DATA_RESULT_FAILURE,
    props<{ error: any }>())

/// UTILS

export const toggleDashboardSideMenu = createAction(
    ActionTypes.TOGGLE_DASHBOARD_SIDE_MENU);

export const clearDashboardData = createAction(
    ActionTypes.CLEAR_DASHBOARD_DATA);