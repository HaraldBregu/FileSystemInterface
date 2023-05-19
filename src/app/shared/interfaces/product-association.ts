export interface AssociationFieldOption {
    text: string
    value: string
}

export interface AssociationData {
    oid :number,
    childoid: number
    code: string
    displayname :string
    status :string
}

export interface ProductAssociation {
    id: number
    catalogname: string
    primarycategory: string
    options: AssociationFieldOption[]
    parentcategories: AssociationData[]
    childcategories: AssociationData[]
    products: AssociationData[]
}