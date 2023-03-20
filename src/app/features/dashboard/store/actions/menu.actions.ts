import { createAction, props } from "@ngrx/store";
import { Catalog } from "src/app/shared/interfaces/catalog";


export const MENU_GET_CATALOG_LIST = '[SIDE MENU] get catalog list';
export const MENU_SELECT_CATALOG = '[SIDE MENU] select catalog';

export const getCatalogs = createAction(
    MENU_GET_CATALOG_LIST,
    props<Catalog>()
);

export const selectCatalog = createAction(
    MENU_SELECT_CATALOG,
    props<Catalog>()
);