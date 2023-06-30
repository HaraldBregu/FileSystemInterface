export interface AssociationFieldOption {
    text: string
    value: string
}

export interface AssociationData {
    oid: number
    childoid: number
    code: string
    displayname: string
    status: string
}

export interface ProductAssociation {
    id: number
    catalogname: string
    primarycategory: string
    parentcategories: AssociationData[]
    childcategories: AssociationData[]
    products: AssociationData[]
}

export const productAssociationInitial: ProductAssociation = {
    id: 0,
    catalogname: "",
    primarycategory: "",
    parentcategories: [],
    childcategories: [],
    products: [],
}