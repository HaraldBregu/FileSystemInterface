import { createSelector } from "@ngrx/store";
import { ProductType } from "src/app/shared/enums/product-type";
import {
    currentEntityIsCategory,
    currentEntityIsProduct,
    currentProductAssociationLoading,
    currentProductDetailLoading,
    hasChildCategories,
    hasProducts,
    productAssociation,
    productLoading,
    productState,
    selectedCatalogName,
    selectedProductId,
    selectedProductIsFile,
    selectedProductType
} from ".";


export const createItemSelector = createSelector(
    productLoading,
    selectedCatalogName,
    selectedProductType,
    selectedProductId,
    (loading, catalogName, productType, productId) => {
        const isNone = productType === ProductType.None
        const isFile = productType === ProductType.File || productType === ProductType.FileVariant
        const canCreate = !isNone && !isFile

        return canCreate && !loading ? {
            catalogName: catalogName,
            productId: productId,
        } : null
    }
)

export const productAssociationProducts = createSelector(
    selectedProductIsFile,
    productAssociation,
    (isfile, productAssociation) => ({
        isFile: isfile,
        productAssociation: productAssociation,
        products: productAssociation?.products
    })
)

export const currentProductDetailAssociationLoading = createSelector(
    productState,
    currentProductDetailLoading,
    currentProductAssociationLoading,
    (state, productDetailLoading, productAssociationLoading) => {
        if (state.productType === ProductType.Catalog) {
            return productDetailLoading
        } else {
            return productDetailLoading || productAssociationLoading
        }
    }
)

export const canDeleteEntity = createSelector(
    currentEntityIsProduct,
    currentEntityIsCategory,
    hasChildCategories,
    hasProducts,
    (isProduct, isCategory, hasChildCategories, hasProducts) => {
        const cond1 = isProduct
        const cond2 = isCategory && !hasChildCategories && !hasProducts
        return cond1 || cond2
    }
)