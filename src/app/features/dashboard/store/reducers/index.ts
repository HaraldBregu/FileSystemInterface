import { createReducer, on } from "@ngrx/store";
import { Catalog } from "src/app/shared/interfaces/catalog";
import { getCatalogs, getCatalogsFailure, getCatalogsSuccess, getCategories, getCategoriesFailure, getCategoriesSuccess, selectCatalog } from "../actions";
import { DashboardModel } from "../models";

const initialState: DashboardModel = {
    loading: false,
    loaded: true,
    catalogs: [],
    categories: [],
    error: undefined,
    selectedCatalog: undefined
}

export const menuReducer = createReducer(
    initialState,

    on(getCatalogs, (state: DashboardModel) =>  ({
        ...state
    })),

    on(getCatalogsSuccess, (state, data) =>({
        ...state,
        loaded: true,
        loading: false,
        catalogs: data.catalogs
    })),

    on(getCatalogsFailure, (state, data) =>({
        ...state,
        loaded: false,
        loading: false,
    })),

    on(selectCatalog, (state, data) => ({
        ...state,
        selectedCatalog: data
    })),

    
    on(getCategories, (state: DashboardModel) =>  ({
        ...state
    })),

    on(getCategoriesSuccess, (state, data) =>({
        ...state,
        loaded: true,
        loading: false,
        categories: data.categories
    })),

    on(getCategoriesFailure, (state, data) =>({
        ...state,
        loaded: false,
        loading: false,
    })),


/*
    on(selectCatalog, (catalog, product) => {
        return product;
    })
*/


);