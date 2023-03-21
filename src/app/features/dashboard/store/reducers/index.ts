import { createReducer, on } from "@ngrx/store";
import { Catalog } from "src/app/shared/interfaces/catalog";
import { getCatalogs, getCatalogsFailure, getCatalogsSuccess, selectCatalog } from "../actions";
import { DashboardModel } from "../models";

const initialState: DashboardModel = {
    loading: false,
    loaded: true,
    catalogs: [],
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
        catalogs: data.items
    })),

    on(getCatalogsFailure, (state, data) =>({
        ...state,
        loaded: false,
        loading: false,
    })),
/*
    on(getCatalogsFailure, (state, data) => {

        state.error = data.error;

        return state
    })
*/

/*
    on(selectCatalog, (catalog, product) => {
        return product;
    })
*/


);