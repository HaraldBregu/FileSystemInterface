import { createReducer, on } from "@ngrx/store";
import { Catalog } from "src/app/shared/interfaces/catalog";
import { selectCatalog } from "../actions/menu.actions";

export const initialSelectedCatalog: Catalog = { id: 0, name: "", content: 0 };

export const menuReducer = createReducer(
    initialSelectedCatalog,
    on(selectCatalog, (_: Catalog) => initialSelectedCatalog),
    on(selectCatalog, (catalog: Catalog, product) => {
        return product;
    }),
);