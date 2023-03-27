import { createReducer, on } from "@ngrx/store";
import Utils from "src/app/core/utils";
import { ProductType } from "src/app/shared/enums/product-type";
import { Product } from "src/app/shared/interfaces/product";
import {
    getCatalogs,
    getCatalogsFailure,
    getCatalogsSuccess,
    getCategories,
    getCategoriesFailure,
    getCategoriesSuccess,
    getProductDetail,
    getProductDetailFailure,
    getProductDetailSuccess,
    searchCatalog,
    selectCatalog,
    selectCategory
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
    error: undefined,
    navItems: []
}

export const dashboardReducer = createReducer(
    initialState,

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

    on(selectCatalog, (state: DashboardModel, data) => {
        return {
            ...state,
            currentCatalog: data.catalog,
            navItems: updateCatalogNavItems(state, data.catalog),
        };
    }),

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

    on(getCategories, (state: DashboardModel) => ({
        ...state,
        loading: true,
    })),

    on(getCategoriesSuccess, (state: DashboardModel, data) => {
        return {
            ...state,
            loading: false,
            products: data.categories,
            //navItems: navItems,
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
        return {
            ...state,
            currentProduct: newCategory,
            navItems: updateCategoryNavItems(state, newCategory),
        };
    }),

    on(getProductDetail, (state: DashboardModel, data) => ({
        ...state,
        loading: true,
    })),

    on(getProductDetailSuccess, (state: DashboardModel, data) => ({
        ...state,
        loading: false,
        currentProductDetail: data.product_detail,
    })),

    on(getProductDetailFailure, (state: DashboardModel, data) => ({
        ...state,
        loading: false,
        currentProductDetail: undefined,
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
