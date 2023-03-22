import { Catalog } from "src/app/shared/interfaces/catalog";
import { Category } from "src/app/shared/interfaces/category";

export enum NavItemModelType {   
    Catalog = 0,
    Category = 1,
    Product = 2 
}

export interface NavItemModel {
    type: NavItemModelType
    id?: number
    title: string
    childs: number
}

export interface DashboardModel {
    loading: boolean
    catalogs: Catalog[]
    filteredCatalog: Catalog[]
    categories: Category[]
    error: any
    selectedCatalog: Catalog | undefined
    navItems: NavItemModel[]
}
