import { Catalog } from "src/app/shared/interfaces/catalog";

export interface DashboardModel {
    loading: boolean,
    loaded: boolean,
    catalogs: Catalog[];
    error: any;
    selectedCatalog: Catalog | undefined
}
