import { DashboardState } from "../modules/dashboard/store/state";
import { Product } from "../shared/interfaces/product";
import { ProductDetail, ProductProperty, PropertFieldType, PropertyField } from "../shared/interfaces/product-detail";
import { Variant, VariantPropertyField } from "../shared/interfaces/variant";

export default class Utils {

    static isBlankString(str: string) {
        return (!str || /^\s*$/.test(str));
    }

    static countryCode(codeLang: string) {

    }

    static codeLanguagesToCountryCode(codeLang: string) {
        const code = codeLang.split('-')[1]
        var lower = code.toLocaleLowerCase()
        if (lower === "chs") {
            return "cn"
        }
        return lower
    }

    static codeLanguagesToCountryCodes() {
        return this.codeLanguages().map(data => {
            this.codeLanguagesToCountryCode(data)
        })
    }

    static codeLanguages(): string[] {
        return [
            "da-DK", // danmark
            "de-AT",
            "de-CH",
            "de-DE",
            "en-AU", // gb
            "en-BZ",
            "en-GB",
            "EN-IE",
            "EN-PH",
            "en-TT",
            "en-US",
            "es-AR",
            "es-ES",
            "es-MX",
            "fi-FI",
            "fr-BE",
            "fr-CH",
            "fr-FR",
            "it-CH",
            "it-IT",
            "ja-JP", // giappone
            "ko-KR", // korea
            "nb-NO", // boh
            "nl-BE",
            "pt-BR",
            "pt-PT",
            "ru-RU",
            "sv-SE",
            "zh-CHS", // boh
            "zh-CN", //
            "zh-HK"
        ]
    }

    static variantsFromVariantProperties(variantProperties: ProductProperty[]) {
        var variants: Variant[] = []

        variantProperties.forEach((property, index) => {
            const properties: VariantPropertyField[] = []

            properties.push({
                name: "VariantId",
                displayname: property.name,
                value: property.name,
                options: [],
                readonly: true,
                required: false,
                maxlength: 0,
            })

            property.childs.forEach(data => {
                properties.push({
                    name: data.name,
                    displayname: data.displayname,
                    value: data.value ?? "",
                    options: data.options,
                    readonly: data.isreadonly,
                    required: data.isrequired,
                    maxlength: data.maxlength,
                })
            })

            variants.push({ properties: properties })
        })

        return variants
    }

    static propertiesFromVariants(variants: Variant[]) {
        var properties: ProductProperty[] = []

        variants.forEach(variant => {
            var name: string = ""
            var childs: PropertyField[] = []

            variant.properties.forEach((prop, index) => {
                if (index === 0) {
                    name = prop.displayname
                } else {
                    childs.push({
                        name: prop.name,
                        displayname: prop.displayname,
                        datatype: (prop.options.length > 0) ? PropertFieldType.MultipleChoice : PropertFieldType.Text,
                        ismultilanguage: false,
                        isrequired: false,
                        isreadonly: prop.readonly,
                        value: prop.value,
                        language: "",
                        options: prop.options,
                        maxlength: prop.maxlength,
                    })

                }
            })

            properties.push({
                name: name,
                type: "Variant",
                childs: childs
            })
        })

        return properties
    }

    static variantsFromProductDetail(productDetail: ProductDetail | undefined) {
        var variants: Variant[] = []

        if (productDetail === undefined)
            return variants

        var variantProperties = productDetail.properties.filter(data => data.type === "Variant") ?? [];

        variantProperties.forEach((property, index) => {
            const properties: VariantPropertyField[] = []

            properties.push({
                name: "VariantId",
                displayname: property.name,
                value: property.name,
                options: [],
                readonly: true,
                required: false,
                maxlength: 0,
            })

            property.childs.forEach(data => {
                properties.push({
                    name: data.name,
                    displayname: data.displayname,
                    value: data.value ?? "",
                    options: data.options,
                    readonly: data.isreadonly,
                    required: data.isrequired,
                    maxlength: data.maxlength,
                })
            })

            variants.push({ properties: properties })
        })

        return variants
    }

    /*
    static updateCategoryNavItems(state: DashboardState, data: Product) {
        // Check if data with type file and file variant exists,
        // if exists replace it
        // if not exists add it 
        var navItems = [...state.productState.selectedProductList]

        // Add product
        navItems.push(data)

        // Remove all files firts
        //const fileFilter = navItems.filter(data => data.type === ProductType.File || data.type === ProductType.FileVariant)


        // filter duplicated
        const filteredArray = navItems.filter((obj, index, self) => index === self.findIndex((t) => t.name === obj.name && t.id === obj.id))


        const index = filteredArray.findIndex((obj) => obj.name === data.name && obj.id === data.id)
        const resultArray = filteredArray.slice(0, index + 1)
        return resultArray
    }

    */

}