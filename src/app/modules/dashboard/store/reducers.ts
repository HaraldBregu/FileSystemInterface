import { createFeature, createReducer, on } from "@ngrx/store";
import { ProductType } from "src/app/shared/enums/product-type";
import {
    addSearchDataPostFieldEmptyCondition,
    clearDashboardData,
    getCatalogs,
    getCatalogsFailure,
    getCatalogsSuccess,
    getProductAssociation,
    getProductAssociationFailure,
    getProductAssociationSuccess,
    getProductDetail,
    getProductDetailFailure,
    getProductDetailSuccess,
    getProducts,
    getProductsFailure,
    getProductsSuccess,
    getSearchData,
    getSearchDataFailure,
    getSearchDataForCatalog,
    getSearchDataForSelectedProduct,
    getSearchDataResult,
    getSearchDataResultFailure,
    getSearchDataResultSuccess,
    getSearchDataSuccess,
    postProductAssociation,
    postProductAssociationFailure,
    postProductAssociationSuccess,
    postProductDetail,
    postProductDetailFailure,
    postProductDetailSuccess,
    searchDataPostFieldRemoveConditionAtIndex,
    selectProduct,
    selectSearchResult,
    setProductAssociation,
    setProductAssociationPrimaryCategory,
    setProductDetailProperties,
    setSearchDataLookFor,
    setSearchDataPostField,
    setSearchDataPostFieldConditionAtIndex,
    setSearchDataPostFieldNameAtIndex,
    setSearchDataPostFieldOperatorAtIndex,
    setSearchDataPostFieldValueAtIndex,
    toggleDashboardSideMenu,
} from "./actions/actions";
import {
    DashboardState,
    productAssociationStateFail,
    productAssociationStateInitial,
    productAssociationStateStart,
    productDetailStateFail,
    productDetailStateInitial,
    productDetailStateStart,
    productStateFail,
    productStateInitial,
    productStateStart,
    searchDataStateInitial
} from "./state";
import { ProductAssociation, productAssociationInitial } from "src/app/shared/interfaces/product-association";
import { SearchData, SearchPostField, searchDataPostFieldEmpty } from "src/app/shared/interfaces/search-data";
import { getNavigationItems, getNavigationItemsFailure, getNavigationItemsSuccess, selectNavigationItem } from "./actions/navigation.actions";

const initialState: DashboardState = {
    dashboardSideMenuOpened: false,
    productState: productStateInitial,
    productDetailState: { ...productDetailStateInitial },
    productAssociationState: { ...productAssociationStateInitial },
    searchDataState: { ...searchDataStateInitial },
}

