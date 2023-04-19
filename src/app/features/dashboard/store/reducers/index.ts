import { createReducer, on } from "@ngrx/store";
import Utils from "src/app/core/utils";
import { ProductType } from "src/app/shared/enums/product-type";
import { Product } from "src/app/shared/interfaces/product";
import {
    getCatalogProperties,
    getCatalogPropertiesFailure,
    getCatalogPropertiesSuccess,
    getCatalogs,
    getCatalogsFailure,
    getCatalogsSuccess,
    getCategories,
    getCategoriesFailure,
    getCategoriesSuccess,
    getCategoryProperties,
    getCategoryPropertiesFailure,
    getCategoryPropertiesSuccess,
    saveCatalogProperties,
    saveCatalogPropertiesFailure,
    saveCatalogPropertiesSuccess,
    saveCategoryProperties,
    saveCategoryPropertiesFailure,
    saveCategoryPropertiesSuccess,
    searchCatalog,
    selectCatalog,
    selectCategory,
} from "../actions";

import { DashboardModel } from "../models";

const initialState: DashboardModel = {
    loading: false,
    catalogs: [],
    currentCatalog: undefined,
    filteredCatalogs: [],
    products: [],
    currentProduct: undefined,
    currentProductDetail: undefined,
    propertiesLoading: false,
    error: undefined,
    navItems: []
}

export const dashboardReducer = createReducer(
    initialState,

    /**
     * CATALOGS AND FEATURES
     */
    on(getCatalogs, (state: DashboardModel) => ({
        ...state,
        loading: true,
    })),

    on(getCatalogsSuccess, (state: DashboardModel, data) => {
        var dataCatalogs = data.catalogs.map((v) => ({ ...v, type: ProductType.Catalog }))
        return {
            ...state,
            loading: false,
            catalogs: dataCatalogs,
            filteredCatalogs: dataCatalogs
        }
    }),

    on(getCatalogsFailure, (state: DashboardModel, data) => ({
        ...state,
        loading: false,
    })),

    /// SELECT CATALOG
    on(selectCatalog, (state: DashboardModel, data) => {
        return {
            ...state,
            currentCatalog: data.catalog,
            navItems: updateCatalogNavItems(state, data.catalog),
        };
    }),

    /// SEARCH CATALOG LOACALLY
    on(searchCatalog, (state: DashboardModel, data) => {
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
    on(getCatalogProperties, (state: DashboardModel, data) => ({
        ...state,
        loading: true,
        propertiesLoading: true,
    })),

    on(getCatalogPropertiesSuccess, (state: DashboardModel, data) => ({
        ...state,
        loading: false,
        currentProductDetail: data.catalog_properties,
        propertiesLoading: false,
    })),

    on(getCatalogPropertiesFailure, (state: DashboardModel, data) => ({
        ...state,
        loading: false,
        currentProductDetail: undefined,
        propertiesLoading: false,
    })),

    /// SAVE CATALOG PROPERTIES
    on(saveCatalogProperties, (state: DashboardModel, data) => ({
        ...state,
        propertiesLoading: true,
    })),

    on(saveCatalogPropertiesSuccess, (state: DashboardModel, data) => ({
        ...state,
        propertiesLoading: false,
    })),

    on(saveCatalogPropertiesFailure, (state: DashboardModel, data) => ({
        ...state,
        propertiesLoading: false,
    })),

    /**
     * CATEGORIES
     */
    on(getCategories, (state: DashboardModel) => ({
        ...state,
        loading: true,
    })),

    on(getCategoriesSuccess, (state: DashboardModel, data) => {
        return {
            ...state,
            loading: false,
            products: data.categories,
        };
    }),

    on(getCategoriesFailure, (state: DashboardModel, data) => ({
        ...state,
        loading: false,
    })),

    on(selectCategory, (state: DashboardModel, data) => {
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

    on(getCategoryProperties, (state: DashboardModel, data) => ({
        ...state,
        loading: true,
        propertiesLoading: true,
    })),

    on(getCategoryPropertiesSuccess, (state: DashboardModel, data) => ({
        ...state,
        loading: false,
        currentProductDetail: data.product_detail,
        propertiesLoading: false,
    })),

    on(getCategoryPropertiesFailure, (state: DashboardModel, data) => ({
        ...state,
        loading: false,
        currentProductDetail: undefined,
        propertiesLoading: false,
    })),

    on(saveCategoryProperties, (state: DashboardModel, data) => ({
        ...state,
        propertiesLoading: true,
    })),

    on(saveCategoryPropertiesSuccess, (state: DashboardModel, data) => ({
        ...state,
        propertiesLoading: false,
    })),

    on(saveCategoryPropertiesFailure, (state: DashboardModel, data) => ({
        ...state,
        propertiesLoading: false,
    })),



);

function updateCatalogNavItems(state: DashboardModel, data: Product) {
    return [data]
}

function updateCategoryNavItems(state: DashboardModel, data: Product) {
    var navItems = [...state.navItems, data]
    const filteredArray = navItems.filter((obj, index, self) => index === self.findIndex((t) => t.name === obj.name && t.id === obj.id))
    const index = filteredArray.findIndex((obj) => obj.name === data.name && obj.id === data.id)
    const resultArray = filteredArray.slice(0, index + 1)
    return resultArray
}
