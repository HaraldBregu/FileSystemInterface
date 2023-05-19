import { createReducer, on } from "@ngrx/store";
import Utils from "src/app/core/utils";
import { ProductType } from "src/app/shared/enums/product-type";
import { Product } from "src/app/shared/interfaces/product";
import {
    clearNavItems,
    getApiEnvironments,
    getApiEnvironmentsFailure,
    getApiEnvironmentsSuccess,
    getCatalogProperties,
    getCatalogPropertiesFailure,
    getCatalogPropertiesSuccess,
    getCatalogs,
    getCatalogsFailure,
    getCatalogsSuccess,
    getCategories,
    getCategoriesFailure,
    getCategoriesSuccess,
    getCategoryAssociations,
    getCategoryAssociationsFailure,
    getCategoryAssociationsSuccess,
    getCategoryProperties,
    getCategoryPropertiesFailure,
    getCategoryPropertiesSuccess,
    getSearchFilters,
    getSearchFiltersFailure,
    getSearchFiltersSuccess,
    getSearchResult,
    getSearchResultFailure,
    getSearchResultSuccess,
    saveCatalogProperties,
    saveCatalogPropertiesFailure,
    saveCatalogPropertiesSuccess,
    saveCategoryProperties,
    saveCategoryPropertiesFailure,
    saveCategoryPropertiesSuccess,
    searchCatalog,
    selectCatalog,
    selectCategory,
    setApiEnv,
    toggleDashboardSideMenu,
} from "../actions";

import { DashboardModelState } from "../models";

const initialState: DashboardModelState = {
    apiEnvironment: "",
    loading: false,
    catalogs: [],
    currentCatalog: undefined,
    filteredCatalogs: [],
    products: [],
    currentProduct: undefined,
    currentProductDetail: undefined,
    getCurrentProductDetailLoading: false,
    saveCurrentProductDetailLoading: false,
    currentProductAssociation: undefined,
    error: undefined,
    navItems: [],
    baseProperties: [],
    customProperties: [],
    variantProperties: [],
    environments: [],
    searchData: undefined,
    searchDataResult: [],
    dashboardSideMenuOpened: false
}

