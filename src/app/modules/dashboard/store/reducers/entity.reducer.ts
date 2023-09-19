import { createReducer, on } from "@ngrx/store";
import {
    productStateFail,
    productStateInitial,
    productStateStart
} from "../states";
import {
    getNavigationItems,
    getNavigationItemsFailure,
    getNavigationItemsSuccess,
    selectNavigationItem
} from "../actions/navigation.actions";
import { ProductType } from "src/app/shared/enums/product-type";
import {
    getCatalogs,
    getCatalogsFailure,
    getCatalogsSuccess,
    getProductAssociationFailure,
    getProductAssociationSuccess,
    getProductDetail,
    getProductDetailFailure,
    getProductDetailSuccess,
    getProducts,
    getProductsFailure,
    getProductsSuccess,
    selectProduct,
    selectSearchResult,
} from "../actions/actions";
import { addEntity, addEntityFailure, addEntitySuccess, deleteEntity, deleteEntityFailure, deleteEntitySuccess, getDefinitionNames, getDefinitionNamesFailure, getDefinitionNamesSuccess } from "../actions/entity.action";

export const productReducer = createReducer(
    productStateInitial,

    on(selectNavigationItem, (state) => ({
        ...state,
        loading: true,
    })),

    on(getCatalogs, (state) => ({
        ...productStateStart,
    })),

    on(getCatalogsSuccess, (state, data) => ({
        ...productStateInitial,
        loading: false,
        productList: data.productList.map((v) => ({
            ...v,
            type: ProductType.Catalog,
        })),
    })),

    on(getCatalogsFailure, (state, data) => ({
        ...productStateFail,
    })),

    /// SELECT PRODUCT

    on(selectProduct, (state, data) => ({
        ...state,
        catalogName: (data.product.type === ProductType.Catalog) ? data.product.name : state.catalogName,
        productId: data.product.id,
        productName: data.product.name,
        productType: data.product.type,
        loading: true,
    })),

    on(getProducts, (state) => ({
        ...state,
        loading: true,
    })),

    on(getProductsSuccess, (state, data) => ({
        ...state,
        productList: data.products,
        loading: false,
    })),

    on(getProductsFailure, (state, data) => ({
        ...state,
        loading: false,
    })),

    /// PRODUCT DETAIL

    on(getProductDetail, (state, data) => ({
        ...state,
        loading: true,
    })),

    on(getProductDetailSuccess, (state, data) => {
        const stringsToRemove = ["BaseProperties", "CustomProperties", "Variants", "Associations"];
        var tabs: string[] = [...state.productDetailTabs]
            .filter(tab => !stringsToRemove.includes(tab))

        const baseProperties = data.productDetail?.properties.filter(data => data.type === "Base")
        const customProperties = data.productDetail?.properties.filter(data => data.type === "Custom")
        const variantProperties = data.productDetail?.properties.filter(data => data.type === "Variant")

        if (baseProperties.length > 0)
            tabs.push("BaseProperties")
        if (customProperties.length > 0)
            tabs.push("CustomProperties")
        if (variantProperties.length > 0)
            tabs.push("Variants")

        return {
            ...state,
            productDetailTabs: tabs,
            loading: false,
        }
    }),

    on(getProductDetailFailure, (state, data) => {
        const stringsToRemove = ["BaseProperties", "CustomProperties", "Variants"];
        var tabs: string[] = [...state.productDetailTabs]
            .filter(tab => !stringsToRemove.includes(tab))

        return {
            ...state,
            productDetailTabs: tabs,
            loading: false
        }
    }),

    on(getProductAssociationSuccess, (state, data) => ({
        ...state,
        productDetailTabs: [
            ...state.productDetailTabs,
            "Associations",
        ],
    })),

    on(getProductAssociationFailure, (state, data) => ({
        ...state,
        productDetailTabs: [
            ...state.productDetailTabs,
        ].filter(tab => tab !== "Associations")
    })),

    /// SELECT SEARCH RESULT

    on(selectSearchResult, (state, data) => ({
        ...state,
        loading: true,
    })),

    /// NAVIGATION

    on(getNavigationItems, (state) => ({
        ...state,
        loading: true,
    })),

    on(getNavigationItemsSuccess, (state, data) => {
        const navItems = data.items
        const navItemsFiltered = navItems.filter(data => data.type !== ProductType.File && data.type !== ProductType.FileVariant)
        const catalogName = navItems.at(0)?.catalogname ?? ""
        const lastItem = navItems.at(-1)
        const lastItemType = lastItem?.type ?? ProductType.None
        const lastItemId = lastItemType === ProductType.Catalog ? undefined : lastItem?.oid
        const lastItemName = lastItem?.categoryname ?? ""

        return {
            ...state,
            loading: true,
            catalogName: catalogName,
            productId: lastItemId,
            productType: lastItemType,
            productName: lastItemName,
            navigationItems: navItemsFiltered
        }
    }),

    on(getNavigationItemsFailure, (state) => ({
        ...state,
        loading: false,
    })),

    on(getDefinitionNames, (state) => ({
        ...state,
    })),

    on(getDefinitionNamesSuccess, (state, data) => ({
        ...state,
        definitionNames: data.data,
    })),

    on(getDefinitionNamesFailure, (state) => ({
        ...state,
        definitionNames: [],
    })),

    on(addEntity, (state) => ({
        ...state,
        loading: true,
    })),

    on(addEntitySuccess, (state) => ({
        ...state,
        loading: false,
    })),

    on(addEntityFailure, (state) => ({
        ...state,
        loading: false,
    })),

    on(deleteEntity, (state) => ({
        ...state,
        loading: true,
    })),

    on(deleteEntitySuccess, (state) => ({
        ...state,
        loading: false,
        //productId: state.navigationItems?.at(-1)?.parentoid,
        //productName: state.navigationItems?.at(-2)?.oid,
        //productType: state.navigationItems?.at(-2)?.oid,
    })),

    on(deleteEntityFailure, (state) => ({
        ...state,
        loading: false,
    })),
)