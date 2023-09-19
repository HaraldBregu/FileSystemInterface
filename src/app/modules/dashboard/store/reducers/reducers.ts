/*import { createFeature, createReducer, on } from "@ngrx/store";
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
} from "../actions/actions";
import {
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
} from "../states/state";
import { ProductAssociation, productAssociationInitial } from "src/app/shared/interfaces/product-association";
import { SearchData, SearchPostField, searchDataPostFieldEmpty } from "src/app/shared/interfaces/search-data";
import { getNavigationItems, getNavigationItemsFailure, getNavigationItemsSuccess, selectNavigationItem } from "../actions/navigation.actions";


export const dashboardReducer = createReducer(
    initialState,

    /// NAVIGATION 

    on(selectNavigationItem, (state, data) => {
        const isCatalog = data.item.type === ProductType.Catalog

        return {
            ...state,
            productState: {
                ...state.productState,
                loading: true,
            },
            productDetailState: {
                ...productDetailStateStart,
            },
            productAssociationState: {
                ...productAssociationStateStart,
                loading: isCatalog ? false : true
            },
        }
    }),

    /// CATALOGS 

    on(getCatalogs, (state) => {
        return {
            ...state,
            productState: { ...productStateStart },
            productDetailState: { ...productDetailStateInitial },
            productAssociationState: { ...productAssociationStateInitial },
            searchDataState: { ...searchDataStateInitial },
        }
    }),

    on(getCatalogsSuccess, (state, data) => {
        return {
            ...state,
            productState: {
                ...productStateInitial,
                loading: false,
                productList: data.productList.map((v) => ({ ...v, type: ProductType.Catalog })),
            }
        }
    }),

    on(getCatalogsFailure, (state, data) => {
        return {
            ...state,
            productState: productStateFail,
        }
    }),

    /// SELECT PRODUCT

    on(selectProduct, (state, data) => {
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

    on(getProducts, (state) => ({
        ...state,
        productState: {
            ...state.productState,
            loading: true,
        },
    })),

    on(getProductsSuccess, (state, data) => ({
        ...state,
        productState: {
            ...state.productState,
            productList: data.products,
            loading: false,
        },
    })),

    on(getProductsFailure, (state, data) => ({
        ...state,
        productState: {
            ...state.productState,
            loading: false,
        },
    })),

    /// PRODUCT DETAIL

    on(getProductDetail, (state, data) => {
        return {
            ...state,
            productState: {
                ...state.productState,
                loading: true,
            },
        }
    }),

    on(getProductDetailSuccess, (state, data) => {
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
            //productAssociationState: productAssociationStateInitial,
        }
    }),

    on(getProductDetailFailure, (state, data) => {
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

    on(setProductDetailProperties, (state, data) => ({
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

    on(postProductDetail, (state, data) => ({
        ...state,
        productDetailState: {
            ...state.productDetailState,
            loading: true,
        },
    })),

    on(postProductDetailSuccess, (state, data) => ({
        ...state,
        productDetailState: {
            ...state.productDetailState,
            loading: false,
        },
    })),

    on(postProductDetailFailure, (state, data) => ({
        ...state,
        productDetailState: {
            ...state.productDetailState,
            loading: false,
        },
    })),

    /// ASSOCIATION 

    on(getProductAssociation, (state, data) => ({
        ...state,
        productAssociationState: productAssociationStateStart,
    })),

    on(getProductAssociationSuccess, (state, data) => {
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

    on(getProductAssociationFailure, (state, data) => {
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

    on(setProductAssociation, (state, data) => ({
        ...state,
        productAssociationState: {
            ...state.productAssociationState,
            productAssociation: data.productAssociation
        }
    })),

    on(setProductAssociationPrimaryCategory, (state, data) => {
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

    on(postProductAssociation, (state, data) => ({
        ...state,
        productAssociationState: {
            ...state.productAssociationState,
            loading: true,
        },
    })),

    on(postProductAssociationSuccess, (state) => {

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

    on(postProductAssociationFailure, (state, data) => ({
        ...state,
        productAssociationState: {
            ...state.productAssociationState,
            loading: false,
        },
    })),

    /// SEARCH DATA AND RESULT

    on(getSearchData, (state) => ({
        ...state,
        searchDataState: {
            ...state.searchDataState,
            loading: true,
            searchDataResult: [],
        },
    })),

    on(getSearchDataForSelectedProduct, (state) => ({
        ...state,
        searchDataState: {
            ...state.searchDataState,
            loading: true,
            searchDataResult: [],
        },
    })),

    on(getSearchDataForCatalog, (state) => ({
        ...state,
        searchDataState: {
            ...state.searchDataState,
        },
    })),

    on(getSearchDataSuccess, (state, data) => {
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

    on(getSearchDataFailure, (state, data) => {
        return {
            ...state,
            searchDataState: {
                ...state.searchDataState,
                loading: false,
            },
        }
    }),

    on(setSearchDataLookFor, (state, data) => {
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

    on(setSearchDataPostFieldNameAtIndex, (state, data) => {
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

    on(setSearchDataPostFieldConditionAtIndex, (state, data) => {
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

    on(setSearchDataPostFieldOperatorAtIndex, (state, data) => {
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

    on(setSearchDataPostFieldValueAtIndex, (state, data) => {
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

    on(addSearchDataPostFieldEmptyCondition, (state, data) => {
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

    on(searchDataPostFieldRemoveConditionAtIndex, (state, data) => {
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


    on(setSearchDataPostField, (state, data) => {
        if (!state.searchDataState.searchData)
            return { ...state }

        return {
            ...state,
        }
    }),

    on(getSearchDataResult, (state, data) => ({
        ...state,
        searchDataState: {
            ...state.searchDataState,
            loading: true,
            searchDataResult: [],
            searchDataSelectedResult: undefined,
        },
    })),

    on(getSearchDataResultSuccess, (state, data) => ({
        ...state,
        searchDataState: {
            ...state.searchDataState,
            loading: false,
            searchDataResult: data.resultList,
        },
    })),

    on(getSearchDataResultFailure, (state, data) => ({
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
        const lastItemType = lastItem?.type ?? ProductType.None
        const lastItemId = lastItemType === ProductType.Catalog ? undefined : lastItem?.oid
        const lastItemName = lastItem?.categoryname ?? ""

        return {
            ...state,
            productState: {
                ...state.productState,
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


    on(clearDashboardData, (state) => ({
        ...initialState,
    })),

)


*/