export const dashboardReducer = createReducer(
    initialState,

    /**
    * SET API ENV
    */
    on(setApiEnv, (state: DashboardModelState, data) => ({
        ...state,
        apiEnvironment: data.environment,
    })),

    /**
     * CATALOGS AND FEATURES
     */
    on(getCatalogs, (state: DashboardModelState) => ({
        ...state,
        loading: true,
        currentProductAssociation: undefined,
    })),

    on(getCatalogsSuccess, (state: DashboardModelState, data) => {
        var dataCatalogs = data.catalogs.map((v) => ({ ...v, type: ProductType.Catalog }))
        return {
            ...state,
            loading: false,
            catalogs: dataCatalogs,
            filteredCatalogs: dataCatalogs
        }
    }),

    on(getCatalogsFailure, (state: DashboardModelState, data) => ({
        ...state,
        loading: false,
    })),

    /// SELECT CATALOG
    on(selectCatalog, (state: DashboardModelState, data) => {
        return {
            ...state,
            currentCatalog: data.catalog,
            navItems: [data.catalog],
            currentProduct: undefined,
        };
    }),

    /// SEARCH CATALOG LOACALLY
    on(searchCatalog, (state: DashboardModelState, data) => {
        const filteredCatalogs = Utils.isBlankString(data.catalog_name) ?
            state.catalogs :
            state.catalogs.filter(
                content => content.name.toLowerCase().includes(data.catalog_name.toLowerCase()))
        return {
            ...state,
            filteredCatalogs: filteredCatalogs
        };
    }),

    /// GET CATALOG PROPERTIES
    on(getCatalogProperties, (state: DashboardModelState, data) => ({
        ...state,
        loading: true,
        getCurrentProductDetailLoading: true,
        baseProperties: [],
        customProperties: [],
        variantProperties: [],
        currentProductAssociation: undefined,
    })),

    on(getCatalogPropertiesSuccess, (state: DashboardModelState, data) => ({
        ...state,
        loading: false,
        currentProductDetail: data.catalog_properties,
        getCurrentProductDetailLoading: false,
        baseProperties: data.catalog_properties.properties.filter(data => data.type === "Base"),
        customProperties: data.catalog_properties.properties.filter(data => data.type === "Custom"),
        variantProperties: data.catalog_properties.properties.filter(data => data.type === "Variant"),
    })),

    on(getCatalogPropertiesFailure, (state: DashboardModelState, data) => ({
        ...state,
        loading: false,
        currentProductDetail: undefined,
        getCurrentProductDetailLoading: false,
        baseProperties: [],
        customProperties: [],
        variantProperties: [],
    })),

    /// SAVE CATALOG PROPERTIES
    on(saveCatalogProperties, (state: DashboardModelState, data) => ({
        ...state,
        saveCurrentProductDetailLoading: true,
    })),

    on(saveCatalogPropertiesSuccess, (state: DashboardModelState, data) => ({
        ...state,
        saveCurrentProductDetailLoading: false,
    })),

    on(saveCatalogPropertiesFailure, (state: DashboardModelState, data) => ({
        ...state,
        saveCurrentProductDetailLoading: false,
    })),

    /**
     * CATEGORIES
     */
    on(getCategories, (state: DashboardModelState) => ({
        ...state,
        loading: true,
    })),

    on(getCategoriesSuccess, (state: DashboardModelState, data) => {
        return {
            ...state,
            loading: false,
            products: data.categories,
        };
    }),

    on(getCategoriesFailure, (state: DashboardModelState, data) => ({
        ...state,
        loading: false,
    })),

    on(selectCategory, (state: DashboardModelState, data) => {
        const newCategory: Product = {
            ...data.category,
            parent: state.navItems.at(-1)
        }

        var prs: Product[] = []
        if (data.category.type !== ProductType.File &&
            data.category.type !== ProductType.FileVariant) {
            prs = state.products
        }

        return {
            ...state,
            products: prs,
            currentProduct: newCategory,
            navItems: updateCategoryNavItems(state, newCategory),
        };
    }),

    on(getCategoryProperties, (state: DashboardModelState, data) => ({
        ...state,
        loading: true,
        getCurrentProductDetailLoading: true,
        baseProperties: [],
        customProperties: [],
        variantProperties: [],
        currentProductAssociation: undefined,
    })),

    on(getCategoryPropertiesSuccess, (state: DashboardModelState, data) => ({
        ...state,
        loading: false,
        currentProductDetail: data.product_detail,
        getCurrentProductDetailLoading: false,
        baseProperties: data.product_detail.properties.filter(data => data.type === "Base"),
        customProperties: data.product_detail.properties.filter(data => data.type === "Custom"),
        variantProperties: data.product_detail.properties.filter(data => data.type === "Variant"),
    })),

    on(getCategoryPropertiesFailure, (state: DashboardModelState, data) => ({
        ...state,
        loading: false,
        currentProductDetail: undefined,
        getCurrentProductDetailLoading: false,
        baseProperties: [],
        customProperties: [],
        variantProperties: [],
    })),

    on(saveCategoryProperties, (state: DashboardModelState, data) => ({
        ...state,
        saveCurrentProductDetailLoading: true,
    })),

    on(saveCategoryPropertiesSuccess, (state: DashboardModelState, data) => ({
        ...state,
        saveCurrentProductDetailLoading: false,
    })),

    on(saveCategoryPropertiesFailure, (state: DashboardModelState, data) => ({
        ...state,
        saveCurrentProductDetailLoading: false,
    })),

    on(getCategoryAssociations, (state: DashboardModelState, data) => ({
        ...state,
        currentProductAssociation: undefined
    })),

    on(getCategoryAssociationsSuccess, (state: DashboardModelState, data) => ({
        ...state,
        currentProductAssociation: data.product_association,
    })),

    on(getCategoryAssociationsFailure, (state: DashboardModelState, data) => ({
        ...state,
        currentProductAssociation: undefined
    })),

    on(getApiEnvironments, (state: DashboardModelState) => ({
        ...initialState,
    })),

    on(getApiEnvironmentsSuccess, (state: DashboardModelState, data) => ({
        ...state,
        environments: data.environments
    })),

    on(getApiEnvironmentsFailure, (state: DashboardModelState, data) => ({
        ...state,
        environments: []
    })),

    on(getSearchFilters, (state: DashboardModelState) => ({
        ...state,
        searchData: undefined,
        searchDataResult: []
    })),

    on(getSearchFiltersSuccess, (state: DashboardModelState, data) => ({
        ...state,
        searchData: data.searchData,
    })),

    on(getSearchFiltersFailure, (state: DashboardModelState, data) => ({
        ...state,
        searchData: undefined
    })),

    on(getSearchResult, (state: DashboardModelState, data) => ({
        ...state,
        searchData: data.searchData,
        searchDataResult: []
    })),

    on(getSearchResultSuccess, (state: DashboardModelState, data) => ({
        ...state,
        searchDataResult: data.resultList
    })),

    on(getSearchResultFailure, (state: DashboardModelState, data) => ({
        ...state,
        searchDataResult: []
    })),

    on(toggleDashboardSideMenu, (state: DashboardModelState) => ({
        ...state,
        dashboardSideMenuOpened: !state.dashboardSideMenuOpened
    })),

    on(clearNavItems, (state: DashboardModelState) => ({
        ...state,
        navItems: [],
        currentCatalog: undefined,
        products: [],
        currentProduct: undefined
    })),

)

function updateCategoryNavItems(state: DashboardModelState, data: Product) {
    var navItems = [...state.navItems, data]
    const filteredArray = navItems.filter((obj, index, self) => index === self.findIndex((t) => t.name === obj.name && t.id === obj.id))
    const index = filteredArray.findIndex((obj) => obj.name === data.name && obj.id === data.id)
    const resultArray = filteredArray.slice(0, index + 1)
    return resultArray
}
