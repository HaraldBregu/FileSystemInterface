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
    getSubCategories,
    getSubCategoriesFailure,
    getSubCategoriesSuccess,
    searchCatalog,
    selectCatalog
} from "../actions";
import { DashboardModel } from "../models";

const initialState: DashboardModel = {
    loading: false,
    catalogs: [],
    filteredCatalog: [],
    categories: [],
    error: undefined,
    selectedCatalog: undefined,
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
        filteredCatalog: data.catalogs,
    })),

    on(getCatalogsFailure, (state: DashboardModel, data) => ({
        ...state,
        loading: false,
    })),

    on(selectCatalog, (state: DashboardModel, data) => {
        return {
            ...state,
            selectedCatalog: data.product,
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
            filteredCatalog: filteredCatalogs
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
            categories: data.categories,
        };
    }),

    on(getCategoriesFailure, (state: DashboardModel, data) => ({
        ...state,
        loading: false,
    })),

    on(getSubCategories, (state: DashboardModel) => ({
        ...state,
        loading: true,
    })),

    on(getSubCategoriesSuccess, (state: DashboardModel, data) => {
        return {
            ...state,
            loading: false,
            //categories: data.categories,
            //navItems: updateCategoryNavItems(state, data),
        };
    }),

    on(getSubCategoriesFailure, (state: DashboardModel, data) => ({
        ...state,
        loading: false,
    })),

);


function updateCatalogNavItems(state: DashboardModel, data: Product) {
    var navItems: Product[] = []
    navItems.push({
        id: 0,
        type: ProductType.Catalog,
        name: data.name,
        items_count: 0,
    })

    console.log("---------------")
    console.log(data.name)
    console.log("---------------")

    return navItems
}

function updateCategoryNavItems(state: DashboardModel, data: Product) {
    var navItems: Product[] = [...state.navItems]

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
