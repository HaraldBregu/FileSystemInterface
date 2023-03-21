import { Catalog } from "src/app/shared/interfaces/catalog";
import { Category } from "src/app/shared/interfaces/category";

export interface DashboardModel {
    loading: boolean,
    loaded: boolean,
    catalogs: Catalog[];
    categories: Category[]
    error: any;
    selectedCatalog: Catalog | undefined
}
