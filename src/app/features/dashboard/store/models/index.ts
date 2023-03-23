import { Product } from "src/app/shared/interfaces/product";

export interface DashboardModel {
    loading: boolean
    catalogs: Product[]
    filteredCatalog: Product[]
    categories: Product[]
    error: any
    selectedCatalog: Product | undefined
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