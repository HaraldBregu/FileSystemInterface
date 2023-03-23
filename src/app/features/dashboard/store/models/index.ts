import { Product } from "src/app/shared/interfaces/product";

export interface DashboardModel {
    loading: boolean
    catalogs: Product[]
    currentCatalog: Product | undefined
    filteredCatalogs: Product[]
    products: Product[]
    currentProduct: Product | undefined
    error: any
    navItems: Product[]
}


/* 
[
    15: 56
Number,
        BigNumber,
        Decimal,
        Double,
        Boolean,
        Text,
        DateTime,
        MoneyCurrency,
        FileName,
        MultipleChoice,
        LongText

  {                
    "name": "IsSearchable",                
    "displayname": "Is Searchable",                
    "datatype": "Boolean",               
     "ismultilanguage": false,               
      "isrequired": true,                
      "value": "0",               
       "languagesvalue": []           
    }
*/