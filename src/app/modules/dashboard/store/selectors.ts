import { createSelector } from "@ngrx/store";
import { DashboardState } from "./state";
import { ProductType } from "src/app/shared/enums/product-type";
import Utils from "src/app/core/utils";
import { dashboardFeature } from "./reducers";

const {
    selectDASHBOARD_FEATUREState,
    selectDashboardSideMenuOpened,
} = dashboardFeature


export const selectDashboardState = createSelector(selectDASHBOARD_FEATUREState, (dashboard) => dashboard)

export const sideMenuOpened = createSelector(selectDashboardSideMenuOpened, (opened) => (opened))

export const currentSelectedProduct = createSelector(
    selectDashboardState,
    (state: DashboardState) => ({
        isCatalog: (state.productState.navigationItems.at(-1)?.type == ProductType.Catalog),
        catalog_name: state.productState.catalogName,
        product_id: state.productState.productId
    })
)

export const updatedAssociationProduct = createSelector(
    selectDashboardState,
    (state: DashboardState) => ({
        association: state.productAssociationState.productAssociation!,
    })
)

export const selectedCatalog = createSelector(
    selectDashboardState,
    (state: DashboardState) => ({
        selectedProduct: state.productState.navigationItems[0],
    })
)

export const selectedProductIsCatalog = createSelector(
    selectDashboardState,
    (state: DashboardState) => (state.productState.productType === ProductType.Catalog)
)

export const selectedProductIsNotCatalog = createSelector(
    selectDashboardState,
    (state: DashboardState) => (state.productState.productType !== ProductType.Catalog)
)

export const selectedProductIsFile = createSelector(
    selectDashboardState,
    (state: DashboardState) => (state.productState.productType === ProductType.File || state.productState.productType === ProductType.FileVariant)
)

export const selectedCatalogName = createSelector(
    selectDashboardState,
    (state: DashboardState) => (state.productState.catalogName))

export const productList = createSelector(
    selectDashboardState,
    (state: DashboardState) => {
        return state.productState.productList
    }
)

export const productListCount = createSelector(
    selectDashboardState,
    (state: DashboardState) => {
        return state.productState.productList.length
    }
)

export const productListIsEmpty = createSelector(
    selectDashboardState,
    (state: DashboardState) => {
        return state.productState.productList.length === 0
    }
)

export const selectedProductList = createSelector(
    selectDashboardState,
    (state: DashboardState) => {
        return state.productState.navigationItems
    }
)

export const productLoading = createSelector(
    selectDashboardState,
    (state: DashboardState) => {
        return state.productState.loading
    }
)

export const selectedProductType = createSelector(
    selectDashboardState,
    (state) => {
        return state.productState.productType
    }
)

export const selectedProductName = createSelector(
    selectDashboardState,
    (state) => (state.productState.productName))

export const selectedProductId = createSelector(
    selectDashboardState,
    (state) => (state.productState.productId)
)


export const isCatalogList = createSelector(
    selectDashboardState,
    (state) => (state.productState.navigationItems.length === 0)
)

export const currentProductIsFile = createSelector(
    selectDashboardState,
    (state: DashboardState) => (
        state.productState.productType === ProductType.File ||
        state.productState.productType === ProductType.FileVariant)
)

export const productDetail = createSelector(
    selectDashboardState,
    (state: DashboardState) => (state.productDetailState.productDetail)
)

export const currentProductDetailLoading = createSelector(
    selectDashboardState,
    (state: DashboardState) => (state.productDetailState.loading)
)

/// ASSOCIATION UPDATED

export const productAssociationState = createSelector(selectDashboardState, (state) => (state.productAssociationState))

export const productAssociation = createSelector(
    selectDashboardState,
    (state) => (state.productAssociationState.productAssociation)
)

export const productAssociationPrimaryCategory = createSelector(
    productAssociation,
    (productAssociation) => (productAssociation?.primarycategory)
)

export const productAssociationParentCategories = createSelector(
    productAssociation,
    (productAssociation) => ({
        productAssociation: productAssociation,
        parentCategories: productAssociation?.parentcategories
    })
)

export const productAssociationChildCategories = createSelector(
    productAssociation,
    (productAssociation) => ({
        productAssociation: productAssociation,
        childCategories: productAssociation?.childcategories
    })
)

export const productAssociationProducts = createSelector(
    currentProductIsFile,
    productAssociation,
    (isfile, productAssociation) => ({
        isFile: isfile,
        productAssociation: productAssociation,
        products: productAssociation?.products
    })
)

/// ASSOCIATION CURRENT

export const currentProductAssociationPrimaryCategory = createSelector(
    selectDashboardState,
    (state: DashboardState) => (state.productAssociationState.productAssociation?.primarycategory)
)

export const currentProductAssociationLoading = createSelector(
    selectDashboardState,
    (state: DashboardState) => (state.productAssociationState.loading)
)

export const productDetailTabs = createSelector(
    selectDashboardState,
    productDetail,
    (dashboard) => (dashboard.productState.productDetailTabs)
)

export const currentProductIsCatalog = createSelector(
    selectDashboardState,
    (state: DashboardState) => (state.productState.productType === ProductType.Catalog)
)


export const currentProductDetailAssociationLoading = createSelector(
    selectDashboardState,
    currentProductDetailLoading,
    currentProductAssociationLoading,
    (state, productDetailLoading, productAssociationLoading) => {
        switch (state.productState.productType) {
            case ProductType.Catalog:
                return productDetailLoading
            default:
                return productDetailLoading || productAssociationLoading
        }
    }
)

export const currentProductDetailBaseProperties = createSelector(
    productDetail,
    (productDetail) => (productDetail?.properties?.filter(data => data.type === "Base") ?? [])
)

export const currentProductDetailCustomProperties = createSelector(
    productDetail,
    (productDetail) => (productDetail?.properties?.filter(data => data.type === "Custom") ?? [])
)

export const currentProductDetailVariantProperties = createSelector(
    productDetail,
    (productDetail) => (productDetail?.properties?.filter(data => data.type === "Variant") ?? [])
)

export const currentProductDetailVariant = createSelector(
    currentProductDetailVariantProperties,
    (variantProperties) => (Utils.variantsFromVariantProperties(variantProperties))
)

export const savingProductDetail = createSelector(selectDashboardState, (state: DashboardState) =>
    (state.productDetailState.loading))

export const savingProductAssociation = createSelector(selectDashboardState, (state: DashboardState) =>
    (state.productAssociationState.loading))

/// SEARCH 

export const searchDataLoading = createSelector(selectDashboardState, (state: DashboardState) =>
    (state.searchDataState.loading))

export const searchData = createSelector(selectDashboardState, (state: DashboardState) =>
    (state.searchDataState.searchData))

export const searchDataResult = createSelector(selectDashboardState, (state: DashboardState) =>
    (state.searchDataState.searchDataResult))
    
export const searchDataSelectedResult = createSelector(selectDashboardState, (state: DashboardState) =>
    (state.searchDataState.searchDataSelectedResult))

export const hasProductDetail = createSelector(
    selectDashboardState,
    (state) => (state.productState.navigationItems.length > 0))
