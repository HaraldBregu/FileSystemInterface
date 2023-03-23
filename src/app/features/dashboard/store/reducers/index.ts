import { createReducer, on } from "@ngrx/store";
import Utils from "src/app/core/utils";
import { Product } from "src/app/shared/interfaces/product";
import {
    getCatalogs,
    getCatalogsFailure,
    getCatalogsSuccess,
    getCategories,
    getCategoriesFailure,
    getCategoriesSuccess,
    getSubCategories,
    getSubCategoriesFailure,
    getSubCategoriesSuccess,
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
    error: undefined,
    navItems: []
}

export const dashboardReducer = createReducer(
    initialState,

    on(getCatalogs, (state: DashboardModel) => ({
        ...state,
        loading: true,
    })),

    on(getCatalogsSuccess, (state: DashboardModel, data) => ({
        ...state,
        loading: false,
        catalogs: data.catalogs,
        filteredCatalogs: data.catalogs,
    })),

    on(getCatalogsFailure, (state: DashboardModel, data) => ({
        ...state,
        loading: false,
    })),

    on(selectCatalog, (state: DashboardModel, data) => {
        return {
            ...state,
            currentCatalog: data.product,
            navItems: updateCatalogNavItems(state, data.product),
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
        };
    }),

    on(getCategoriesFailure, (state: DashboardModel, data) => ({
        ...state,
        loading: false,
    })),

    on(selectCategory, (state: DashboardModel, data) => {
        return {
            ...state,
            currentCatalog: data.category,
            navItems: updateCatalogNavItems(state, data.category),
        };
    }),

    on(getSubCategories, (state: DashboardModel) => ({
        ...state,
        loading: true,
    })),

    on(getSubCategoriesSuccess, (state: DashboardModel, data) => {
        return {
            ...state,
            loading: false,
            categories: data.categories,
        };
    }),

    on(getSubCategoriesFailure, (state: DashboardModel, data) => ({
        ...state,
        loading: false,
    })),

);


function updateCatalogNavItems(state: DashboardModel, data: Product) {
    var navItems: Product[] = []
  
    navItems.push(data)

    console.log("---------------")
    console.log(data.name)
    console.log("---------------")

    return navItems
}

function updateCategoryNavItems(state: DashboardModel, data: Product) {
    var navItems: Product[] = [...state.navItems]

    navItems.push(data)

    console.log("---------------")
    console.log(data.name)
    console.log("---------------")

    return navItems
}

/*
function uniqForObject<T>(array: T[]): T[] {
    const result: T[] = [];
    for (const item of array) {
        const found = result.some((value) => isEqual(value, item));
        if (!found) {
            result.push(item);
        }
    }
    return result;
}*/
