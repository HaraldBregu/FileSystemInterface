import { createReducer, on } from "@ngrx/store";
import { getCatalogs, getCatalogsFailure, getCatalogsSuccess, getCategories, getCategoriesFailure, getCategoriesSuccess, selectCatalog } from "../actions";
import { DashboardModel, NavItemModel, NavItemModelType } from "../models";

const initialState: DashboardModel = {
    loading: false,
    catalogs: [],
    categories: [],
    error: undefined,
    selectedCatalog: undefined,
    navItems: []
}

export const menuReducer = createReducer(
    initialState,

    on(getCatalogs, (state: DashboardModel) => ({
        ...state,
        loading: true
    })),

    on(getCatalogsSuccess, (state: DashboardModel, data) => ({
        ...state,
        loading: false,
        catalogs: data.catalogs,
    })),

    on(getCatalogsFailure, (state: DashboardModel, data) => ({
        ...state,
        loading: false,
    })),

    on(selectCatalog, (state: DashboardModel, data) => {
        const catalog: NavItemModel = { 
            type: NavItemModelType.Catalog, 
            title: data.name, 
            childs: 0, 
        };

        return {
            ...state,
            selectedCatalog: data,
            navItems: [catalog]
        };
    }),

    on(getCategories, (state: DashboardModel) => ({
        ...state,
        loading: true,
    })),

    on(getCategoriesSuccess, (state: DashboardModel, data) => {
        var navItems: NavItemModel[] = state.navItems;

        if (navItems.length === 1) {
            var newItem: NavItemModel = {
                type: navItems[0].type,
                title: navItems[0].title,
                childs: data.categories.length,
            }
            navItems = [newItem]
        }

        return {
            ...state,
            loading: false,
            categories: data.categories,
            navItems: navItems,
        };
    }),

    on(getCategoriesFailure, (state: DashboardModel, data) => ({
        ...state,
        loading: false,
    })),

);