export const dashboardReducer = createReducer(
    initialState,

    /// NAVIGATION 
    
    on(selectNavigationItem, (state) => ({
        ...state,
        productState: {
            ...state.productState,
            loading: true,
        }
    })),

    /// CATALOGS 

    on(getCatalogs, (state: DashboardState) => {
        return {
            ...state,
            productState: { ...productStateStart },
            productDetailState: { ...productDetailStateInitial },
            productAssociationState: { ...productAssociationStateInitial },
            searchDataState: { ...searchDataStateInitial },
        }
    }),

    on(getCatalogsSuccess, (state: DashboardState, data) => {
        return {
            ...state,
            productState: {
                ...productStateInitial,
                loading: false,
                productList: data.productList.map((v) => ({ ...v, type: ProductType.Catalog })),
            }
        }
    }),

    on(getCatalogsFailure, (state: DashboardState, data) => {
        return {
            ...state,
            productState: productStateFail,
        }
    }),

    /// SELECT PRODUCT

    on(selectProduct, (state: DashboardState, data) => {
        const isCatalog = data.product.type === ProductType.Catalog

        return {
            ...state,
            productState: {
                ...state.productState,
                catalogName: isCatalog ? data.product.name : state.productState.catalogName,
                productId: data.product.id,
                productName: data.product.name,
                productType: data.product.type,
                loading: true,
            },
            productDetailState: {
                ...productDetailStateStart
            },
            productAssociationState: {
                ...productAssociationStateStart,
                loading: isCatalog ? false : true
            },
        }
    }),

    on(getProducts, (state: DashboardState) => ({
        ...state,
        productState: {
            ...state.productState,
            loading: true,
        },
    })),

    on(getProductsSuccess, (state: DashboardState, data) => ({
        ...state,
        productState: {
            ...state.productState,
            productList: data.products,
            loading: false,
        },
    })),

    on(getProductsFailure, (state: DashboardState, data) => ({
        ...state,
        productState: {
            ...state.productState,
            loading: false,
        },
    })),

    /// PRODUCT DETAIL

    on(getProductDetail, (state: DashboardState, data) => {
        return {
            ...state,
            productState: {
                ...state.productState,
                loading: true,
            },
            // productDetailState: { ...productDetailStateStart },
        }
    }),

    on(getProductDetailSuccess, (state: DashboardState, data) => {
        const stringsToRemove = ["BaseProperties", "CustomProperties", "Variants", "Associations"];
        var tabs: string[] = [...state.productState.productDetailTabs]
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
            productState: {
                ...state.productState,
                productDetailTabs: tabs,
                loading: false,
            },
            productDetailState: {
                ...productDetailStateInitial,
                productDetail: {
                    ...data.productDetail,
                },
            },
            productAssociationState: productAssociationStateInitial,
        }
    }),

    on(getProductDetailFailure, (state: DashboardState, data) => {
        const stringsToRemove = ["BaseProperties", "CustomProperties", "Variants"];
        var tabs: string[] = [...state.productState.productDetailTabs]
            .filter(tab => !stringsToRemove.includes(tab))

        return {
            ...state,
            productState: {
                ...state.productState,
                productDetailTabs: tabs,
                loading: false
            },
            productDetailState: { ...productDetailStateFail },
        }
    }),

    on(setProductDetailProperties, (state: DashboardState, data) => ({
        ...state,
        productDetailState: {
            ...state.productDetailState,
            productDetail: {
                ...state.productDetailState.productDetail,
                properties: state.productDetailState.productDetail.properties
                    .map(prop => {
                        const matchingObject = data.productDetailProperties.find(updatedObj => updatedObj.name === prop.name)
                        return matchingObject ? matchingObject : prop;
                    })
            }
        }
    })),

    on(postProductDetail, (state: DashboardState, data) => ({
        ...state,
        productDetailState: {
            ...state.productDetailState,
            loading: true,
        },
    })),

    on(postProductDetailSuccess, (state: DashboardState, data) => ({
        ...state,
        productDetailState: {
            ...state.productDetailState,
            loading: false,
        },
    })),

    on(postProductDetailFailure, (state: DashboardState, data) => ({
        ...state,
        productDetailState: {
            ...state.productDetailState,
            loading: false,
        },
    })),

    /// ASSOCIATION 

    on(getProductAssociation, (state: DashboardState, data) => ({
        ...state,
        productAssociationState: productAssociationStateStart,
    })),

    on(getProductAssociationSuccess, (state: DashboardState, data) => {
        var prod = data.productAssociation ?? productAssociationInitial

        var newProd: ProductAssociation = {
            ...prod,
            id: (state.productState.productId ?? 0),
            catalogname: state.productState.navigationItems[0].catalogname,
        }

        const stringToRemove = "Associations"
        var tabs: string[] = [...state.productState.productDetailTabs]

        tabs.push(stringToRemove)

        return {
            ...state,
            productState: {
                ...state.productState,
                productDetailTabs: tabs,
            },
            productAssociationState: {
                ...productAssociationStateInitial,
                productAssociation: newProd,
            }
        }
    }),

    on(getProductAssociationFailure, (state: DashboardState, data) => {
        const stringToRemove = "Associations";
        var tabs: string[] = [...state.productState.productDetailTabs]
            .filter(tab => tab !== stringToRemove)

        return {
            ...state,
            productState: {
                ...state.productState,
                productDetailTabs: tabs
            },
            productAssociationState: productAssociationStateFail
        }
    }),

    on(setProductAssociation, (state: DashboardState, data) => ({
        ...state,
        productAssociationState: {
            ...state.productAssociationState,
            productAssociation: data.productAssociation
        }
    })),

    on(setProductAssociationPrimaryCategory, (state: DashboardState, data) => {
        return {
            ...state,
            productAssociationState: {
                ...state.productAssociationState,
                productAssociation: {
                    ...state.productAssociationState.productAssociation!,
                    primarycategory: data.primaryCategory
                }
            }
        }
    }),

    on(postProductAssociation, (state: DashboardState, data) => ({
        ...state,
        productAssociationState: {
            ...state.productAssociationState,
            loading: true,
        },
    })),

    on(postProductAssociationSuccess, (state: DashboardState) => {

        const updatedData = state.productAssociationState.productAssociation
        var newProductAssociation: ProductAssociation | undefined = undefined

        newProductAssociation = {
            ...updatedData,
            parentcategories: updatedData.parentcategories
                .filter(data => data.status !== 'D')
                .map(data => ({ ...data, status: "" })),
            childcategories: updatedData.childcategories
                .filter(data => data.status !== 'D')
                .map(data => ({ ...data, status: "" })),
            products: updatedData.products
                .filter(data => data.status !== 'D')
                .map(data => ({ ...data, status: "" }))
        }

        return {
            ...state,
            productAssociationState: {
                ...state.productAssociationState,
                productAssociation: newProductAssociation,
                loading: false,
            },
        }
    }),

    on(postProductAssociationFailure, (state: DashboardState, data) => ({
        ...state,
        productAssociationState: {
            ...state.productAssociationState,
            loading: false,
        },
    })),

    /// SEARCH DATA AND RESULT

    on(getSearchData, (state: DashboardState) => ({
        ...state,
        searchDataState: {
            ...state.searchDataState,
            loading: true,
            searchDataResult: [],
        },
    })),

    on(getSearchDataForSelectedProduct, (state: DashboardState) => ({
        ...state,
        searchDataState: {
            ...state.searchDataState,
            loading: true,
            searchDataResult: [],
        },
    })),

    on(getSearchDataForCatalog, (state: DashboardState) => ({
        ...state,
        searchDataState: {
            ...state.searchDataState,
        },
    })),

    on(getSearchDataSuccess, (state: DashboardState, data) => {
        const currSearchData = state.searchDataState.searchData

        const newSearchData: SearchData = {
            ...data.searchData,
            lookforselected: data.searchData.lookforoptions[0].value,
            postfields: [searchDataPostFieldEmpty],
            //postfields: noPostFields ? [searchDataPostFieldEmpty] : searchData.postfields
        }

        return {
            ...state,
            searchDataState: {
                ...state.searchDataState,
                loading: false,
                searchData: newSearchData,
            },
        }
    }),

    on(getSearchDataFailure, (state: DashboardState, data) => {
        return {
            ...state,
            searchDataState: {
                ...state.searchDataState,
                loading: false,
            },
        }
    }),

    on(setSearchDataLookFor, (state: DashboardState, data) => {
        if (!state.searchDataState.searchData)
            return { ...state }

        return {
            ...state,
            searchDataState: {
                ...state.searchDataState,
                searchData: {
                    ...state.searchDataState.searchData,
                    lookforselected: data.value
                }
            },
        }
    }),

    on(setSearchDataPostFieldNameAtIndex, (state: DashboardState, data) => {
        if (!state.searchDataState.searchData)
            return { ...state }

        var updatedPostFields: SearchPostField[] = [...state.searchDataState.searchData.postfields]
        updatedPostFields[data.index] = {
            ...updatedPostFields[data.index],
            field: data.fieldName,
            fieldtype: data.fieldType,
        }

        return {
            ...state,
            searchDataState: {
                ...state.searchDataState,
                searchData: {
                    ...state.searchDataState.searchData,
                    postfields: updatedPostFields,
                },
            },
        }
    }),

    on(setSearchDataPostFieldConditionAtIndex, (state: DashboardState, data) => {
        if (!state.searchDataState.searchData)
            return { ...state }

        var updatedPostFields: SearchPostField[] = [...state.searchDataState.searchData.postfields]
        updatedPostFields[data.index] = { ...updatedPostFields[data.index], condition: data.condition }

        return {
            ...state,
            searchDataState: {
                ...state.searchDataState,
                searchData: {
                    ...state.searchDataState.searchData,
                    postfields: updatedPostFields,
                }
            },
        }
    }),

    on(setSearchDataPostFieldOperatorAtIndex, (state: DashboardState, data) => {
        if (!state.searchDataState.searchData)
            return { ...state }

        var updatedPostFields: SearchPostField[] = [...state.searchDataState.searchData.postfields]
        updatedPostFields[data.index] = { ...updatedPostFields[data.index], logicaloperator: data.operator }

        return {
            ...state,
            searchDataState: {
                ...state.searchDataState,
                searchData: {
                    ...state.searchDataState.searchData,
                    postfields: updatedPostFields,
                }
            },
        }
    }),

    on(setSearchDataPostFieldValueAtIndex, (state: DashboardState, data) => {
        if (!state.searchDataState.searchData)
            return { ...state }

        var updatedPostFields: SearchPostField[] = [...state.searchDataState.searchData.postfields]
        updatedPostFields[data.index] = { ...updatedPostFields[data.index], value: data.fieldValue, }

        return {
            ...state,
            searchDataState: {
                ...state.searchDataState,
                searchData: {
                    ...state.searchDataState.searchData,
                    postfields: updatedPostFields,
                }
            },
        }
    }),

    on(addSearchDataPostFieldEmptyCondition, (state: DashboardState, data) => {
        if (!state.searchDataState.searchData)
            return { ...state }

        return {
            ...state,
            searchDataState: {
                ...state.searchDataState,
                searchData: {
                    ...state.searchDataState.searchData,
                    postfields: [
                        ...state.searchDataState.searchData.postfields,
                        searchDataPostFieldEmpty
                    ],
                }
            },
        }
    }),

    on(searchDataPostFieldRemoveConditionAtIndex, (state: DashboardState, data) => {
        if (!state.searchDataState.searchData)
            return { ...state }

        var newArray = [...state.searchDataState.searchData.postfields]
        newArray.splice(data.index, 1)

        return {
            ...state,
            searchDataState: {
                ...state.searchDataState,
                searchData: {
                    ...state.searchDataState.searchData,
                    postfields: newArray,
                }
            },
        }
    }),


    on(setSearchDataPostField, (state: DashboardState, data) => {
        if (!state.searchDataState.searchData)
            return { ...state }

        return {
            ...state,
            /*searchDataState: {
                ...state.searchDataState,
                searchData: {
                    ...state.searchDataState.searchData,
                    lookforselected: data.value
                }
            },*/
        }
    }),

    on(getSearchDataResult, (state: DashboardState, data) => ({
        ...state,
        searchDataState: {
            ...state.searchDataState,
            loading: true,
            searchDataResult: [],
            searchDataSelectedResult: undefined,
        },
    })),

    on(getSearchDataResultSuccess, (state: DashboardState, data) => ({
        ...state,
        searchDataState: {
            ...state.searchDataState,
            loading: false,
            searchDataResult: data.resultList,
        },
    })),

    on(getSearchDataResultFailure, (state: DashboardState, data) => ({
        ...state,
        searchDataState: {
            ...state.searchDataState,
            loading: false,
            searchDataResult: [],
        },
    })),


    /// SELECT SEARCH RESULT

    on(selectSearchResult, (state, data) => ({
        ...state,
        productState: {
            ...state.productState,
            loading: true,
        },
        productDetailState: {
            ...state.productDetailState,
            loading: true,
        },
        productAssociationState: {
            ...state.productAssociationState,
            loading: true,
        },
        searchDataState: {
            ...state.searchDataState,
            searchDataSelectedResult: data.searchDataResult
        },
    })),

    /// NAVIGATION

    on(getNavigationItems, (state) => ({
        ...state,
        productState: {
            ...state.productState,
            loading: true,
        }
    })),

    on(getNavigationItemsSuccess, (state, data) => {
        const navItems = data.items
        const navItemsFiltered = navItems.filter(data => data.type !== ProductType.File && data.type !== ProductType.FileVariant)
        const catalogName = navItems.at(0)?.catalogname ?? ""
        const lastItem = navItems.at(-1)
        const lastItemType = lastItem?.type ?? ProductType.Catalog
        const lastItemId = lastItemType === ProductType.Catalog ? undefined : lastItem?.oid
        const lastItemName = lastItem?.categoryname ?? ""

        return {
            ...state,
            productState: {
                ...state.productState,
                loading: false,
                catalogName: catalogName,
                productId: lastItemId,
                productType: lastItemType,
                productName: lastItemName,
                navigationItems: navItemsFiltered
            },
        }

    }),

    on(getNavigationItemsFailure, (state) => ({
        ...state,
        productState: {
            ...state.productState,
            loading: false,
        }
    })),

    /// OTHER
    on(toggleDashboardSideMenu, (state: DashboardState) => ({
        ...state,
        dashboardSideMenuOpened: !state.dashboardSideMenuOpened
    })),

    on(clearDashboardData, (state: DashboardState) => ({
        ...initialState,
    })),

)

export const dashboardFeature = createFeature({
    name: "DASHBOARD_FEATURE",
    reducer: dashboardReducer
})
